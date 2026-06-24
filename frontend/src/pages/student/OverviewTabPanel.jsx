import React, { useMemo } from 'react'

function getMatchPercent(score) {
  return Math.round((Number(score) || 0) * 100)
}

function getDemandLabel(score) {
  const percent = getMatchPercent(score)
  if (percent >= 75) return 'Very High'
  if (percent >= 50) return 'High'
  return 'Medium'
}

function getDemandClasses(score) {
  const label = getDemandLabel(score)
  if (label === 'Very High') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
  if (label === 'High') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
  return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
}

function normalizeRecommendations(recommendations) {
  if (Array.isArray(recommendations)) return recommendations
  if (recommendations?.recommendations && Array.isArray(recommendations.recommendations)) return recommendations.recommendations
  if (recommendations?.careers && Array.isArray(recommendations.careers)) return recommendations.careers
  return []
}

export function OverviewTabPanel({ recommendations = [], studentSkills = [], loading = false }) {
  const items = useMemo(() => normalizeRecommendations(recommendations), [recommendations])

  const topCareers = useMemo(() => {
    return [...items].sort((a, b) => (Number(b.score) || 0) - (Number(a.score) || 0)).slice(0, 5)
  }, [items])

  const averageMatch = useMemo(() => {
    if (!items.length) return 0
    const total = items.reduce((sum, item) => sum + getMatchPercent(item.score), 0)
    return Math.round(total / items.length)
  }, [items])

  const skillGapUnion = useMemo(() => {
    const merged = new Set()
    items.forEach((item) => (item.skillGap || []).forEach((skill) => merged.add(skill)))
    return Array.from(merged)
  }, [items])

  const highestSalary = useMemo(() => {
    return items.reduce((best, item) => {
      if (!item.salaryRange) return best
      return best ? (item.salaryRange.length > best.length ? item.salaryRange : best) : item.salaryRange
    }, '')
  }, [items])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Loading your personalized career overview...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-1">Career Roadmap</p>
            <h3 className="text-3xl font-semibold">
              {items[0]?.title ? `${items[0].title} Path` : 'Career Opportunities'}
            </h3>
            <p className="text-white/80 mt-3 text-sm max-w-2xl leading-6">
              {items[0]?.description || 'Personalized career guidance based on your certificates, skills, and target roles.'}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-white/20 rounded-full px-3 py-1 text-sm">🔥 {topCareers.length} Career Paths</span>
              <span className="bg-white/20 rounded-full px-3 py-1 text-sm">📈 {averageMatch}/100 Match</span>
              <span className="bg-white/20 rounded-full px-3 py-1 text-sm">🧠 {studentSkills.length || 0} Detected Skills</span>
            </div>
          </div>
          <div className="text-6xl hidden lg:block">🧭</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Top Career Opportunities</h4>
            <span className="hidden text-xs text-gray-500 dark:text-gray-400">Sorted by match</span>
          </div>
          <div className="space-y-2">
            {topCareers.map((career, index) => {
              const percent = getMatchPercent(career.score)
              return (
                <div
                  key={`${career.title}-${index}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60"
                >
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-white">{career.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{career.description}</p>
                  </div>
                  <div className="ml-4 text-right flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDemandClasses(career.score)}`}>
                      {getDemandLabel(career.score)}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{career.salaryRange || 'Salary pending'}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card p-5 space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">Industry Overview</h4>

          <div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Average match</span>
              <span>{averageMatch}%</span>
            </div>
            <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${averageMatch}%` }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border-l-4 border-green-500">
              <p className="text-xs text-gray-500 dark:text-gray-400">Entry level</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{items[0]?.salaryRange || 'Salary pending'}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border-l-4 border-blue-500">
              <p className="text-xs text-gray-500 dark:text-gray-400">Best salary signal</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{highestSalary || 'Available once data is loaded'}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border-l-4 border-purple-500">
              <p className="text-xs text-gray-500 dark:text-gray-400">Skills to learn</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{skillGapUnion.slice(0, 3).join(', ') || 'No gaps identified'}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Detected Skills</p>
            <div className="flex flex-wrap gap-2">
              {(studentSkills || []).length === 0 && <span className="text-sm text-gray-400">No skills detected yet</span>}
              {(studentSkills || []).slice(0, 6).map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h4 className="font-semibold text-gray-900 dark:text-white">Career Growth Path</h4>
          <span className="hidden text-xs text-gray-500 dark:text-gray-400">Based on your top recommendations</span>
        </div>
        <div className="flex items-center overflow-x-auto gap-0 pb-2">
          {topCareers.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recommendations available yet.</p>
          )}
          {topCareers.map((career, index) => (
            <div key={`${career.title}-${index}`} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center w-28">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 text-center leading-tight">{career.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">{career.level || 'Next step'}</p>
              </div>
              {index < topCareers.length - 1 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700 flex-shrink-0 mx-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OverviewTabPanel
