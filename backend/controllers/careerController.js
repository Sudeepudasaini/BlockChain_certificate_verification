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
    const { question, conversationHistory } = req.body
    if (!question) return res.status(400).json({ error: 'Question required' })

    // If Anthropic API key present, forward; otherwise return a helpful fallback
    if (!process.env.ANTHROPIC_API_KEY) {
      // build a simple fallback answer using user's certificates if available
      let context = ''
      if (req.user) {
        const certs = await Certificate.find({ studentEmail: req.user.email })
        context = certs.map(c => `${c.degree} from ${c.universityName}`).join('; ') || ''
      }
      const fallback = `Based on your input${context ? ' (' + context + ')' : ''}, consider learning core skills, building projects, and applying to internships. Be specific about roles or technologies for better advice.`
      return res.json({ answer: fallback })
    }

    // If ANTHROPIC_API_KEY exists, a production integration would go here.
    // For now, return a placeholder acknowledging the question.
    res.json({ answer: `Assistant (placeholder): Received your question - "${question}". This deployment does not have an AI key configured.` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getRecommendations, askAssistant }
