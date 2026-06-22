require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Career = require('../models/Career');
const Certificate = require('../models/Certificate');

async function run() {
  try {
    await connectDB();
    const users = await User.countDocuments();
    const careers = await Career.countDocuments();
    const certs = await Certificate.countDocuments();
    console.log(`Users: ${users}`);
    console.log(`Careers: ${careers}`);
    console.log(`Certificates: ${certs}`);
    process.exit(0);
  } catch (err) {
    console.error('DB check failed:', err);
    process.exit(1);
  }
}

run();
