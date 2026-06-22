require('dotenv').config();
const connectDB = require('../config/db');
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

async function run() {
  await connectDB();
  const studentEmail = 'student@example.com';
  const student = await User.findOne({ email: studentEmail });
  if (!student) {
    console.error('Student user not found');
    process.exit(1);
  }

  // find any university user to set as issuer
  const uni = await User.findOne({ role: 'university' });
  const issuedBy = uni ? uni._id : student._id;

  const cert = new Certificate({
    certId: uuidv4(),
    studentName: student.name || 'Student',
    studentId: student.studentId || 'STU-000',
    studentEmail: student.email,
    studentUser: student._id,
    degree: 'Bachelor of Computer Applications',
    major: 'Computer Science',
    universityName: uni ? uni.universityName || uni.name : 'Demo University',
    issuedBy,
    issueDate: new Date(),
    graduationYear: '2023',
    metadata: {
      subjects: ['JavaScript', 'React', 'Node.js'],
      skills: ['JavaScript', 'React', 'Node.js']
    },
    sha256Hash: 'dummyhash',
  });

  await cert.save();
  console.log('Inserted certificate id:', cert._id.toString());
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
