const careerDatabase = require('../data/careerData')
const Certificate = require('../models/Certificate')

function normalizeDegree(degree) {
  if (!degree) return 'bca'
  const d = degree.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')
  if (d.includes('bca')) return 'bca'
  if (d.includes('csit')) return 'bsccsit'
  if (d.includes('bit') && !d.includes('mbit')) return 'bit'
  if (d.includes('bim')) return 'bim'
  if (d.includes('bbm')) return 'bbm'
  if (d.includes('bba')) return 'bba'
  if (d.includes('mba')) return 'mba'
  if (d.includes('besoftware') || d.includes('software')) return 'besoftware'
  if (d.includes('computer') && d.includes('engin')) return 'becomputer'
  if (d.includes('electronics')) return 'beelectronics'
  if (d.includes('civil')) return 'becivil'
  if (d.includes('mechanical')) return 'bemechanical'
  if (d.includes('mca')) return 'mca'
  if (d.includes('mit')) return 'mit'
  if (d.includes('mscit')) return 'mscit'
  return 'bca'
}

// GET /api/career/recommendations
async function getRecommendations(req, res) {
  try {
    let programKey = req.query.program
    if (!programKey && req.user) {
      const certs = await Certificate.find({ studentEmail: req.user.email })
      const degree = certs[0]?.degree || ''
      programKey = normalizeDegree(degree)
    }
    programKey = (programKey || 'bca').toLowerCase()
    const data = careerDatabase[programKey] || careerDatabase.bca
    res.json({ recommendations: data, basedOn: data.shortName || data.programName || programKey.toUpperCase() })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST /api/career/ask
async function askAssistant(req, res) {
  try {
    const { question, conversationHistory = [] } = req.body
    if (!question) return res.status(400).json({ error: 'Question required' })

    let certificateNames = ''
    let programKey = 'bca'
    if (req.user) {
      const certs = await Certificate.find({ studentEmail: req.user.email })
      certificateNames = certs.map(c => `${c.degree || ''} from ${c.universityName || ''}`).filter(Boolean).join('; ')
      const degree = certs[0]?.degree || ''
      programKey = normalizeDegree(degree)
    }

    const careerData = careerDatabase[programKey] || careerDatabase.bca
    const topCareers = (careerData.careers || []).slice(0, 3).map(c => c.title).join(', ')

    const systemPrompt = `You are CertBot, an AI career advisor ONLY for IT/tech students in Nepal.
Answer ONLY questions about: tech career paths, skills to learn, certifications, salary ranges, learning roadmaps, and IT job opportunities in Nepal.

Student Profile:
- Certificates/Degrees: ${certificateNames || 'Not provided'}
- Program: ${careerData.programName || programKey.toUpperCase()}
- Top Recommended Careers: ${topCareers || 'Full Stack Developer, Data Scientist, Network Engineer'}

STRICT RULES:
1. If the question is NOT about tech careers, IT skills, certifications, programming, or job market — reply ONLY with: "I'm CertBot, your tech career advisor. I can only answer questions about IT careers, skills, certifications, and job opportunities. Please ask something related to your career path!"
2. Never answer questions about sports, celebrities, entertainment, personal relationships, politics, or anything outside tech careers.
3. Give specific actionable advice based on the student profile above.
4. Keep answers under 250 words. Use bullet points for clarity.
5. For Nepal salary questions give NPR ranges (e.g., NPR 40,000-120,000/month).`

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ answer: `Based on your ${careerData.programName || programKey.toUpperCase()} background, your top career options are: ${topCareers}. Add a GEMINI_API_KEY to your .env file to get full AI-powered answers.` })
    }

    const conversationParts = conversationHistory.slice(-4).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [
            ...conversationParts,
            { role: 'user', parts: [{ text: question }] }
          ],
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7
          }
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API error:', data)
      return res.status(500).json({ error: 'AI service error', details: data })
    }

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response. Please try again.'
    return res.json({ answer })

  } catch (err) {
    console.error('askAssistant error:', err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getRecommendations, askAssistant }
