const { updateCertificate } = require('../controllers/certificateController');

jest.mock('../models/Certificate', () => ({
  findById: jest.fn(),
}));

describe('updateCertificate', () => {
  it('keeps the original studentId unchanged when updating a certificate', async () => {
    const Certificate = require('../models/Certificate');
    const originalStudentId = 'STU-ORIGINAL-123';
    const editedStudentId = 'STU-EDITED-999';

    const certificate = {
      _id: 'cert-1',
      studentName: 'Alice',
      studentId: originalStudentId,
      studentEmail: 'alice@example.com',
      degree: 'BSc',
      major: 'CS',
      graduationYear: '2024',
      metadata: {},
      isRevoked: false,
      issuedBy: { toString: () => 'university-1' },
      save: jest.fn().mockResolvedValue(true),
      populate: jest.fn().mockResolvedValue(null),
    };

    Certificate.findById.mockResolvedValue(certificate);

    const req = {
      params: { id: 'cert-1' },
      user: { role: 'university', id: 'university-1' },
      body: {
        studentName: 'Alice Updated',
        studentId: editedStudentId,
        studentEmail: 'alice.updated@example.com',
        degree: 'BSc',
        major: 'CS',
        graduationYear: '2025',
        metadata: { institution: 'TU' },
        isRevoked: false,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateCertificate(req, res);

    expect(certificate.studentId).toBe(originalStudentId);
    expect(certificate.studentName).toBe('Alice Updated');
    expect(certificate.studentEmail).toBe('alice.updated@example.com');
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
