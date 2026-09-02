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
console.log('GROQ KEY:', process.env.GROQ_API_KEY ? 'present' : 'MISSING')
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

    if (!process.env.GROQ_API_KEY) {
      return res.json({ answer: `Based on your ${careerData.programName || programKey.toUpperCase()} background, your top career options are: ${topCareers}. Add a GROQ_API_KEY to your .env file to get full AI-powered answers.` })
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-4).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content || ''
      })),
      { role: 'user', content: question }
    ]

    const modelEnv = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'
    const fallbackEnv = process.env.GROQ_MODEL_FALLBACK || 'llama-3-8b-instant,llama-3.1,gpt-4o-mini'
    const fallbackModels = fallbackEnv.split(',').map(s => s.trim()).filter(Boolean)
    const modelsToTry = [modelEnv, ...fallbackModels.filter(m => m !== modelEnv)]
    console.log('GROQ models to try:', modelsToTry)

    // Try to discover available models for the API key to improve reliability
    try {
      const mres = await fetch('https://api.groq.com/openai/v1/models', {
        method: 'GET',
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` }
      })
      if (mres.ok) {
        const mdata = await mres.json()
        const available = (mdata?.data || mdata?.models || []).map(m => m.id || m.name || m)
        if (Array.isArray(available) && available.length) {
          // Prepend any available models not already in the list
          for (const a of available) {
            if (a && !modelsToTry.includes(a)) modelsToTry.push(a)
          }
          console.log('Discovered GROQ models for this key:', available)
        }
      } else {
        console.warn('Could not fetch GROQ models list — continuing with configured models')
      }
    } catch (e) {
      console.warn('Error while attempting to discover GROQ models:', e)
    }

    let lastErrorDetails = null
    for (const modelName of modelsToTry) {
      console.log('Attempting GROQ model:', modelName)
      let response
      try {
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`
          },
          body: JSON.stringify({ model: modelName, messages, max_tokens: 600, temperature: 0.7 })
        })
      } catch (e) {
        console.error('Network error when calling GROQ:', e)
        lastErrorDetails = e
        continue
      }

      let data
      try {
        data = await response.json()
      } catch (e) {
        console.error('Groq API returned non-JSON response', e)
        lastErrorDetails = e
        continue
      }

      if (!response.ok) {
        // If model not found, try next model in the list
        const code = data?.error?.code || data?.code || null
        const msg = data?.error?.message || data?.message || ''
        console.warn(`GROQ response not ok for model=${modelName} code=${code} message=${msg}`)
        lastErrorDetails = data
        if (code === 'model_not_found' || /does not exist|not found|no access/i.test(String(msg))) {
          // try next model
          continue
        }
        return res.status(500).json({ error: 'AI service error', details: data })
      }

      // Successful response — extract answer using tolerant parsing
      const answer =
        data?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.text ||
        data?.choices?.[0]?.message ||
        (Array.isArray(data?.output) && data.output[0]?.content?.map(c => c?.text || c?.[0]).join('')) ||
        data?.output?.[0]?.content?.[0]?.text ||
        data?.result?.[0]?.content?.[0]?.text ||
        data?.text ||
        data?.message?.content ||
        null

      const finalAnswer = answer || 'Sorry, I could not generate a response. Please try again.'
      return res.json({ answer: finalAnswer })
    }

    // If we reach here, all model attempts failed
    console.error('All GROQ model attempts failed', lastErrorDetails)
    return res.status(500).json({ error: 'AI service error', details: lastErrorDetails || 'No response from GROQ' })

  } catch (err) {
    console.error('askAssistant error:', err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getRecommendations, askAssistant }
