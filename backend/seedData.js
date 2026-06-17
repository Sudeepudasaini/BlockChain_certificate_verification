require("dotenv").config();
const User = require("./models/User");
const connectDB = require("./config/db");

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Create seed users (use create so pre-save hooks run and passwords are hashed)
    const seedUsers = [
      {
        name: "Admin User",
        email: "admin@certchain.com",
        password: "Admin@123",
        role: "admin",
      },
      {
        name: "Tribhuvan University",
        email: "university@tu.edu.np",
        password: "University@123",
        role: "university",
        universityName: "Tribhuvan University",
      },
      {
        name: "John Doe",
        email: "student@example.com",
        password: "Student@123",
        role: "student",
        studentId: "STU-2021-001",
      },
      {
        name: "Jane Smith",
        email: "verifier@example.com",
        password: "Verifier@123",
        role: "verifier",
      },
    ];

    const users = [];
    for (const u of seedUsers) {
      const created = await User.create(u);
      users.push(created);
    }

    console.log(`✓ ${users.length} seed users created`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
