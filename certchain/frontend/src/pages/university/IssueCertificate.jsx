import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

const IssueCertificate = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [editingCertificateId, setEditingCertificateId] = useState(null)
  const [formData, setFormData] = useState({
    certId: '',
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

  useEffect(() => {
    const editCertificate = location.state?.editCertificate

    if (editCertificate) {
      setEditingCertificateId(editCertificate.certId)
      setFormData({
        certId: editCertificate.certId || '',
        studentName: editCertificate.studentName || '',
        studentId: editCertificate.studentId || '',
        studentEmail: editCertificate.studentEmail || '',
        degree: editCertificate.degree || '',
        major: editCertificate.major || '',
        graduationYear: editCertificate.graduationYear || '',
        issueDate: editCertificate.issueDate ? new Date(editCertificate.issueDate).toISOString().split('T')[0] : '',
        institution: editCertificate.institution || '',
        description: editCertificate.description || '',
      })
    }
  }, [location.state])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0])
  }

  const resetForm = () => {
    setEditingCertificateId(null)
    setFormData({
      certId: '',
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
    setFile(null)
  }

  const handleCancelEdit = () => {
    resetForm()
    toast.info('Edit canceled')
    navigate('/university/certificates')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.studentName || !formData.studentEmail || !formData.degree || !formData.graduationYear || (!file && !editingCertificateId)) {
      toast.error('Please fill all required fields')
      return
    }

    setLoading(true)
    setUploadProgress(0)

    if (editingCertificateId) {
      try {
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
          formDataObj.append(key, formData[key])
        })
        if (file) {
          formDataObj.append('certificate', file)
        }

        await api.put(`/certificates/${editingCertificateId}`, formDataObj, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setUploadProgress(percent)
            }
          },
        })

        resetForm()
        toast.success('Certificate updated successfully!')
        navigate('/university/certificates')
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to update certificate')
      } finally {
        setLoading(false)
      }
      return
    }

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

      <div className="ml-60 flex-1">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-primary mb-8">
            {editingCertificateId ? 'Update Certificate' : 'Issue Certificate'}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="card-base p-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-label mb-2">Certificate ID *</label>
                      <input
                        type="text"
                        name="certId"
                        value={formData.certId}
                        onChange={handleChange}
                        className="input-base"
                        placeholder="CERT-12345"
                        required
                        disabled={!!editingCertificateId}
                      />
                      {editingCertificateId && (
                        <p className="text-xs text-secondary mt-2">Certificate ID cannot be changed after issuance.</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-label mb-2">Student Full Name *</label>
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
                      <label className="block text-sm font-semibold text-label mb-2">Student ID</label>
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
                      <label className="block text-sm font-semibold text-label mb-2">Student Email *</label>
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
                      <label className="block text-sm font-semibold text-label mb-2">Program *</label>
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
                      <label className="block text-sm font-semibold text-label mb-2">Major / Specialization</label>
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-label mb-2">Issue Date *</label>
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
                      <label className="block text-sm font-semibold text-label mb-2">Graduation Year *</label>
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
                      <label className="block text-sm font-semibold text-label mb-2">Institution</label>
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
                      <label className="block text-sm font-semibold text-label mb-2">Certificate Notes</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="input-base min-h-[120px]"
                        placeholder="Optional certificate metadata"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-label mb-2">Certificate File {editingCertificateId ? '(optional)' : '*'}</label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg"
                        className="input-base"
                        required={!editingCertificateId}
                      />
                      {file && <p className="text-sm text-green-600 mt-2">✓ {file.name}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="card-base p-8">
                  <h3 className="text-lg font-bold text-primary mb-6">Issuance Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10">
                      <span className="text-green-600">✓</span>
                      <span className="text-secondary">File upload ready</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10">
                      <span className="text-green-600">✓</span>
                      <span className="text-secondary">Metadata collected</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10">
                      <span className="text-secondary">○</span>
                      <span className="text-secondary">Blockchain storage</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10">
                      <span className="text-secondary">○</span>
                      <span className="text-secondary">QR code generation</span>
                    </div>
                  </div>

                  {loading && uploadProgress > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-secondary mb-2">Upload Progress</p>
                      <div className="w-full bg-border-color rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <p className="text-xs text-secondary mt-2">{uploadProgress}%</p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 mt-8 sm:flex-row">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-3 font-bold disabled:opacity-50"
                    >
                      {loading ? 'Saving certificate...' : editingCertificateId ? 'Update Certificate' : 'Issue Certificate'}
                    </button>
                    {editingCertificateId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="btn-secondary w-full py-3"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
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
