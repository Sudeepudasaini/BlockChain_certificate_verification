const fs = require('fs');
const path = require('path');

const BACKEND_BASE = process.env.BACKEND_BASE || 'http://localhost:5001';

async function login(email, password) {
  const res = await fetch(`${BACKEND_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function issueCertificate(token, filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const fd = new FormData();
  fd.append('certificate', new Blob([fileBuffer], { type: 'application/pdf' }), 'sample.pdf');
  fd.append('studentName', 'Demo Student');
  fd.append('studentId', 'DEMO-001');
  fd.append('studentEmail', 'demo@student.com');
  fd.append('degree', 'BSc Demo');
  fd.append('major', 'Computer Science');
  fd.append('graduationYear', '2026');

  const res = await fetch(`${BACKEND_BASE}/api/certificates/issue`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  return res.json();
}

async function verifyById(certId) {
  const res = await fetch(`${BACKEND_BASE}/api/certificates/verify-id`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ certId }),
  });
  return res.json();
}

async function verifyByUpload(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const fd = new FormData();
  fd.append('certificate', new Blob([fileBuffer], { type: 'application/pdf' }), 'sample.pdf');

  const res = await fetch(`${BACKEND_BASE}/api/certificates/verify-upload`, {
    method: 'POST',
    body: fd,
  });
  return res.json();
}

async function run() {
  try {
    console.log('1) Logging in as university user...');
    const loginRes = await login('university@tu.edu.np', 'University@123');
    if (!loginRes.token) {
      console.error('Login failed:', loginRes);
      return;
    }
    const token = loginRes.token;
    console.log('Logged in, token received.');

    // create sample pdf
    const tmpDir = path.join(__dirname, '..', 'backend', 'uploads');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const samplePath = path.join(tmpDir, 'sample.pdf');
    const pdfContent = '%PDF-1.4\n%âãÏÓ\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n';
    fs.writeFileSync(samplePath, pdfContent);
    console.log('Sample file created at', samplePath);

    console.log('2) Issuing certificate (upload + blockchain store)...');
    const issueRes = await issueCertificate(token, samplePath);
    console.log('Issue response:', JSON.stringify(issueRes, null, 2));
    if (!issueRes.certificate) {
      console.error('Issue failed');
      return;
    }
    const certId = issueRes.certificate.certId;

    console.log('3) Verifying by ID...');
    const verifyIdRes = await verifyById(certId);
    console.log('VerifyById response:', JSON.stringify(verifyIdRes, null, 2));

    console.log('4) Verifying by upload (same file)...');
    const verifyUploadRes = await verifyByUpload(samplePath);
    console.log('VerifyByUpload response:', JSON.stringify(verifyUploadRes, null, 2));

    console.log('End-to-end demo complete.');
  } catch (err) {
    console.error('Error during demo:', err);
  }
}

run();
