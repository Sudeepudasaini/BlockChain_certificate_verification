import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import Sidebar from '../../components/Sidebar'

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

  useEffect(() => { fetchRecommendations() }, [])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMessages])

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
                    <span className="bg-white/20 rounded-full px-3 py-1 text-sm">{recommendations.careers.length} Career Paths</span>
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top careers */}
                <div className="lg:col-span-2 card p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Career Opportunities</h3>
                  <div className="space-y-2">
                    {recommendations.careers.slice(0,5).map((career,i) => (
                      <div key={i} onClick={()=>setSelectedCareer(career)}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-l-4 border-indigo-500 bg-gray-50 dark:bg-gray-800/50">
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{career.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{career.description}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 ml-4 flex-shrink-0">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${career.demand==='Very High'?'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400':career.demand==='High'?'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400':'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>{career.demand}</span>
                          <span className="text-xs text-gray-500">{career.avgSalary?.entry}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="card p-5 space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Industry Overview</h3>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Industry Demand</span><span>{recommendations.demandScore}/100</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{width:recommendations.demandScore+'%'}}/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      ['Entry',  recommendations.salaryRange?.entry,  'border-l-green-500'],
                      ['Mid',    recommendations.salaryRange?.mid,    'border-l-blue-500'],
                      ['Senior', recommendations.salaryRange?.senior, 'border-l-purple-500'],
                    ].map(([label,range,color])=>(
                      <div key={label} className={`p-2 bg-gray-50 dark:bg-gray-800 rounded border-l-4 ${color}`}>
                        <p className="text-xs text-gray-500">{label} Level · {range?.experience}</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">NPR {range?.min?.toLocaleString()}+</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Top Employers</p>
                    <div className="flex flex-wrap gap-1">
                      {recommendations.topEmployers?.map(e=>(
                        <span key={e} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Growth path */}
                <div className="lg:col-span-3 card p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Career Growth Path</h3>
                  <div className="flex items-center overflow-x-auto gap-0 pb-2">
                    {recommendations.growthPath?.map((step,i)=>(
                      <div key={i} className="flex items-center flex-shrink-0">
                        <div className="flex flex-col items-center w-28">
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">{step.level}</div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 text-center leading-tight">{step.title}</p>
                          <p className="text-xs text-gray-500 mt-1 text-center">{step.duration}</p>
                        </div>
                        {i < recommendations.growthPath.length-1 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700 flex-shrink-0 mx-1"/>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CAREERS */}
            {activeTab === 'careers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.careers.map((career,i)=>(
                  <div key={i} onClick={()=>setSelectedCareer(career)}
                    className="card p-5 hover:shadow-lg cursor-pointer transition-all">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 text-lg ${career.demand==='Very High'?'bg-green-100 dark:bg-green-900/30':career.demand==='High'?'bg-blue-100 dark:bg-blue-900/30':'bg-gray-100 dark:bg-gray-700'}`}>💼</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{career.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{career.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`px-2 py-0.5 text-xs rounded font-medium ${career.demand==='Very High'?'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400':'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{career.demand}</span>
                      <span className="text-xs text-gray-500">{career.avgSalary?.entry}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: ROADMAP */}
            {activeTab === 'roadmap' && (
              <div className="space-y-6">
                {[
                  { stage:'Beginner',     color:'border-l-green-500',  badge:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',   data:recommendations.roadmap?.beginner },
                  { stage:'Intermediate', color:'border-l-indigo-500', badge:'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400', data:recommendations.roadmap?.intermediate },
                  { stage:'Advanced',     color:'border-l-purple-500', badge:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', data:recommendations.roadmap?.advanced },
                ].map(({stage,color,badge,data},i)=>(
                  <div key={stage} className={`card p-6 border-l-4 ${color}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${badge}`}>{i+1}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{stage}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${badge}`}>{data?.duration}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {data?.topics?.map((topic,j)=>(
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-4 h-4 rounded border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"/>
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                {[
                  { label:'Technical Skills', items:recommendations.skills?.technical, colors:['bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300','bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300','bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'] },
                  { label:'Soft Skills',       items:recommendations.skills?.soft,      colors:['bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300','bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300'] },
                  { label:'Tools & Tech',      items:recommendations.skills?.tools,     colors:['bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300','bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'] },
                ].map(({label,items,colors})=>(
                  <div key={label} className="card p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items?.map((skill,i)=>(
                        <span key={skill} className={`px-3 py-1.5 rounded-full text-sm font-medium ${colors[i%colors.length]}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
