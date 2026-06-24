import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import Sidebar from '../../components/Sidebar'
import { OverviewTabPanel } from './OverviewTabPanel'
import { CareerPathsTabPanel } from './CareerPathsTabPanel'
import { LearningRoadmapTabPanel } from './LearningRoadmapTabPanel'
import { SkillsTabPanel } from './SkillsTabPanel'

function CareerCounseling() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState(null)
  const [basedOn, setBasedOn] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "Hi! I'm CertBot, your AI career advisor. Ask me anything about your career path, skills to learn, or job opportunities in Nepal!" }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const [aiRecs, setAiRecs] = useState([])
  const [aiRecsLoading, setAiRecsLoading] = useState(true)
  const [studentSkills, setStudentSkills] = useState([])

  useEffect(() => { fetchRecommendations() }, [])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMessages])

  useEffect(() => {
    async function fetchAiRecs() {
      try {
        const res = await api.get('/career/recommendations')
        if (res.data.success) {
          setAiRecs(res.data.recommendations || [])
          setStudentSkills(res.data.studentSkills || [])
        }
      } catch (err) {
        console.error('AI recs error', err)
      } finally {
        setAiRecsLoading(false)
      }
    }
    fetchAiRecs()
  }, [])

  async function fetchRecommendations() {
    try {
      const res = await api.get('/career/recommendations')
      setRecommendations(res.data.recommendations)
      setBasedOn(res.data.basedOn)
    } catch (err) {
      toast.error('Failed to load career data')
    } finally {
      setLoading(false)
    }
  }

  async function handleSendMessage(question) {
    const q = question || chatInput
    if (!q?.trim()) return
    setChatMessages(prev => [...prev, { role: 'user', content: q }])
    setChatInput('')
    setChatLoading(true)
    try {
      const history = chatMessages.slice(-6)
      const res = await api.post('/career/ask', { question: q, conversationHistory: history })
      setChatMessages(prev => [...prev, { role: 'assistant', content: res.data.answer }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process that. Please try again." }])
    } finally {
      setChatLoading(false)
    }
  }

  const TABS = [
    { key: 'overview',        label: 'Overview' },
    { key: 'careers',         label: 'Career Paths' },
    { key: 'roadmap',         label: 'Learning Roadmap' },
    { key: 'skills',          label: 'Skills' },
    { key: 'certifications',  label: 'Certifications' },
    { key: 'ai-match',        label: '🎯 AI Match' },
    { key: 'ai-chat',         label: '🤖 AI Advisor' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 p-6">

        {/* TOPBAR */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              🧭
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Career Counseling</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Personalized guidance based on your academic background</p>
            </div>
          </div>
          {basedOn && (
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm rounded-full font-medium">
              Based on: {basedOn}
            </span>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            Loading your personalized career guidance...
          </div>
        )}

        {!loading && !recommendations && (
          <div className="card p-12 text-center text-gray-500 dark:text-gray-400">
            No certificate data found. Add certificates to get personalized recommendations.
          </div>
        )}

        {!loading && recommendations && (
          <>
            {/* HERO CARD */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Career Roadmap</p>
                  <h2 className="text-3xl font-bold">{recommendations.programName}</h2>
                  <p className="text-white/80 mt-2 text-sm max-w-xl">{recommendations.description}</p>
                  <div className="flex gap-3 mt-4 flex-wrap">
                    <span className="bg-white/20 rounded-full px-3 py-1 text-sm">🔥 {recommendations.industryDemand} Demand</span>
                    <span className="bg-white/20 rounded-full px-3 py-1 text-sm">{(recommendations.careers || []).length} Career Paths</span>
                    <span className="bg-white/20 rounded-full px-3 py-1 text-sm">{recommendations.demandScore}/100 Score</span>
                  </div>
                </div>
                <div className="text-6xl hidden lg:block">🧭</div>
              </div>
            </div>

            {/* TAB NAV */}
            <div className="flex gap-1 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
              {TABS.map(tab => (
                <button key={tab.key}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab===tab.key?'bg-indigo-600 text-white':'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <OverviewTabPanel
                recommendations={recommendations?.careers || recommendations || []}
                studentSkills={studentSkills}
                loading={loading}
              />
            )}

            {/* TAB: CAREERS */}
            {activeTab === 'careers' && (
              <CareerPathsTabPanel
                recommendations={recommendations?.careers || recommendations || []}
                studentSkills={studentSkills}
                loading={loading}
              />
            )}

            {/* TAB: ROADMAP */}
            {activeTab === 'roadmap' && (
              <LearningRoadmapTabPanel
                recommendations={recommendations?.careers || recommendations || []}
                loading={loading}
              />
            )}

            {/* TAB: SKILLS */}
            {activeTab === 'skills' && (
              <SkillsTabPanel
                recommendations={recommendations?.careers || recommendations || []}
                studentSkills={studentSkills}
                loading={loading}
              />
            )}

            {/* TAB: CERTIFICATIONS */}
            {activeTab === 'certifications' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.certifications?.map((cert,i)=>(
                    <div key={i} className="card p-5 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm flex-shrink-0">
                        {cert.provider?.slice(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{cert.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{cert.provider}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded">{cert.level}</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs rounded">{cert.relevance} Relevance</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-sm mb-2">Why get certified?</h4>
                  {['Validates your skills to employers','Increases your earning potential by 20-40%','Opens doors to international job markets','Demonstrates commitment to professional growth'].map(b=>(
                    <div key={b} className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400 mt-1">
                      <span>✓</span><span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: AI CHAT */}
            {activeTab === 'ai-match' && (
              <div className="space-y-6">

                {/* Detected Skills from Certificates */}
                <div className="card p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Skills Detected from Your Certificates
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {studentSkills.length === 0
                      ? <span className="text-sm text-gray-400">No skills detected yet. Make sure your certificate has a degree/major.</span>
                      : studentSkills.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-sm font-medium">{s}</span>
                        ))
                    }
                  </div>
                </div>

                {/* Loading state */}
                {aiRecsLoading && (
                  <div className="flex items-center justify-center h-40 text-gray-400">
                    Calculating your career matches...
                  </div>
                )}

                {/* No recommendations */}
                {!aiRecsLoading && aiRecs.length === 0 && (
                  <div className="card p-10 text-center text-gray-400">
                    No matches found. Ensure your certificate has a recognized degree (CSIT, BCA, BIT, MCA) and the career database is seeded.
                    <div className="mt-3 text-sm">Run: POST /api/career/seed to add career data.</div>
                  </div>
                )}

                {/* Recommendation Cards */}
                {!aiRecsLoading && aiRecs.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {aiRecs.map((rec, i) => {
                      const percent = Math.round((Number(rec.score) || 0) * 100)
                      const barColor = percent > 70 ? 'bg-green-500' : percent >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                      const missing = rec.skillGap || []

                      // skills student already has for this career
                      const haveSkills = (rec.skills || []).filter(sk =>
                        studentSkills.map(x => x.toLowerCase()).includes(sk.toLowerCase())
                      )

                      return (
                        <div key={rec.title} className="card p-5 flex flex-col gap-4 hover:shadow-lg transition-all">

                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white text-base">{rec.title}</h4>
                              <div className="flex gap-2 mt-1 flex-wrap">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  rec.level === 'entry' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                  : rec.level === 'mid' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                }`}>{rec.level}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{rec.salaryRange}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs text-gray-400">Match</div>
                              <div className={`text-xl font-bold ${percent > 70 ? 'text-green-600' : percent >= 40 ? 'text-yellow-500' : 'text-red-500'}`}>{percent}%</div>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className={`${barColor} h-2 rounded-full transition-all`} style={{ width: `${percent}%` }} />
                          </div>

                          {/* Skills you have */}
                          <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">✅ Skills You Have</p>
                            <div className="flex flex-wrap gap-1.5">
                              {haveSkills.length === 0
                                ? <span className="text-xs text-gray-400">Building from scratch</span>
                                : haveSkills.map(s => (
                                    <span key={s} className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">{s}</span>
                                  ))
                              }
                            </div>
                          </div>

                          {/* Skills to learn */}
                          <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">📚 Learn Next</p>
                            <div className="flex flex-wrap gap-1.5">
                              {missing.length === 0
                                ? <span className="text-xs text-green-600 font-medium">You have all required skills!</span>
                                : missing.slice(0, 4).map(s => (
                                    <a key={s}
                                      href={`https://www.coursera.org/search?query=${encodeURIComponent(s)}`}
                                      target="_blank" rel="noreferrer"
                                      className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs hover:bg-red-200 transition-colors cursor-pointer"
                                      title="Find course on Coursera"
                                    >{s} →</a>
                                  ))
                              }
                            </div>
                          </div>

                          {/* Certifications */}
                          {rec.certifications && rec.certifications.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">🏆 Get Certified</p>
                              <div className="flex flex-wrap gap-1.5">
                                {rec.certifications.map(c => (
                                  <span key={c} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">{c}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Job roles */}
                          {rec.jobRoles && rec.jobRoles.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">💼 Job Roles</p>
                              <div className="flex flex-wrap gap-1.5">
                                {rec.jobRoles.map(r => (
                                  <span key={r} className="px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-xs">{r}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Ask AI button */}
                          <button
                            className="mt-auto w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
                            onClick={() => {
                              setActiveTab('ai-chat')
                              setTimeout(() => handleSendMessage(`How can I become a ${rec.title} with my current skills? What should I learn first from: ${missing.slice(0,3).join(', ')}?`), 100)
                            }}
                          >
                            Ask AI About This Career
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ai-chat' && (
              <div className="card overflow-hidden flex flex-col" style={{height:'600px'}}>
                {/* Chat header */}
                <div className="bg-indigo-600 text-white p-4 flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-xl">🤖</div>
                  <div>
                    <p className="font-semibold">CertBot</p>
                    <p className="text-indigo-200 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block"/>Online
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                  {chatMessages.map((msg,i)=>(
                    <div key={i} className={`flex gap-3 ${msg.role==='user'?'justify-end':''}`}>
                      {msg.role==='assistant' && (
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm">🤖</div>
                      )}
                      <div className={`rounded-2xl px-4 py-3 max-w-xs md:max-w-md text-sm whitespace-pre-wrap ${
                        msg.role==='assistant'
                          ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-tl-sm text-gray-800 dark:text-gray-200'
                          : 'bg-indigo-600 text-white rounded-tr-sm'
                      }`}>{msg.content}</div>
                      {msg.role==='user' && (
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs font-bold">
                          {user?.name?.charAt(0)?.toUpperCase()||'U'}
                        </div>
                      )}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex-shrink-0 flex items-center justify-center text-sm">🤖</div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1 items-center h-5">
                          {[0,1,2].map(j=>(
                            <div key={j} className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:j*0.15+'s'}}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef}/>
                </div>

                {/* Suggested questions — only before user sends first message */}
                {chatMessages.length <= 1 && (
                  <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'What jobs suit my degree?',
                        'How to become a blockchain developer?',
                        'Which certification should I take first?',
                        'Salary for software engineer in Nepal?',
                        'What skills should I learn next?',
                      ].map(q=>(
                        <button key={q}
                          className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                          onClick={()=>handleSendMessage(q)}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0 flex gap-3">
                  <textarea
                    className="form-input flex-1 resize-none"
                    rows={2}
                    value={chatInput}
                    onChange={e=>setChatInput(e.target.value)}
                    placeholder="Ask me anything about your career path..."
                    onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSendMessage(chatInput)} }}
                  />
                  <button
                    className="btn-primary px-4 self-end"
                    disabled={!chatInput.trim()||chatLoading}
                    onClick={()=>handleSendMessage(chatInput)}>
                    Send
                  </button>
                </div>
              </div>
            )}

          </>
        )}

        {/* CAREER DETAIL MODAL */}
        {selectedCareer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={()=>setSelectedCareer(null)}>
            <div className="card max-w-lg w-full p-6" onClick={e=>e.stopPropagation()}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{selectedCareer.title}</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={()=>setSelectedCareer(null)}>✕</button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{selectedCareer.description}</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[['Entry',selectedCareer.avgSalary?.entry,'border-l-green-500'],['Mid',selectedCareer.avgSalary?.mid,'border-l-blue-500'],['Senior',selectedCareer.avgSalary?.senior,'border-l-purple-500']].map(([label,salary,color])=>(
                  <div key={label} className={`p-3 bg-gray-50 dark:bg-gray-800 rounded border-l-4 ${color}`}>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{salary}</p>
                  </div>
                ))}
              </div>
              <span className={`inline-block mt-3 px-2 py-0.5 text-xs rounded font-medium ${selectedCareer.demand==='Very High'?'bg-green-100 text-green-700':'bg-blue-100 text-blue-700'}`}>{selectedCareer.demand} Demand</span>
              <button className="btn-ghost w-full mt-4" onClick={()=>setSelectedCareer(null)}>Close</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default CareerCounseling
