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

    const certs = await Certificate.find({ studentUser: student._id }).lean();
    const certificateNames = certs.map((c) => c.degree || c.major || c.certId || c.universityName).filter(Boolean);

    const studentSkills = await getStudentSkillsFromCertificates(student);

    const careers = await Career.find({}).lean();
    const recommendations = generateRecommendations(studentSkills, careers);
    const top = recommendations[0] || null;
    if (!top) return res.status(404).json({ success: false, error: "No career recommendations available" });

    // Find the full career document for skill gap calculation (to preserve original casing)
    const careerDoc = careers.find((c) => (c.title || "").toLowerCase() === (top.title || "").toLowerCase()) || careers[0];
    const skillGap = getSkillGap(studentSkills, careerDoc.skills || []);

    const systemPrompt = `You are CertBot, an AI career advisor ONLY for IT/tech students in Nepal.
Answer ONLY questions about: tech career paths, skills to learn, certifications, salary ranges, learning roadmaps, and IT job opportunities in Nepal.

Student Profile:
- Certificates/Degrees: ${certificateNames.join(", ") || "Not provided"}
- Current Skills: ${studentSkills.join(", ") || "None detected"}
- Top Recommended Career: ${top?.title || "Not determined"}
- Match Score: ${top ? Math.round(top.score * 100) : 0}%
- Skills Gap to Fill: ${skillGap.join(", ") || "None"}

STRICT RULES:
1. If the question is NOT about tech careers, skills, certifications, or IT jobs — reply ONLY with: "I'm CertBot, your tech career advisor. I can only answer questions about IT careers, skills, certifications, and job opportunities. Please ask something related to your career path!"
2. Never answer questions about sports, celebrities, entertainment, personal life, politics, or anything outside tech careers.
3. Always give specific actionable advice using the student profile above.
4. Keep answers under 250 words. Use bullet points for clarity.
5. For Nepal salary questions give NPR ranges like NPR 40,000–120,000/month.`;

    // Forward to AI provider if available
    let aiResponse = null;

    // Prefer OpenAI if key present
    if (process.env.OPENAI_API_KEY) {
      try {
        const resp = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
            messages: [
              { role: "system", content: systemPrompt },
              ...conversationHistory.slice(-4).map(m => ({ role: m.role, content: m.content })),
              { role: "user", content: question }
            ],
            max_tokens: 500,
          }),
        });
        const data = await resp.json();
        aiResponse = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || JSON.stringify(data);
      } catch (err) {
        console.error("OpenAI request failed:", err);
      }
    } else if (process.env.ANTHROPIC_API_KEY) {
      try {
        const resp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 500,
            system: systemPrompt,
            messages: [
              ...conversationHistory.slice(-4).map(m => ({ role: m.role, content: m.content })),
              { role: "user", content: question }
            ]
          }),
        });
        const data = await resp.json();
        aiResponse = data?.content?.[0]?.text;
      } catch (err) {
        console.error("Anthropic request failed:", err);
      }
    }

    if (!aiResponse) {
      // fallback: simple heuristic answer
      const fallback = `Based on your profile, focus on: ${skillGap.slice(0,3).join(", ")}. These are the key skills needed for ${top?.title || "a tech career"} in Nepal.`;
      return res.json({ success: true, answer: fallback });
    }

    return res.json({ success: true, answer: aiResponse });
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
