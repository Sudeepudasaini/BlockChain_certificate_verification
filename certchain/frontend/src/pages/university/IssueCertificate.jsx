import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const IssueCertificate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [hashPreview, setHashPreview] = useState('')
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    studentEmail: '',
    degree: '',
    major: '',
    graduationYear: '',
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

  const generateHashPreview = async () => {
    if (!file) {
      toast.error('Please select a file first')
      return
    }

    try {
      const buffer = await file.arrayBuffer()
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
      setHashPreview(hashHex)
      toast.success('Hash generated!')
    } catch (error) {
      toast.error('Failed to generate hash')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.studentName ||
      !formData.studentId ||
      !formData.degree ||
      !formData.graduationYear ||
      !file
    ) {
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

      const response = await api.post('/certificates/issue', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
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

      <div className="ml-60 flex-1">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-8">Issue Certificate</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Section */}
              <div>
                <div className="card-base p-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student Full Name *
                      </label>
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student ID *
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="input-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student Email
                      </label>
                      <input
                        type="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Degree / Program *
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="input-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Major / Specialization
                      </label>
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Graduation Year *
                      </label>
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
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Certificate File (PDF) *
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="input-base"
                        required
                      />
                      {file && <p className="text-sm text-green-600 mt-2">✓ {file.name}</p>}
                    </div>

                    <button
                      type="button"
                      onClick={generateHashPreview}
                      className="w-full px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-all font-semibold"
                    >
                      Generate Hash Preview
                    </button>

                    {hashPreview && (
                      <div className="p-4 bg-primary-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">SHA-256 HASH</p>
                        <p className="font-mono text-xs text-primary-700 break-all">{hashPreview}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div>
                <div className="card-base p-8">
                  <h3 className="text-lg font-bold text-blue-dark mb-6">Blockchain Status</h3>

                  <div className="space-y-4">
                    {[
                      { step: 'File uploaded', done: !!file },
                      { step: 'Hash generated', done: !!hashPreview },
                      { step: 'Stored in database', done: false },
                      { step: 'Deploying to blockchain', done: false },
                      { step: 'QR code generation', done: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <span
                          className={`text-lg ${
                            item.done
                              ? 'text-green-600'
                              : i === 3
                              ? 'animate-spin'
                              : 'text-gray-400'
                          }`}
                        >
                          {item.done ? '✓' : i === 3 ? '⏳' : '○'}
                        </span>
                        <span className={item.done ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                          {item.step}
                        </span>
                      </div>
                    ))}
                  </div>

                  {loading && uploadProgress > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Upload Progress</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{uploadProgress}%</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-bold disabled:opacity-50"
                  >
                    {loading ? 'Deploying...' : 'Deploy to Blockchain'}
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
