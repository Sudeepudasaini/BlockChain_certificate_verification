import React, { useMemo } from 'react'

function getMatchPercent(score) {
  return Math.round((Number(score) || 0) * 100)
}

function normalizeRecommendations(recommendations) {
  if (Array.isArray(recommendations)) return recommendations
  if (recommendations?.recommendations && Array.isArray(recommendations.recommendations)) return recommendations.recommendations
  if (recommendations?.careers && Array.isArray(recommendations.careers)) return recommendations.careers
  return []
}

function getStageStyles(index) {
  const styles = [
    { border: 'border-l-green-500', badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
    { border: 'border-l-blue-500', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
    { border: 'border-l-purple-500', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  ]
  return styles[index % styles.length]
}

export function LearningRoadmapTabPanel({ recommendations = [], loading = false }) {
  const items = useMemo(() => normalizeRecommendations(recommendations), [recommendations])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Loading learning roadmap...
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="card p-8 text-center text-gray-500 dark:text-gray-400">
        No roadmap data available yet.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((career, index) => {
        const stage = getStageStyles(index)
        const skillGap = Array.isArray(career.skillGap) ? career.skillGap : []
        const percent = getMatchPercent(career.score)

        return (
          <div key={`${career.title}-${index}`} className={`card p-6 border-l-4 ${stage.border}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{career.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{career.description || 'Recommended next steps for this career.'}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${stage.badge}`}>
                  {career.level || 'Next step'}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Match: {percent}%</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-semibold text-gray-900 dark:text-white">Skills to learn</h5>
                <span className="text-xs text-gray-500 dark:text-gray-400">{skillGap.length} needed</span>
              </div>
              {skillGap.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No additional skills listed for this career.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skillGap.map((skill) => (
                    <a
                      key={skill}
                      href={`https://www.coursera.org/search?query=${encodeURIComponent(skill)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      {skill}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LearningRoadmapTabPanel
