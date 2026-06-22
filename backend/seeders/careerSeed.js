require("dotenv").config();
const connectDB = require("../config/db");
const Career = require("../models/Career");

const careers = [
  {
    title: "Blockchain Developer",
    subjects: ["Distributed Systems", "Cryptography", "Smart Contracts", "programming", "networking", "database"],
    skills: ["Solidity", "Web3.js", "Hardhat", "Smart contract auditing", "programming", "networking", "database", "security"],
    level: "mid",
    description: "Designs and implements decentralized applications and smart contracts on blockchain platforms.",
    certifications: ["Certified Blockchain Developer", "Ethereum Developer Certification"],
    salaryRange: "$70k-$140k",
    jobRoles: ["Smart Contract Engineer", "Blockchain Engineer"],
  },
  {
    title: "Full Stack Developer",
    subjects: ["Data Structures", "Databases", "Web Development", "web development", "programming", "database", "software development"],
    skills: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "programming", "web development", "database", "software development", "software engineering"],
    level: "mid",
    description: "Builds end-to-end web applications across frontend and backend stacks.",
    certifications: ["AWS Certified Developer", "Full Stack Web Developer Nanodegree"],
    salaryRange: "$60k-$120k",
    jobRoles: ["Frontend Developer", "Backend Developer", "MERN Stack Developer"],
  },
  {
    title: "Data Scientist",
    subjects: ["Statistics", "Linear Algebra", "Machine Learning", "python", "algorithms", "mathematics", "data structures"],
    skills: ["Python", "Pandas", "scikit-learn", "TensorFlow", "Data Visualization", "python", "statistics", "machine learning", "data analysis", "mathematics", "algorithms"],
    level: "mid",
    description: "Extracts insights from data and builds predictive models to solve business problems.",
    certifications: ["Certified Data Scientist", "TensorFlow Developer Certificate"],
    salaryRange: "$80k-$150k",
    jobRoles: ["ML Engineer", "Research Scientist", "Data Analyst"],
  },
  {
    title: "Network Engineer",
    subjects: ["Computer Networks", "Routing & Switching", "Network Security", "networking", "system administration", "database"],
    skills: ["Cisco IOS", "Routing Protocols", "Network Troubleshooting", "networking", "system administration", "infrastructure", "protocols", "cisco"],
    level: "mid",
    description: "Designs, deploys and maintains enterprise network infrastructure.",
    certifications: ["CCNA", "CCNP"],
    salaryRange: "$55k-$110k",
    jobRoles: ["Network Administrator", "Systems Engineer"],
  },
  {
    title: "Cybersecurity Analyst",
    subjects: ["Information Security", "Operating Systems", "Incident Response", "networking", "security", "system administration"],
    skills: ["SIEM", "Vulnerability Assessment", "Forensics", "networking", "security", "system administration"],
    level: "mid",
    description: "Monitors and defends systems against cyber threats; conducts investigations and remediation.",
    certifications: ["CompTIA Security+", "CISSP"],
    salaryRange: "$65k-$140k",
    jobRoles: ["Security Analyst", "Security Engineer"],
  },
  {
    title: "AI/ML Engineer",
    subjects: ["Machine Learning", "Deep Learning", "Probability", "python", "algorithms", "mathematics"],
    skills: ["PyTorch", "TensorFlow", "Model Deployment", "MLOps", "python", "machine learning", "algorithms", "mathematics"],
    level: "senior",
    description: "Builds, optimizes and deploys machine learning models into production systems.",
    certifications: ["Google Professional ML Engineer", "AWS ML Specialty"],
    salaryRange: "$100k-$180k",
    jobRoles: ["ML Engineer", "Research Engineer"],
  },
  {
    title: "Cloud Architect",
    subjects: ["Distributed Systems", "Cloud Computing", "Networking", "networking", "cloud", "system administration"],
    skills: ["AWS", "Azure", "GCP", "Infrastructure as Code", "cloud", "networking", "infrastructure", "system administration"],
    level: "senior",
    description: "Designs cloud-native architectures and leads cloud migrations and governance.",
    certifications: ["AWS Certified Solutions Architect", "Azure Solutions Architect"],
    salaryRange: "$110k-$200k",
    jobRoles: ["Cloud Solutions Architect", "Cloud Consultant"],
  },
  {
    title: "Database Administrator",
    subjects: ["Database Systems", "Query Optimization", "Data Modeling", "database", "software development"],
    skills: ["SQL", "PostgreSQL", "MySQL", "Performance Tuning", "database", "software development"],
    level: "mid",
    description: "Maintains database availability, integrity and performance for applications.",
    certifications: ["Oracle DBA Certification", "Microsoft Certified: Azure Database Administrator"],
    salaryRange: "$60k-$125k",
    jobRoles: ["DBA", "Data Engineer"],
  },
  {
    title: "Mobile Developer",
    subjects: ["Software Engineering", "Human-Computer Interaction", "Mobile Platforms", "software development", "software engineering", "programming"],
    skills: ["Kotlin", "Swift", "React Native", "Flutter", "software development", "programming", "software engineering"],
    level: "mid",
    description: "Creates mobile applications for iOS and Android platforms.",
    certifications: ["Android Developer Certification", "iOS App Development Nanodegree"],
    salaryRange: "$55k-$120k",
    jobRoles: ["iOS Developer", "Android Developer", "Cross-platform Developer"],
  },
  {
    title: "DevOps Engineer",
    subjects: ["Software Engineering", "Systems Design", "Automation", "software development", "devops", "system administration", "cloud"],
    skills: ["CI/CD", "Docker", "Kubernetes", "Terraform", "software development", "devops", "cloud", "system administration", "automation"],
    level: "mid",
    description: "Builds automation pipelines, manages deployments and improves system reliability.",
    certifications: ["Docker Certified Associate", "Certified Kubernetes Administrator"],
    salaryRange: "$70k-$150k",
    jobRoles: ["Site Reliability Engineer", "Platform Engineer"],
  },
];
const seedCareers = async () => {
  try {
    await connectDB();
    await Career.deleteMany({});
    const created = await Career.insertMany(careers);
    console.log(`✓ ${created.length} careers seeded`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding careers:", error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedCareers();
} else {
  module.exports = { careers, seedCareers };
}
