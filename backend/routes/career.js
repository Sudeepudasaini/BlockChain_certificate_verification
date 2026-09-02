const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Career = require("../models/Career");
const Certificate = require("../models/Certificate");
const Student = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const {
  generateRecommendations,
  calculateMatchScore,
  getSkillGap,
} = require("../services/recommendation");
const careerSeeder = require("../seeders/careerSeed");

// POST /api/career/ask
router.post("/ask", protect, async (req, res) => {
  try {
    const { question, conversationHistory = [] } = req.body;
    if (!question) return res.status(400).json({ success: false, error: "Question required" });

    const student = await Student.findById(req.user.id).select("-password");
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    const certs = await Certificate.find({ studentEmail: student.email }).lean();
    const certificateNames = certs.map((c) => c.degree || c.major || c.universityName).filter(Boolean);
    const studentSkills = await getStudentSkillsFromCertificates(student);
    const careers = await Career.find({}).lean();
    const recommendations = generateRecommendations(studentSkills, careers);
    const top = recommendations[0] || null;
    const careerDoc = top ? careers.find((c) => c.title?.toLowerCase() === top.title?.toLowerCase()) : careers[0];
    const skillGap = careerDoc ? getSkillGap(studentSkills, careerDoc.skills || []) : [];

    const systemPrompt = `You are CertBot, an AI career advisor ONLY for IT/tech students in Nepal.
Answer ONLY questions about: tech career paths, skills to learn, certifications, salary ranges, learning roadmaps, and IT job opportunities in Nepal.

Student Profile:
- Certificates/Degrees: ${certificateNames.join(", ") || "Not provided"}
- Current Skills: ${studentSkills.join(", ") || "None detected"}
- Top Recommended Career: ${top?.title || "Not determined"}
- Skills Gap to Fill: ${skillGap.join(", ") || "None"}

STRICT RULES:
1. If the question is NOT about tech careers, IT skills, certifications, programming, or job market — reply ONLY with: "I'm CertBot, your tech career advisor. I can only answer questions about IT careers, skills, certifications, and job opportunities. Please ask something related to your career path!"
2. Never answer questions about sports, celebrities, entertainment, personal relationships, politics, or anything outside tech careers.
3. Give specific actionable advice using the student profile above.
4. Keep answers under 250 words. Use bullet points.
5. For Nepal salary questions give NPR ranges (e.g., NPR 40,000-120,000/month).`;

    if (!process.env.GROQ_API_KEY) {
      const fallback = `Based on your profile, focus on: ${skillGap.slice(0,3).join(", ") || "core programming skills"}. These are key for ${top?.title || "a tech career"} in Nepal. Add GROQ_API_KEY to .env for full AI answers.`;
      return res.json({ success: true, answer: fallback });
    }

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-4).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content || "" })),
      { role: "user", content: question }
    ];

    const modelEnv = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
    const fallbackEnv = process.env.GROQ_MODEL_FALLBACK || 'llama-3-8b-instant,llama-3.1,gpt-4o-mini';
    const fallbackModels = fallbackEnv.split(',').map(s => s.trim()).filter(Boolean);
    const modelsToTry = [modelEnv, ...fallbackModels.filter(m => m !== modelEnv)];
    console.log('GROQ models to try:', modelsToTry);

    // Try discovering available models for the provided API key
    try {
      const mres = await fetch('https://api.groq.com/openai/v1/models', { method: 'GET', headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } })
      if (mres.ok) {
        const mdata = await mres.json()
        const available = (mdata?.data || mdata?.models || []).map(m => m.id || m.name || m)
        if (Array.isArray(available) && available.length) {
          for (const a of available) if (a && !modelsToTry.includes(a)) modelsToTry.push(a)
          console.log('Discovered GROQ models for this key:', available)
        }
      } else {
        console.warn('Could not fetch GROQ models list — continuing with configured models')
      }
    } catch (e) {
      console.warn('Error while attempting to discover GROQ models:', e)
    }

    let lastErrorDetails = null;
    for (const modelName of modelsToTry) {
      console.log('Attempting GROQ model:', modelName);
      let response;
      try {
        response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: JSON.stringify({ model: modelName, messages, max_tokens: 600, temperature: 0.7 })
        });
      } catch (e) {
        console.error('Network error when calling GROQ:', e);
        lastErrorDetails = e;
        continue;
      }

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Groq API returned non-JSON response', e);
        lastErrorDetails = e;
        continue;
      }

      if (!response.ok) {
        const code = data?.error?.code || data?.code || null;
        const msg = data?.error?.message || data?.message || '';
        console.warn(`GROQ response not ok for model=${modelName} code=${code} message=${msg}`);
        lastErrorDetails = data;
        if (code === 'model_not_found' || /does not exist|not found|no access/i.test(String(msg))) {
          continue;
        }
        return res.status(500).json({ error: "AI service error", details: data });
      }

      const answer =
        data?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.text ||
        data?.choices?.[0]?.message ||
        (Array.isArray(data?.output) && data.output[0]?.content?.map(c => c?.text || c?.[0]).join('')) ||
        data?.output?.[0]?.content?.[0]?.text ||
        data?.result?.[0]?.content?.[0]?.text ||
        data?.text ||
        data?.message?.content ||
        null;

      const finalAnswer = answer || "Sorry, I could not generate a response. Please try again.";
      return res.json({ success: true, answer: finalAnswer });
    }

    console.error('All GROQ model attempts failed', lastErrorDetails);
    return res.status(500).json({ error: 'AI service error', details: lastErrorDetails || 'No response from GROQ' });

  } catch (error) {
    console.error("Error in /ask:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// Helper to extract student skills from their certificates
async function getStudentSkillsFromCertificates(studentOrId) {
  const query = {};
  let studentId = null;
  let studentEmail = null;
  if (typeof studentOrId === 'object' && studentOrId !== null) {
    studentId = studentOrId._id || studentOrId.id;
    studentEmail = studentOrId.email || studentOrId.studentEmail;
  } else {
    studentId = studentOrId;
  }

  if (studentId && studentEmail) {
    query.$or = [{ studentUser: studentId }, { studentEmail }];
  } else if (studentId) {
    query.$or = [{ studentUser: studentId }];
  } else if (studentEmail) {
    query.$or = [{ studentEmail }];
  }

  const certs = await Certificate.find(query).lean();
  const skillSet = new Set();
  for (const c of certs) {
    // If metadata exists, scan it for arrays/strings that may contain subjects/skills
    if (c.metadata && typeof c.metadata === "object") {
      for (const [k, v] of Object.entries(c.metadata)) {
        if (!v) continue;
        if (Array.isArray(v)) {
          v.forEach((s) => skillSet.add(String(s).toLowerCase().trim()));
        } else if (typeof v === "string") {
          // comma separated list
          v.split(",").forEach((s) => skillSet.add(String(s).toLowerCase().trim()));
        }
      }
    }

    // Check common top-level fields
    if (c.subjects && Array.isArray(c.subjects)) {
      c.subjects.forEach((s) => skillSet.add(String(s).toLowerCase().trim()));
    } else if (c.subjects && typeof c.subjects === "string") {
      c.subjects.split(",").forEach((s) => skillSet.add(String(s).toLowerCase().trim()));
    }

    if (c.skills && Array.isArray(c.skills)) {
      c.skills.forEach((s) => skillSet.add(String(s).toLowerCase().trim()));
    }

    // fallback to degree/major fields (these are coarse but better than nothing)
    if (c.degree) skillSet.add(String(c.degree).toLowerCase().trim());
    if (c.major) skillSet.add(String(c.major).toLowerCase().trim());
  }

  // Debug: log certificates if no skills found
  const skills = Array.from(skillSet).filter(Boolean);
  if (skills.length === 0) {
    console.warn(`No skills detected in certificates for student ${studentId}. Certificates fetched: ${certs.length}`);
    certs.forEach((c, idx) => {
      console.warn(` cert[${idx}] degree=${c.degree} major=${c.major} metadataKeys=${c.metadata ? Object.keys(c.metadata).join(',') : 'none'}`);
    });
  }

  return skills;
}

// GET /api/career/recommendations
// NOTE: degreeSkillMap includes CSIT -> ["programming","networking","database","software development","algorithms"] and
//       majorSkillMap includes Information technology -> ["it support","networking","system administration","cloud","security"]; generateRecommendations uses cosine similarity against career.skills
router.get("/recommendations", protect, async (req, res) => {
  try {
    // log mongoose connection state for debugging
    const states = ["disconnected", "connected", "connecting", "disconnecting", "unauthorized"];
    const ready = mongoose.connection.readyState;
    console.log(`MongoDB connection state: ${ready} (${states[ready] || 'unknown'})`);

    const student = await Student.findOne({ $or: [{ _id: req.user.id }, { email: req.user.email }] }).select("-password");
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    // Fetch certificates by studentEmail (studentId string format does not match ObjectId)
    const certs = await Certificate.find({ studentEmail: student.email }).lean();

    // Hardcoded mappings
    const degreeSkillMap = {
      "CSIT": ["programming", "networking", "database", "software development", "algorithms"],
      "BCA": ["web development", "programming", "database", "java", "software engineering"],
      "BIT": ["networking", "hardware", "programming", "system administration", "database"],
      "MCA": ["advanced programming", "software architecture", "database", "algorithms", "project management"],
      "BSc Computer Science": ["python", "algorithms", "mathematics", "data structures", "research"]
    };

    const majorSkillMap = {
      "Information technology": ["IT support", "networking", "system administration", "cloud", "security"],
      "Software Engineering": ["software development", "agile", "testing", "devops", "architecture"],
      "Data Science": ["python", "machine learning", "statistics", "data analysis", "visualization"],
      "Networking": ["cisco", "networking", "security", "protocols", "infrastructure"]
    };

    // normalize mapping keys for case-insensitive lookup
    const normDegreeMap = {};
    Object.keys(degreeSkillMap).forEach((k) => { normDegreeMap[k.toLowerCase()] = degreeSkillMap[k]; });
    const normMajorMap = {};
    Object.keys(majorSkillMap).forEach((k) => { normMajorMap[k.toLowerCase()] = majorSkillMap[k]; });

    const skillSet = new Set();
    for (const c of certs) {
      const degree = c.degree ? String(c.degree).trim() : null;
      const major = c.major ? String(c.major).trim() : null;

      if (degree) {
        const dl = degree.toLowerCase();
        let mapped = normDegreeMap[dl];
        // handle common synonyms
        if (!mapped) {
          if (dl.includes('computer applications') || dl.includes('bachelor of computer applications') || dl.includes('bachelor of computer application')) {
            mapped = degreeSkillMap['BCA'];
          } else if (dl.includes('bsc') && dl.includes('computer')) {
            mapped = degreeSkillMap['BSc Computer Science'];
          } else if (dl.includes('bachelor') && dl.includes('computer')) {
            mapped = degreeSkillMap['BSc Computer Science'];
          } else if (dl.includes('csit')) {
            mapped = degreeSkillMap['CSIT'];
          }
        }
        if (mapped && Array.isArray(mapped)) mapped.forEach(s => skillSet.add(String(s).toLowerCase().trim()));
      }

      if (major) {
        const ml = major.toLowerCase();
        let mappedM = normMajorMap[ml];
        if (!mappedM) {
          if (ml.includes('computer science')) {
            mappedM = degreeSkillMap['BSc Computer Science'];
          }
        }
        if (mappedM && Array.isArray(mappedM)) mappedM.forEach(s => skillSet.add(String(s).toLowerCase().trim()));
      }
    }

    const studentSkills = Array.from(skillSet);
    const careers = await Career.find({}).lean();
    const recommendations = generateRecommendations(studentSkills, careers);

    return res.json({ success: true, studentSkills, certificatesFound: certs.length, recommendations });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET /api/career/skill-gap/:careerId
router.get("/skill-gap/:careerId", protect, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) return res.status(404).json({ success: false, error: "Student not found" });

    const studentSkills = await getStudentSkillsFromCertificates(student);
    const career = await Career.findById(req.params.careerId).lean();
    if (!career) return res.status(404).json({ success: false, error: "Career not found" });

    const matchScore = calculateMatchScore(studentSkills, career.skills || []);
    const skillGap = getSkillGap(studentSkills, career.skills || []);

    // matching skills (case-insensitive)
    const sLower = new Set((studentSkills || []).map((s) => String(s).toLowerCase().trim()));
    const matchingSkills = (career.skills || []).filter((sk) => sLower.has(String(sk).toLowerCase().trim()));

    return res.json({
      success: true,
      career: career.title,
      have: matchingSkills,
      missing: skillGap,
      matchScore,
    });
  } catch (error) {
    console.error("Error computing skill gap:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET /api/career/all
router.get("/all", async (req, res) => {
  try {
    const careers = await Career.find({}).lean();
    return res.json({ success: true, count: careers.length, careers });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// POST /api/career/seed (dev only)
router.post("/seed", async (req, res) => {
  try {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({ success: false, error: "Not allowed in production" });
    }

    const existing = await Career.countDocuments();
    if (existing > 0) return res.json({ success: true, inserted: 0, message: "Already seeded" });

    const seedData = careerSeeder.careers || [];
    if (!seedData.length) return res.status(400).json({ success: false, error: "No seed data available" });

    const inserted = await Career.insertMany(seedData);
    return res.json({ success: true, inserted: inserted.length });
  } catch (error) {
    console.error("Error seeding careers:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
