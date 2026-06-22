require('dotenv').config();
const connectDB = require('../config/db');
const Certificate = require('../models/Certificate');

async function run() {
  await connectDB();
  const email = 'student@example.com';
  const certsByEmail = await Certificate.find({ studentEmail: email }).limit(5).lean();
  console.log(`Certificates matching email ${email}: ${certsByEmail.length}`);
  certsByEmail.forEach((c, i) => {
    console.log(`--- cert[${i}] id=${c._id} degree=${c.degree} major=${c.major} metadataKeys=${c.metadata ? Object.keys(c.metadata).join(',') : 'none'}`);
  });
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
