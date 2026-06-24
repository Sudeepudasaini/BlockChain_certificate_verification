import React, { useMemo, useState } from 'react'

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

function getIconStyle(index) {
  const styles = [
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    'bg-coral-100 text-coral-700 dark:bg-coral-900/30 dark:text-coral-300',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  ]
  return styles[index % styles.length]
}

function normalizeRecommendations(recommendations) {
  if (Array.isArray(recommendations)) return recommendations
  if (recommendations?.recommendations && Array.isArray(recommendations.recommendations)) return recommendations.recommendations
  if (recommendations?.careers && Array.isArray(recommendations.careers)) return recommendations.careers
  return []
}

export function CareerPathsTabPanel({ recommendations = [], studentSkills = [], loading = false }) {
  const items = useMemo(() => normalizeRecommendations(recommendations), [recommendations])
  const [selectedCareer, setSelectedCareer] = useState(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Loading career paths...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 card p-8 text-center text-gray-500 dark:text-gray-400">
            No career paths available yet.
          </div>
        )}

        {items.map((career, index) => (
          <button
            key={`${career.title}-${index}`}
            type="button"
            onClick={() => setSelectedCareer(career)}
            className="text-left card p-5 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-xl font-semibold ${getIconStyle(index)}`}>
              {index + 1}
            </div>
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{career.title}</h4>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDemandClasses(career.score)}`}>
                {getDemandLabel(career.score)}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-5 line-clamp-3">
              {career.description || 'No description available.'}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{career.salaryRange || 'Salary pending'}</span>
              <span>{career.level || 'Next step'}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedCareer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCareer(null)}>
          <div className="card max-w-lg w-full p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{selectedCareer.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedCareer.description || 'No description available.'}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setSelectedCareer(null)}>
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4 border-green-500">
                <p className="text-xs text-gray-500">Match</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{getMatchPercent(selectedCareer.score)}%</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500">
                <p className="text-xs text-gray-500">Level</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{selectedCareer.level || 'N/A'}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-l-4 border-purple-500">
                <p className="text-xs text-gray-500">Salary</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{selectedCareer.salaryRange || 'Pending'}</p>
              </div>
            </div>

            {(selectedCareer.jobRoles || []).length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Job Roles</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.jobRoles.map((role) => (
                    <span key={role} className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(selectedCareer.certifications || []).length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.certifications.map((cert) => (
                    <span key={cert} className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {studentSkills?.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Skills from your profile</p>
                <div className="flex flex-wrap gap-2">
                  {studentSkills.slice(0, 6).map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerPathsTabPanel
