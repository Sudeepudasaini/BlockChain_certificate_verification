import React, { useState, useRef, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AutocompleteInput = ({ name, value, onChange, suggestions = [], placeholder = '', required = false, className = '' }) => {
  const [open, setOpen] = useState(false)
  const [filtered, setFiltered] = useState([])
  const [active, setActive] = useState(-1)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setActive(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleInput = (e) => {
    const v = e.target.value
    onChange(name, v)
    if (!v) {
      setFiltered([])
      setOpen(false)
      return
    }
    const matches = suggestions.filter(s => String(s).toLowerCase().includes(String(v).toLowerCase())).slice(0, 5)
    setFiltered(matches)
    setActive(-1)
    setOpen(matches.length > 0)
  }

  const handleKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      if (active >= 0 && filtered[active]) {
        e.preventDefault()
        onChange(name, filtered[active])
        setOpen(false)
        setActive(-1)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActive(-1)
    }
  }

  const handleSelect = (val) => {
    onChange(name, val)
    setOpen(false)
    setActive(-1)
  }

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        required={required}
        className={className}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 bg-white shadow z-50 mt-1 rounded overflow-hidden">
          {filtered.map((s, idx) => (
            <div
              key={s + idx}
              onClick={() => handleSelect(s)}
              className={`px-3 py-2 cursor-pointer ${idx === active ? 'bg-blue-50' : ''}`}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const IssueCertificate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    studentEmail: '',
    degree: '',
    major: '',
    graduationYear: '',
    issueDate: '',
    institution: '',
    description: '',
  })
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.studentName || !formData.studentEmail || !formData.degree || !formData.graduationYear || !file) {
      toast.error('Please fill all required fields')
      return
    }

    setLoading(true)
    setUploadProgress(0)

    try {
      const formDataObj = new FormData()
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key])
      })
      formDataObj.append('certificate', file)

      await api.post('/certificates/issue', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percent)
        },
      })

      toast.success('Certificate issued successfully!')
      navigate('/university/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to issue certificate')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar role="university" />

      <div className="flex-1 main-content">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-8">Issue Certificate</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="card-base p-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Student Full Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className="input-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="input-base"
                        placeholder="Optional but recommended"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Student Email *</label>
                      <input
                        type="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        className="input-base"
                        placeholder="student@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Program *</label>
                      <AutocompleteInput
                        name="degree"
                        value={formData.degree}
                        onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                        suggestions={[
                          'CSIT', 'BCA', 'BIT', 'MCA', 'BSc Computer Science',
                          // subjects from careers (unique)
                          'programming','networking','database','software development','web development','python','algorithms','mathematics','data structures','system administration','security','cloud','devops','infrastructure','protocols','cisco','software engineering','java','hardware','advanced programming','software architecture','project management','research','statistics','data analysis','visualization','it support','agile','testing','machine learning','deep learning','computer networks','network security','information security','operating systems','mobile platforms','human-computer interaction','automation','systems design','query optimization','data modeling','linear algebra','probability'
                        ]}
                        className="input-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Major / Specialization</label>
                      <AutocompleteInput
                        name="major"
                        value={formData.major}
                        onChange={(name, value) => setFormData(prev => ({ ...prev, [name]: value }))}
                        suggestions={[
                          'Information technology', 'Software Engineering', 'Data Science', 'Networking',
                          'Distributed Systems', 'Cryptography', 'Smart Contracts', 'Web Development',
                          'Database Systems', 'Machine Learning', 'Deep Learning', 'Computer Networks',
                          'Network Security', 'Information Security', 'Operating Systems', 'Cloud Computing',
                          'Mobile Platforms', 'Human-Computer Interaction', 'Automation', 'Systems Design',
                          'Query Optimization', 'Data Modeling', 'Statistics', 'Linear Algebra', 'Probability'
                        ]}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Date *</label>
                      <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleChange}
                        className="input-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year *</label>
                      <input
                        type="text"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className="input-base"
                        placeholder="2024"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className="input-base"
                        placeholder="University name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Certificate Notes</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input-base min-h-[120px]"
                        placeholder="Optional certificate metadata"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Certificate File (PDF/Image) *</label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="input-base"
                        required
                      />
                      {file && <p className="text-sm text-green-600 mt-2">✓ {file.name}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="card-base p-8">
                  <h3 className="text-lg font-bold text-blue-dark mb-6">Issuance Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <span className="text-green-600">✓</span>
                      <span>File upload ready</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <span className="text-green-600">✓</span>
                      <span>Metadata collected</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <span className="text-gray-400">○</span>
                      <span>Blockchain storage</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <span className="text-gray-400">○</span>
                      <span>QR code generation</span>
                    </div>
                  </div>

                  {loading && uploadProgress > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Upload Progress</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{uploadProgress}%</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-bold disabled:opacity-50"
                  >
                    {loading ? 'Issuing certificate...' : 'Issue Certificate'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default IssueCertificate
