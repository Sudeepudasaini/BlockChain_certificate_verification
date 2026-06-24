import React, { useMemo } from 'react'

function normalizeRecommendations(recommendations) {
  if (Array.isArray(recommendations)) return recommendations
  if (recommendations?.recommendations && Array.isArray(recommendations.recommendations)) return recommendations.recommendations
  if (recommendations?.careers && Array.isArray(recommendations.careers)) return recommendations.careers
  return []
}

export function SkillsTabPanel({ recommendations = [], studentSkills = [], loading = false }) {
  const items = useMemo(() => normalizeRecommendations(recommendations), [recommendations])

  const skillsToLearn = useMemo(() => {
    const merged = new Set()
    items.forEach((career) => (career.skillGap || []).forEach((skill) => merged.add(skill)))
    return Array.from(merged)
  }, [items])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Loading skills overview...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
            ✅
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Skills You Have</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Detected from your profile and certificates</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {studentSkills.length === 0 && <span className="text-sm text-gray-400">No skills detected yet.</span>}
          {studentSkills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
            📚
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Skills to Learn</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Combined from all recommended career gaps</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillsToLearn.length === 0 && <span className="text-sm text-gray-400">No missing skills identified.</span>}
          {skillsToLearn.map((skill) => (
            <a
              key={skill}
              href={`https://www.coursera.org/search?query=${encodeURIComponent(skill)}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-sm font-medium hover:bg-amber-200 transition-colors"
            >
              {skill}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsTabPanel
