const careerDatabase = {};

careerDatabase.bca = {
  programName: "Bachelor of Computer Application",
  shortName: "BCA",
  category: "Technology",
  description: "BCA is a 4-year undergraduate degree focused on practical computer science and software development. Graduates are skilled in programming, web development, and database management, making them highly employable in IT companies across Nepal and globally.",
  careers: [
    {
      title: "Software Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-90,000", senior: "NPR 120,000-200,000" },
      description: "Develop web and desktop applications using languages like Java, Python, and JavaScript for companies like F1Soft and Leapfrog."
    },
    {
      title: "Full Stack Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 35,000-50,000", mid: "NPR 70,000-100,000", senior: "NPR 130,000-220,000" },
      description: "Build complete web applications from frontend to backend, handling both client and server-side technologies."
    },
    {
      title: "Frontend Developer",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 100,000-180,000" },
      description: "Create responsive user interfaces using React, Vue, and Angular for modern web applications."
    },
    {
      title: "Backend Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-95,000", senior: "NPR 125,000-210,000" },
      description: "Develop server-side logic and APIs using Node.js, Python Django, or Java Spring frameworks."
    },
    {
      title: "Database Administrator",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-90,000", senior: "NPR 110,000-190,000" },
      description: "Manage and optimize databases like MySQL, PostgreSQL, and MongoDB for organizations."
    },
    {
      title: "QA Engineer/Tester",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-38,000", mid: "NPR 50,000-75,000", senior: "NPR 85,000-150,000" },
      description: "Test software applications for bugs and quality assurance, using automation tools."
    },
    {
      title: "DevOps Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-110,000", senior: "NPR 140,000-240,000" },
      description: "Manage deployment, infrastructure, and CI/CD pipelines using Docker, Kubernetes, and AWS."
    },
    {
      title: "Mobile App Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 130,000-220,000" },
      description: "Develop iOS and Android applications using React Native, Flutter, or native technologies."
    },
    {
      title: "Data Analyst",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 100,000-170,000" },
      description: "Analyze data patterns and generate insights using SQL, Python, and visualization tools."
    }
  ],
  skills: {
    technical: [
      "Java",
      "Python",
      "JavaScript",
      "C++",
      "SQL",
      "HTML/CSS",
      "Web Development",
      "Database Design",
      "API Development",
      "Object-Oriented Programming"
    ],
    soft: [
      "Problem Solving",
      "Communication",
      "Team Collaboration",
      "Time Management",
      "Critical Thinking"
    ],
    tools: [
      "Git",
      "VS Code",
      "IntelliJ IDEA",
      "MySQL Workbench",
      "Postman",
      "Docker"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Core Programming (Java/Python)",
        "HTML/CSS Basics",
        "Database Fundamentals",
        "Git Version Control",
        "Problem Solving Algorithms",
        "Linux/Command Line"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Web Framework (Django/Spring/Express)",
        "React or Angular",
        "RESTful API Design",
        "SQL Optimization",
        "Authentication & Security",
        "Testing Frameworks"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Microservices Architecture",
        "Cloud Deployment (AWS/Azure)",
        "System Design",
        "DevOps Practices",
        "Advanced Database Design",
        "Full Stack Project Development"
      ]
    }
  },
  certifications: [
    { name: "AWS Certified Associate Developer", provider: "AWS", level: "Intermediate", relevance: "High" },
    { name: "Oracle Java Programmer", provider: "Oracle", level: "Intermediate", relevance: "High" },
    { name: "Microsoft Azure Developer", provider: "Microsoft", level: "Intermediate", relevance: "High" },
    { name: "Google Cloud Associate Cloud Engineer", provider: "Google", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 25000, max: 45000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 55000, max: 95000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 110000, max: 220000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 94,
  growthPath: [
    { level: 1, title: "Intern", duration: "6 months" },
    { level: 2, title: "Junior Developer", duration: "1-2 years" },
    { level: 3, title: "Software Developer", duration: "2-3 years" },
    { level: 4, title: "Senior Developer", duration: "3-5 years" },
    { level: 5, title: "Tech Lead", duration: "5-8 years" },
    { level: 6, title: "Architect/Manager", duration: "8+ years" }
  ],
  futureScope: "With Nepal's growing IT sector and increasing demand for skilled developers, BCA graduates have excellent career prospects. Remote work opportunities are expanding, allowing graduates to work for international companies while based in Nepal.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "CloudFactory",
    "Deloitte Nepal"
  ],
  relatedPrograms: ["BSc CSIT", "BIM", "MCA", "MIT"]
};

careerDatabase.bit = {
  programName: "Bachelor of Information Technology",
  shortName: "BIT",
  category: "Technology",
  description: "BIT is a 4-year degree emphasizing both hardware and software aspects of IT. It prepares graduates for roles in system administration, network management, and IT infrastructure alongside software development.",
  careers: [
    {
      title: "Systems Administrator",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 100,000-170,000" },
      description: "Manage and maintain computer systems and networks for organizations of all sizes."
    },
    {
      title: "Network Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-44,000", mid: "NPR 60,000-90,000", senior: "NPR 110,000-190,000" },
      description: "Design, implement, and maintain network infrastructure and security systems."
    },
    {
      title: "IT Support Specialist",
      demand: "High",
      avgSalary: { entry: "NPR 22,000-35,000", mid: "NPR 45,000-70,000", senior: "NPR 80,000-140,000" },
      description: "Provide technical support and troubleshooting for end users and systems."
    },
    {
      title: "Software Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-90,000", senior: "NPR 120,000-200,000" },
      description: "Develop applications with a strong understanding of underlying system architecture."
    },
    {
      title: "Database Administrator",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-90,000", senior: "NPR 110,000-190,000" },
      description: "Manage databases and ensure optimal system performance and security."
    },
    {
      title: "IT Security Specialist",
      demand: "Very High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 130,000-220,000" },
      description: "Protect organizational IT assets from security threats and vulnerabilities."
    },
    {
      title: "Web Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 100,000-180,000" },
      description: "Develop web applications combining frontend and backend technologies."
    },
    {
      title: "IT Project Manager",
      demand: "Medium",
      avgSalary: { entry: "NPR 35,000-50,000", mid: "NPR 70,000-105,000", senior: "NPR 125,000-210,000" },
      description: "Manage IT projects and oversee team delivery of technology solutions."
    }
  ],
  skills: {
    technical: [
      "Python",
      "Java",
      "JavaScript",
      "Network Administration",
      "Linux/Unix",
      "Windows Server",
      "Database Management",
      "Cloud Computing",
      "Cybersecurity",
      "System Architecture"
    ],
    soft: [
      "Problem Solving",
      "Communication",
      "Leadership",
      "Project Management",
      "Customer Service"
    ],
    tools: [
      "Cisco Packet Tracer",
      "Active Directory",
      "AWS",
      "Git",
      "Jenkins",
      "Wireshark"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Networking Fundamentals",
        "Operating Systems",
        "Basic Programming",
        "System Administration Basics",
        "IT Support Fundamentals",
        "Hardware & Components"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Networking",
        "Database Management",
        "System Security",
        "Web Development",
        "Cloud Services",
        "IT Infrastructure"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Network Security & Firewalls",
        "Cloud Architecture",
        "Enterprise Systems",
        "DevOps Practices",
        "System Design",
        "IT Governance & Compliance"
      ]
    }
  },
  certifications: [
    { name: "CompTIA Network+", provider: "CompTIA", level: "Intermediate", relevance: "High" },
    { name: "Cisco CCNA", provider: "Cisco", level: "Intermediate", relevance: "High" },
    { name: "AWS Solutions Architect", provider: "AWS", level: "Intermediate", relevance: "High" },
    { name: "CompTIA Security+", provider: "CompTIA", level: "Intermediate", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 25000, max: 42000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 50000, max: 90000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 100000, max: 210000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 92,
  growthPath: [
    { level: 1, title: "IT Support Intern", duration: "6 months" },
    { level: 2, title: "Junior IT Support", duration: "1-2 years" },
    { level: 3, title: "IT Administrator", duration: "2-3 years" },
    { level: 4, title: "Senior Administrator", duration: "3-5 years" },
    { level: 5, title: "IT Manager", duration: "5-8 years" },
    { level: 6, title: "IT Director/CTO", duration: "8+ years" }
  ],
  futureScope: "As organizations increasingly rely on digital infrastructure and cloud services, BIT graduates are in high demand. Specialization in cybersecurity and cloud management opens lucrative career paths.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "Deloitte Nepal",
    "CloudFactory"
  ],
  relatedPrograms: ["BCA", "BSc CSIT", "MCA", "MIT"]
};

careerDatabase.bsccsit = {
  programName: "Bachelor of Science in Computer Science and Information Technology",
  shortName: "BSc CSIT",
  category: "Technology",
  description: "BSc CSIT is a 4-year science-based degree offering comprehensive education in computer science fundamentals, software engineering, and advanced IT concepts. It is one of the most sought-after degrees in Nepal with excellent job prospects.",
  careers: [
    {
      title: "Software Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 130,000-230,000" },
      description: "Design and develop complex software systems using formal methodologies and best practices."
    },
    {
      title: "Full Stack Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 35,000-50,000", mid: "NPR 70,000-110,000", senior: "NPR 140,000-240,000" },
      description: "Build complete web applications from frontend UI to backend services and databases."
    },
    {
      title: "Machine Learning Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 38,000-55,000", mid: "NPR 80,000-120,000", senior: "NPR 150,000-280,000" },
      description: "Develop AI and machine learning models for data analysis and predictive applications."
    },
    {
      title: "Data Scientist",
      demand: "Very High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-115,000", senior: "NPR 140,000-260,000" },
      description: "Analyze large datasets and build statistical models to drive business decisions."
    },
    {
      title: "Cloud Solutions Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 40,000-58,000", mid: "NPR 85,000-130,000", senior: "NPR 160,000-280,000" },
      description: "Design scalable cloud infrastructure and solutions on AWS, Azure, or GCP."
    },
    {
      title: "DevOps Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 37,000-55,000", mid: "NPR 80,000-125,000", senior: "NPR 150,000-270,000" },
      description: "Manage deployment pipelines, infrastructure automation, and system reliability."
    },
    {
      title: "Security Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-115,000", senior: "NPR 140,000-250,000" },
      description: "Identify and mitigate security vulnerabilities in applications and systems."
    },
    {
      title: "Game Developer",
      demand: "Medium",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 120,000-210,000" },
      description: "Develop games for mobile, console, or PC platforms using engines like Unity or Unreal."
    }
  ],
  skills: {
    technical: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "SQL",
      "Data Structures & Algorithms",
      "Web Development",
      "Machine Learning",
      "Database Design",
      "Cloud Computing"
    ],
    soft: [
      "Analytical Thinking",
      "Problem Solving",
      "Communication",
      "Team Collaboration",
      "Leadership"
    ],
    tools: [
      "Git",
      "Docker",
      "Kubernetes",
      "TensorFlow/PyTorch",
      "Jupyter Notebook",
      "AWS/Azure"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Core Programming Languages",
        "Data Structures",
        "Basic Algorithms",
        "Web Development Fundamentals",
        "Database Design",
        "Git & Version Control"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Algorithms",
        "Web Frameworks",
        "API Development",
        "System Design",
        "Introduction to ML/AI",
        "Cloud Platforms"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Advanced ML/AI",
        "Microservices Architecture",
        "Distributed Systems",
        "DevOps & CI/CD",
        "System Security",
        "Advanced Cloud Solutions"
      ]
    }
  },
  certifications: [
    { name: "AWS Certified Solutions Architect", provider: "AWS", level: "Advanced", relevance: "High" },
    { name: "TensorFlow Developer Certification", provider: "Google", level: "Intermediate", relevance: "High" },
    { name: "Kubernetes Application Developer", provider: "Linux Foundation", level: "Intermediate", relevance: "High" },
    { name: "Azure Solutions Architect", provider: "Microsoft", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 28000, max: 50000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 60000, max: 110000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 130000, max: 280000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 95,
  growthPath: [
    { level: 1, title: "Junior Developer", duration: "6 months" },
    { level: 2, title: "Software Developer", duration: "1-2 years" },
    { level: 3, title: "Senior Developer", duration: "2-3 years" },
    { level: 4, title: "Lead Engineer", duration: "3-5 years" },
    { level: 5, title: "Architect", duration: "5-8 years" },
    { level: 6, title: "VP Engineering/CTO", duration: "8+ years" }
  ],
  futureScope: "BSc CSIT is the most sought-after IT degree in Nepal with opportunities in AI, cloud computing, and emerging technologies. Graduates are highly valued both domestically and internationally.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "CloudFactory",
    "Deloitte Nepal"
  ],
  relatedPrograms: ["BCA", "BIT", "MCA", "MIT", "MSc IT"]
};

careerDatabase.becomputer = {
  programName: "Bachelor of Engineering in Computer Engineering",
  shortName: "BE Computer",
  category: "Technology",
  description: "BE Computer Engineering is a 4-year engineering degree combining hardware and software knowledge with a focus on system design and architecture. Graduates are equipped for roles in both embedded systems and advanced software development.",
  careers: [
    {
      title: "Software Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 130,000-230,000" },
      description: "Develop sophisticated software systems using engineering principles and best practices."
    },
    {
      title: "Embedded Systems Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 120,000-210,000" },
      description: "Design and develop embedded systems for IoT devices, robotics, and automotive applications."
    },
    {
      title: "Systems Architect",
      demand: "High",
      avgSalary: { entry: "NPR 40,000-55,000", mid: "NPR 80,000-125,000", senior: "NPR 150,000-260,000" },
      description: "Design complex computer systems and architectures for enterprise solutions."
    },
    {
      title: "Hardware Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Design and develop computer hardware components and circuit boards."
    },
    {
      title: "DevOps Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 37,000-55,000", mid: "NPR 80,000-125,000", senior: "NPR 150,000-270,000" },
      description: "Manage infrastructure, deployment automation, and system reliability at scale."
    },
    {
      title: "Security Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-115,000", senior: "NPR 140,000-250,000" },
      description: "Implement security measures and defend against cyber threats in systems."
    },
    {
      title: "Cloud Infrastructure Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 38,000-55,000", mid: "NPR 80,000-125,000", senior: "NPR 150,000-270,000" },
      description: "Build and maintain cloud infrastructure and services on major platforms."
    },
    {
      title: "IoT Solutions Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 35,000-50,000", mid: "NPR 70,000-110,000", senior: "NPR 135,000-240,000" },
      description: "Develop IoT solutions connecting physical devices with cloud platforms."
    }
  ],
  skills: {
    technical: [
      "C/C++",
      "Java",
      "Python",
      "VHDL/Verilog",
      "Embedded Systems",
      "Computer Architecture",
      "Operating Systems",
      "Network Protocols",
      "Cloud Computing",
      "IoT Platforms"
    ],
    soft: [
      "Problem Solving",
      "System Thinking",
      "Communication",
      "Team Collaboration",
      "Project Leadership"
    ],
    tools: [
      "ARM Development Studio",
      "Keil µVision",
      "Git",
      "Docker",
      "AWS/Azure",
      "MATLAB"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Digital Logic Design",
        "Computer Architecture Basics",
        "Programming Fundamentals",
        "Microcontroller Programming",
        "Circuit Design",
        "Assembly Language"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Architecture",
        "Operating Systems",
        "Embedded Systems Design",
        "FPGA Development",
        "System-on-Chip Design",
        "Network Protocols"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "High-Performance Computing",
        "IoT System Design",
        "Cloud Infrastructure",
        "Advanced Security",
        "Distributed Systems",
        "System Design Patterns"
      ]
    }
  },
  certifications: [
    { name: "ARM Cortex Training", provider: "ARM", level: "Intermediate", relevance: "High" },
    { name: "AWS Certified Solutions Architect", provider: "AWS", level: "Advanced", relevance: "High" },
    { name: "Intel FPGA Certification", provider: "Intel", level: "Intermediate", relevance: "High" },
    { name: "Google Cloud Associate Engineer", provider: "Google", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 28000, max: 48000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 60000, max: 110000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 120000, max: 270000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 92,
  growthPath: [
    { level: 1, title: "Engineer Trainee", duration: "6 months" },
    { level: 2, title: "Junior Engineer", duration: "1-2 years" },
    { level: 3, title: "Engineer", duration: "2-3 years" },
    { level: 4, title: "Senior Engineer", duration: "3-5 years" },
    { level: 5, title: "Principal Engineer", duration: "5-8 years" },
    { level: 6, title: "Engineering Director", duration: "8+ years" }
  ],
  futureScope: "Computer engineering is at the forefront of emerging technologies including AI hardware, quantum computing, and advanced IoT systems. The field offers abundant opportunities for innovation and specialization.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Deloitte Nepal",
    "CloudFactory",
    "Cotiviti Nepal"
  ],
  relatedPrograms: ["BSc CSIT", "BIT", "BCA", "MCA", "MIT"]
};

careerDatabase.besoftware = {
  programName: "Bachelor of Engineering in Software Engineering",
  shortName: "BE Software",
  category: "Technology",
  description: "BE Software Engineering is a 4-year engineering degree specializing in software design, development, and management. It emphasizes software quality, project management, and modern development practices, preparing graduates for senior technical and leadership roles.",
  careers: [
    {
      title: "Software Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 33,000-50,000", mid: "NPR 70,000-105,000", senior: "NPR 140,000-240,000" },
      description: "Design and develop high-quality software solutions using engineering methodologies."
    },
    {
      title: "Full Stack Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-115,000", senior: "NPR 145,000-250,000" },
      description: "Build complete web applications with modern frontend frameworks and backend architectures."
    },
    {
      title: "Solutions Architect",
      demand: "High",
      avgSalary: { entry: "NPR 40,000-58,000", mid: "NPR 85,000-130,000", senior: "NPR 160,000-280,000" },
      description: "Design technical solutions aligned with business requirements for enterprises."
    },
    {
      title: "DevOps Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 38,000-56,000", mid: "NPR 85,000-130,000", senior: "NPR 155,000-280,000" },
      description: "Manage CI/CD pipelines and infrastructure automation for continuous delivery."
    },
    {
      title: "Technical Lead",
      demand: "High",
      avgSalary: { entry: "NPR 42,000-60,000", mid: "NPR 90,000-140,000", senior: "NPR 170,000-300,000" },
      description: "Lead software development teams and guide technical direction of projects."
    },
    {
      title: "Quality Assurance Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-190,000" },
      description: "Ensure software quality through testing, automation, and process improvement."
    },
    {
      title: "Data Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 36,000-52,000", mid: "NPR 80,000-125,000", senior: "NPR 150,000-270,000" },
      description: "Build and manage data pipelines and infrastructure for big data applications."
    },
    {
      title: "AI/ML Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 38,000-55,000", mid: "NPR 85,000-130,000", senior: "NPR 160,000-290,000" },
      description: "Develop machine learning models and AI solutions for intelligent applications."
    }
  ],
  skills: {
    technical: [
      "Java",
      "Python",
      "JavaScript",
      "C#/.NET",
      "SQL",
      "Software Design Patterns",
      "Microservices Architecture",
      "Cloud Computing",
      "Docker/Kubernetes",
      "API Development"
    ],
    soft: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Team Building"
    ],
    tools: [
      "Git",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "AWS/Azure/GCP",
      "JIRA"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Software Design Principles",
        "Object-Oriented Programming",
        "Web Development Basics",
        "Version Control",
        "Software Testing",
        "Database Fundamentals"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Design Patterns",
        "Software Architecture",
        "RESTful API Design",
        "Agile Methodologies",
        "Cloud Services",
        "Advanced Testing Strategies"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Enterprise Architecture",
        "Microservices Design",
        "DevOps Practices",
        "Advanced Security",
        "System Performance Tuning",
        "Technical Leadership"
      ]
    }
  },
  certifications: [
    { name: "AWS Certified Solutions Architect", provider: "AWS", level: "Advanced", relevance: "High" },
    { name: "Azure Solutions Architect", provider: "Microsoft", level: "Advanced", relevance: "High" },
    { name: "Certified Kubernetes Administrator", provider: "Linux Foundation", level: "Advanced", relevance: "High" },
    { name: "Scrum Master Certification", provider: "Scrum Alliance", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 30000, max: 52000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 70000, max: 115000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 140000, max: 290000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 93,
  growthPath: [
    { level: 1, title: "Software Engineer Trainee", duration: "6 months" },
    { level: 2, title: "Junior Software Engineer", duration: "1-2 years" },
    { level: 3, title: "Software Engineer", duration: "2-3 years" },
    { level: 4, title: "Senior Software Engineer", duration: "3-5 years" },
    { level: 5, title: "Principal Engineer", duration: "5-8 years" },
    { level: 6, title: "VP Engineering/CTO", duration: "8+ years" }
  ],
  futureScope: "Software engineers are in unprecedented demand as all industries undergo digital transformation. BE Software graduates are positioned for leadership roles in emerging technologies and global opportunities.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "CloudFactory",
    "Deloitte Nepal"
  ],
  relatedPrograms: ["BSc CSIT", "BIT", "BCA", "MCA", "MIT"]
};

careerDatabase.beelectronics = {
  programName: "Bachelor of Engineering in Electronics Engineering",
  shortName: "BE Electronics",
  category: "Technology",
  description: "BE Electronics is a 4-year engineering degree focused on electronic systems, IoT devices, and telecommunications. Graduates design and develop electronic circuits, embedded systems, and connected devices used across industries.",
  careers: [
    {
      title: "Electronics Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 100,000-175,000" },
      description: "Design and develop electronic circuits and systems for various applications."
    },
    {
      title: "IoT Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 125,000-210,000" },
      description: "Develop Internet of Things solutions connecting devices with cloud platforms."
    },
    {
      title: "Embedded Systems Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 120,000-210,000" },
      description: "Design microcontroller and FPGA-based systems for embedded applications."
    },
    {
      title: "Telecom Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 50,000-80,000", senior: "NPR 95,000-165,000" },
      description: "Work on telecommunications infrastructure and network systems."
    },
    {
      title: "PCB Designer",
      demand: "Medium",
      avgSalary: { entry: "NPR 26,000-38,000", mid: "NPR 48,000-75,000", senior: "NPR 85,000-150,000" },
      description: "Design printed circuit boards using CAD tools like Altium and KiCAD."
    },
    {
      title: "Signal Processing Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 30,000-44,000", mid: "NPR 60,000-90,000", senior: "NPR 110,000-190,000" },
      description: "Process and analyze signals in audio, video, and communication systems."
    },
    {
      title: "Hardware Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Develop hardware components and systems for electronic devices."
    },
    {
      title: "Firmware Developer",
      demand: "Very High",
      avgSalary: { entry: "NPR 31,000-46,000", mid: "NPR 62,000-95,000", senior: "NPR 120,000-205,000" },
      description: "Write low-level firmware for microcontrollers and embedded systems."
    }
  ],
  skills: {
    technical: [
      "C/C++",
      "Embedded C",
      "VHDL/Verilog",
      "Circuit Design",
      "PCB Design",
      "Microcontroller Programming",
      "IoT Platforms",
      "Signal Processing",
      "FPGA Development",
      "ARM Architecture"
    ],
    soft: [
      "Problem Solving",
      "Technical Documentation",
      "Communication",
      "Team Collaboration",
      "Analytical Skills"
    ],
    tools: [
      "MATLAB",
      "Keil µVision",
      "Altium Designer",
      "Eagle CAD",
      "Oscilloscope",
      "Arduino IDE"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Circuit Analysis",
        "Semiconductor Fundamentals",
        "Digital Logic Design",
        "Microcontroller Basics",
        "PCB Layout Fundamentals",
        "Arduino Programming"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "FPGA Development",
        "Embedded Systems Design",
        "Signal Processing",
        "IoT Fundamentals",
        "Communication Protocols",
        "Advanced PCB Design"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Advanced IoT Systems",
        "Real-time Operating Systems",
        "Wireless Communications",
        "System-on-Chip Design",
        "Industrial IoT",
        "5G Technologies"
      ]
    }
  },
  certifications: [
    { name: "ARM Cortex-M Embedded Design", provider: "ARM", level: "Intermediate", relevance: "High" },
    { name: "Intel FPGA Certification", provider: "Intel", level: "Intermediate", relevance: "High" },
    { name: "IoT Developer Certification", provider: "AWS", level: "Intermediate", relevance: "High" },
    { name: "Embedded Systems Design", provider: "Linux Academy", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 26000, max: 42000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 50000, max: 90000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 95000, max: 210000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "High",
  demandScore: 75,
  growthPath: [
    { level: 1, title: "Engineer Trainee", duration: "6 months" },
    { level: 2, title: "Junior Engineer", duration: "1-2 years" },
    { level: 3, title: "Engineer", duration: "2-3 years" },
    { level: 4, title: "Senior Engineer", duration: "3-5 years" },
    { level: 5, title: "Principal Engineer", duration: "5-8 years" },
    { level: 6, title: "Director", duration: "8+ years" }
  ],
  futureScope: "Electronics engineering is crucial for IoT, smart devices, and 5G technologies. Growing demand for connected devices ensures strong career prospects in emerging tech sectors.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "CloudFactory",
    "Deloitte Nepal"
  ],
  relatedPrograms: ["BE Computer", "BIT", "BSc CSIT", "MIT"]
};

careerDatabase.becivil = {
  programName: "Bachelor of Engineering in Civil Engineering",
  shortName: "BE Civil",
  category: "Engineering",
  description: "BE Civil is a 4-year engineering degree preparing students to design, plan, and oversee infrastructure projects. Graduates work on buildings, roads, bridges, water systems, and urban development across Nepal and globally.",
  careers: [
    {
      title: "Civil Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 50,000-80,000", senior: "NPR 95,000-170,000" },
      description: "Design and supervise construction of infrastructure projects."
    },
    {
      title: "Structural Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Design structural systems for buildings and bridges ensuring safety and stability."
    },
    {
      title: "Site Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-38,000", mid: "NPR 45,000-70,000", senior: "NPR 80,000-145,000" },
      description: "Manage construction sites and ensure projects meet specifications and timelines."
    },
    {
      title: "Construction Manager",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 110,000-195,000" },
      description: "Oversee construction projects, manage resources, and coordinate teams."
    },
    {
      title: "Urban Planner",
      demand: "Medium",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 100,000-175,000" },
      description: "Plan and design urban development and city infrastructure."
    },
    {
      title: "Quantity Surveyor",
      demand: "Medium",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 50,000-78,000", senior: "NPR 90,000-160,000" },
      description: "Estimate project costs and manage budgets for construction projects."
    },
    {
      title: "Project Manager",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 115,000-205,000" },
      description: "Plan, execute, and monitor large-scale engineering projects."
    },
    {
      title: "Transportation Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 52,000-82,000", senior: "NPR 100,000-180,000" },
      description: "Design roads, highways, and transportation systems."
    }
  ],
  skills: {
    technical: [
      "AutoCAD",
      "Revit",
      "Structural Analysis",
      "Surveying",
      "Building Design",
      "Project Planning",
      "Geotechnical Engineering",
      "Construction Management",
      "BIM",
      "STAAD Pro"
    ],
    soft: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Team Management",
      "Decision Making"
    ],
    tools: [
      "AutoCAD",
      "Revit",
      "STAAD Pro",
      "MS Project",
      "Excel",
      "Surveying Equipment"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Engineering Drawing",
        "Building Construction",
        "Surveying Basics",
        "Materials Engineering",
        "AutoCAD Fundamentals",
        "Site Planning"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Structural Design",
        "Construction Management",
        "Project Planning",
        "Soil Mechanics",
        "BIM Implementation",
        "Cost Estimation"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Advanced Structural Analysis",
        "Infrastructure Development",
        "Earthquake-Resistant Design",
        "Urban Planning",
        "Project Leadership",
        "Advanced BIM"
      ]
    }
  },
  certifications: [
    { name: "Revit Architecture Certification", provider: "Autodesk", level: "Intermediate", relevance: "High" },
    { name: "Professional Engineer (PE)", provider: "Licensing Board", level: "Advanced", relevance: "High" },
    { name: "STAAD Pro Certification", provider: "Bentley", level: "Intermediate", relevance: "High" },
    { name: "Project Management Professional", provider: "PMI", level: "Advanced", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 25000, max: 40000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 48000, max: 85000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 90000, max: 205000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "High",
  demandScore: 72,
  growthPath: [
    { level: 1, title: "Engineer Trainee", duration: "6 months" },
    { level: 2, title: "Junior Engineer", duration: "1-2 years" },
    { level: 3, title: "Engineer", duration: "2-3 years" },
    { level: 4, title: "Senior Engineer", duration: "3-5 years" },
    { level: 5, title: "Project Director", duration: "5-8 years" },
    { level: 6, title: "Executive", duration: "8+ years" }
  ],
  futureScope: "Nepal's infrastructure development agenda creates continuous demand for civil engineers. Opportunities exist in earthquake-resistant building design, hydropower projects, and urban infrastructure modernization.",
  topEmployers: [
    "Pashupati Construction",
    "Shangrila Development",
    "KUKL",
    "Melamchi Water",
    "Infrastructure Development Bank"
  ],
  relatedPrograms: ["BE Mechanical", "BE Electrical", "Urban Planning"]
};

careerDatabase.bemechanical = {
  programName: "Bachelor of Engineering in Mechanical Engineering",
  shortName: "BE Mechanical",
  category: "Engineering",
  description: "BE Mechanical is a 4-year engineering degree focusing on mechanical systems, machinery, and thermodynamics. Graduates design and develop mechanical systems for industries ranging from manufacturing to energy production.",
  careers: [
    {
      title: "Mechanical Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 50,000-80,000", senior: "NPR 95,000-170,000" },
      description: "Design and develop mechanical systems and machinery for various applications."
    },
    {
      title: "Manufacturing Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 26,000-38,000", mid: "NPR 48,000-75,000", senior: "NPR 85,000-155,000" },
      description: "Optimize manufacturing processes and improve production efficiency."
    },
    {
      title: "Automotive Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Design and develop automotive components and systems."
    },
    {
      title: "HVAC Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 50,000-78,000", senior: "NPR 90,000-160,000" },
      description: "Design heating, ventilation, and air conditioning systems."
    },
    {
      title: "Industrial Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 52,000-82,000", senior: "NPR 100,000-180,000" },
      description: "Optimize industrial processes and improve operational efficiency."
    },
    {
      title: "Maintenance Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-37,000", mid: "NPR 45,000-70,000", senior: "NPR 80,000-145,000" },
      description: "Maintain and repair machinery and equipment in industrial facilities."
    },
    {
      title: "Quality Control Engineer",
      demand: "Medium",
      avgSalary: { entry: "NPR 26,000-38,000", mid: "NPR 48,000-75,000", senior: "NPR 85,000-155,000" },
      description: "Ensure products meet quality standards through inspection and testing."
    }
  ],
  skills: {
    technical: [
      "CAD Design",
      "Thermodynamics",
      "Fluid Mechanics",
      "Materials Science",
      "Manufacturing Processes",
      "MATLAB",
      "FEA Analysis",
      "Pneumatics & Hydraulics",
      "CNC Programming",
      "Energy Systems"
    ],
    soft: [
      "Problem Solving",
      "Communication",
      "Leadership",
      "Team Collaboration",
      "Critical Thinking"
    ],
    tools: [
      "AutoCAD",
      "SOLIDWORKS",
      "ANSYS",
      "MATLAB",
      "Fusion 360",
      "CNC Software"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Engineering Drawing",
        "Thermodynamics Basics",
        "CAD Fundamentals",
        "Materials Engineering",
        "Mechanics of Materials",
        "Manufacturing Basics"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced CAD Design",
        "Fluid Mechanics",
        "Machine Design",
        "Manufacturing Processes",
        "FEA Analysis",
        "Industrial Systems"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Advanced Design",
        "Automation Systems",
        "Energy Systems",
        "Project Management",
        "Quality Management",
        "Industry 4.0"
      ]
    }
  },
  certifications: [
    { name: "SOLIDWORKS Certification", provider: "Dassault Systèmes", level: "Intermediate", relevance: "High" },
    { name: "Professional Engineer (PE)", provider: "Licensing Board", level: "Advanced", relevance: "High" },
    { name: "ANSYS Certification", provider: "ANSYS", level: "Intermediate", relevance: "Medium" },
    { name: "Lean Six Sigma", provider: "ASQ", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 25000, max: 40000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 48000, max: 82000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 85000, max: 185000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "High",
  demandScore: 68,
  growthPath: [
    { level: 1, title: "Engineer Trainee", duration: "6 months" },
    { level: 2, title: "Junior Engineer", duration: "1-2 years" },
    { level: 3, title: "Engineer", duration: "2-3 years" },
    { level: 4, title: "Senior Engineer", duration: "3-5 years" },
    { level: 5, title: "Principal Engineer", duration: "5-8 years" },
    { level: 6, title: "Director", duration: "8+ years" }
  ],
  futureScope: "Mechanical engineering remains relevant with Industry 4.0, automation, and renewable energy driving innovation. Nepal's manufacturing and power sectors offer significant career opportunities.",
  topEmployers: [
    "Nepal Airlines",
    "Bhaktapur Diesel",
    "Hetauda Cement",
    "Himal Power",
    "Nepal Electricity Authority"
  ],
  relatedPrograms: ["BE Civil", "BE Electrical", "BE Electronics"]
};

careerDatabase.bim = {
  programName: "Bachelor of Information Management",
  shortName: "BIM",
  category: "Technology",
  description: "BIM is a 4-year degree combining IT and business management, focusing on enterprise systems, data management, and organizational technology. Graduates bridge the gap between IT teams and business operations, making them valuable in enterprise settings.",
  careers: [
    {
      title: "Business Analyst",
      demand: "Very High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 125,000-215,000" },
      description: "Analyze business processes and recommend technology solutions to improve operations."
    },
    {
      title: "ERP Consultant",
      demand: "High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-115,000", senior: "NPR 140,000-240,000" },
      description: "Implement and customize ERP systems like SAP, Oracle, and Microsoft Dynamics."
    },
    {
      title: "IT Project Manager",
      demand: "Very High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-115,000", senior: "NPR 140,000-245,000" },
      description: "Manage IT projects and oversee delivery of technology solutions aligned with business goals."
    },
    {
      title: "Systems Analyst",
      demand: "High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 115,000-205,000" },
      description: "Analyze IT systems and design solutions for business problems."
    },
    {
      title: "Management Information Officer",
      demand: "Medium",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 130,000-220,000" },
      description: "Manage organizational data and information systems strategically."
    },
    {
      title: "Data Analyst",
      demand: "Very High",
      avgSalary: { entry: "NPR 31,000-46,000", mid: "NPR 65,000-100,000", senior: "NPR 125,000-215,000" },
      description: "Analyze business data and generate insights using BI tools."
    },
    {
      title: "Operations Manager",
      demand: "High",
      avgSalary: { entry: "NPR 33,000-49,000", mid: "NPR 70,000-110,000", senior: "NPR 135,000-235,000" },
      description: "Oversee IT operations and ensure efficient delivery of services."
    },
    {
      title: "Digital Transformation Consultant",
      demand: "Very High",
      avgSalary: { entry: "NPR 38,000-56,000", mid: "NPR 85,000-130,000", senior: "NPR 155,000-270,000" },
      description: "Guide organizations through digital transformation initiatives."
    }
  ],
  skills: {
    technical: [
      "ERP Systems",
      "SQL",
      "Excel",
      "Tableau",
      "SAP",
      "Project Management Tools",
      "Business Intelligence",
      "Python basics",
      "Data Modeling",
      "Enterprise Architecture"
    ],
    soft: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Business Acumen",
      "Stakeholder Management"
    ],
    tools: [
      "SAP",
      "Oracle ERP",
      "Microsoft Dynamics",
      "Tableau",
      "Power BI",
      "JIRA"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Business Fundamentals",
        "IT Systems Basics",
        "Excel & Data Analysis",
        "Project Management Basics",
        "SQL Fundamentals",
        "ERP Concepts"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced SQL",
        "Business Process Modeling",
        "BI Tools (Tableau/Power BI)",
        "ERP Implementation",
        "Requirements Gathering",
        "Data Management"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Enterprise Architecture",
        "Strategic Planning",
        "Business Transformation",
        "Advanced ERP",
        "Organizational Change Management",
        "Strategic Consulting"
      ]
    }
  },
  certifications: [
    { name: "SAP Certified Associate", provider: "SAP", level: "Intermediate", relevance: "High" },
    { name: "Oracle University Certification", provider: "Oracle", level: "Intermediate", relevance: "High" },
    { name: "Tableau Desktop Specialist", provider: "Tableau", level: "Intermediate", relevance: "High" },
    { name: "Project Management Professional (PMP)", provider: "PMI", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 30000, max: 48000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 65000, max: 110000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 125000, max: 270000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 80,
  growthPath: [
    { level: 1, title: "Business Analyst Trainee", duration: "6 months" },
    { level: 2, title: "Junior Analyst", duration: "1-2 years" },
    { level: 3, title: "Analyst", duration: "2-3 years" },
    { level: 4, title: "Senior Analyst", duration: "3-5 years" },
    { level: 5, title: "Lead Consultant", duration: "5-8 years" },
    { level: 6, title: "Director/Partner", duration: "8+ years" }
  ],
  futureScope: "Organizations increasingly need professionals who understand both technology and business. BIM graduates are positioned for high-demand consulting and leadership roles in the digital transformation era.",
  topEmployers: [
    "Ncell",
    "Nepal Telecom",
    "Deloitte Nepal",
    "Ernst & Young",
    "Standard Chartered Nepal"
  ],
  relatedPrograms: ["BCA", "BSc CSIT", "BIT", "MBA"]
};

careerDatabase.mca = {
  programName: "Master of Computer Application",
  shortName: "MCA",
  category: "Technology",
  description: "MCA is a 2-year postgraduate degree for computing professionals seeking advanced technical expertise and leadership roles. Graduates develop cutting-edge applications and lead technology teams in enterprise and startup environments.",
  careers: [
    {
      title: "Senior Software Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 50,000-70,000", mid: "NPR 95,000-140,000", senior: "NPR 160,000-280,000" },
      description: "Lead software development teams and architect complex application systems."
    },
    {
      title: "Solutions Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 55,000-75,000", mid: "NPR 105,000-155,000", senior: "NPR 180,000-310,000" },
      description: "Design comprehensive technology solutions for enterprise clients."
    },
    {
      title: "Technical Lead",
      demand: "Very High",
      avgSalary: { entry: "NPR 52,000-72,000", mid: "NPR 100,000-150,000", senior: "NPR 170,000-300,000" },
      description: "Lead development teams and manage technical projects."
    },
    {
      title: "Cloud Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 58,000-78,000", mid: "NPR 110,000-165,000", senior: "NPR 190,000-320,000" },
      description: "Design and manage cloud infrastructure and services."
    },
    {
      title: "AI/ML Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 55,000-75,000", mid: "NPR 110,000-160,000", senior: "NPR 190,000-330,000" },
      description: "Develop advanced machine learning and AI solutions."
    },
    {
      title: "Data Scientist",
      demand: "Very High",
      avgSalary: { entry: "NPR 53,000-73,000", mid: "NPR 105,000-155,000", senior: "NPR 185,000-320,000" },
      description: "Analyze complex datasets and build predictive models."
    },
    {
      title: "Security Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 55,000-75,000", mid: "NPR 105,000-155,000", senior: "NPR 180,000-310,000" },
      description: "Design and implement comprehensive security solutions."
    },
    {
      title: "CTO/Engineering Manager",
      demand: "High",
      avgSalary: { entry: "NPR 60,000-85,000", mid: "NPR 120,000-180,000", senior: "NPR 220,000-400,000" },
      description: "Lead engineering departments and set technical strategy."
    }
  ],
  skills: {
    technical: [
      "Advanced Java/Python",
      "Microservices Architecture",
      "Cloud Platforms (AWS/Azure/GCP)",
      "Kubernetes",
      "Machine Learning",
      "Advanced Database Design",
      "System Architecture",
      "DevOps",
      "API Design",
      "Distributed Systems"
    ],
    soft: [
      "Leadership",
      "Strategic Thinking",
      "Communication",
      "Decision Making",
      "Mentoring"
    ],
    tools: [
      "Kubernetes",
      "Docker",
      "AWS/Azure/GCP",
      "TensorFlow/PyTorch",
      "Jenkins",
      "Datadog"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Advanced Software Principles",
        "Cloud Architecture Basics",
        "Distributed Systems Intro",
        "Advanced Programming",
        "DevOps Fundamentals",
        "Leadership Basics"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Cloud Service Design",
        "Microservices Patterns",
        "ML/AI Fundamentals",
        "System Design",
        "Security Architecture",
        "Team Management"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Enterprise Architecture",
        "Advanced ML/AI",
        "High-Performance Systems",
        "Strategic Planning",
        "Executive Leadership",
        "Organizational Management"
      ]
    }
  },
  certifications: [
    { name: "AWS Solutions Architect Professional", provider: "AWS", level: "Advanced", relevance: "High" },
    { name: "Kubernetes Application Developer", provider: "Linux Foundation", level: "Advanced", relevance: "High" },
    { name: "Google Cloud Professional Architect", provider: "Google", level: "Advanced", relevance: "High" },
    { name: "Azure Solutions Architect Expert", provider: "Microsoft", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 48000, max: 75000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 95000, max: 160000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 170000, max: 400000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 90,
  growthPath: [
    { level: 1, title: "Senior Developer", duration: "6 months" },
    { level: 2, title: "Tech Lead", duration: "1-2 years" },
    { level: 3, title: "Architect", duration: "2-3 years" },
    { level: 4, title: "Principal Architect", duration: "3-5 years" },
    { level: 5, title: "VP Engineering", duration: "5-8 years" },
    { level: 6, title: "CTO/SVP", duration: "8+ years" }
  ],
  futureScope: "MCA graduates are leaders in emerging technologies. With expertise in AI, cloud, and distributed systems, they command premium salaries and drive innovation in organizations worldwide.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "CloudFactory",
    "Deloitte Nepal"
  ],
  relatedPrograms: ["BSc CSIT", "BCA", "MIT", "MSc IT"]
};

careerDatabase.mit = {
  programName: "Master of Information Technology",
  shortName: "MIT",
  category: "Technology",
  description: "MIT is a 2-year postgraduate program offering specialized IT knowledge in infrastructure, security, and systems management. Graduates become leaders in IT operations and digital infrastructure across industries.",
  careers: [
    {
      title: "Senior Systems Administrator",
      demand: "High",
      avgSalary: { entry: "NPR 48,000-68,000", mid: "NPR 90,000-135,000", senior: "NPR 155,000-270,000" },
      description: "Lead systems administration teams and manage enterprise IT infrastructure."
    },
    {
      title: "Network Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 52,000-72,000", mid: "NPR 100,000-150,000", senior: "NPR 175,000-300,000" },
      description: "Design complex network architectures for large organizations."
    },
    {
      title: "Security Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 55,000-75,000", mid: "NPR 105,000-155,000", senior: "NPR 185,000-320,000" },
      description: "Design and implement comprehensive security frameworks."
    },
    {
      title: "Cloud Infrastructure Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 54,000-74,000", mid: "NPR 105,000-155,000", senior: "NPR 185,000-310,000" },
      description: "Manage and optimize cloud infrastructure at scale."
    },
    {
      title: "DevOps Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 53,000-73,000", mid: "NPR 100,000-150,000", senior: "NPR 175,000-310,000" },
      description: "Design CI/CD pipelines and automation frameworks."
    },
    {
      title: "IT Director",
      demand: "Medium",
      avgSalary: { entry: "NPR 58,000-78,000", mid: "NPR 115,000-170,000", senior: "NPR 200,000-350,000" },
      description: "Lead IT departments and set strategic technology direction."
    },
    {
      title: "Enterprise Architect",
      demand: "High",
      avgSalary: { entry: "NPR 55,000-75,000", mid: "NPR 110,000-160,000", senior: "NPR 190,000-330,000" },
      description: "Design enterprise IT solutions aligned with business strategy."
    },
    {
      title: "Cyber Security Manager",
      demand: "Very High",
      avgSalary: { entry: "NPR 54,000-74,000", mid: "NPR 105,000-155,000", senior: "NPR 185,000-315,000" },
      description: "Lead cybersecurity programs and threat prevention initiatives."
    }
  ],
  skills: {
    technical: [
      "Network Administration",
      "Cloud Services (AWS/Azure/GCP)",
      "Cybersecurity",
      "Linux/Windows Server",
      "Kubernetes",
      "Docker",
      "Network Security",
      "Infrastructure as Code",
      "Monitoring & Logging",
      "Database Administration"
    ],
    soft: [
      "Leadership",
      "Strategic Planning",
      "Communication",
      "Team Management",
      "Decision Making"
    ],
    tools: [
      "Cisco Tools",
      "AWS/Azure",
      "Kubernetes",
      "Ansible",
      "Splunk",
      "Prometheus"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Advanced Network Administration",
        "Cloud Fundamentals",
        "Security Basics",
        "Infrastructure Management",
        "Linux Advanced",
        "Leadership Intro"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Cloud Architecture",
        "Network Security",
        "Kubernetes Management",
        "Infrastructure Automation",
        "Disaster Recovery",
        "IT Governance"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Enterprise Architecture",
        "Advanced Cybersecurity",
        "Cloud Strategy",
        "Strategic IT Planning",
        "Organizational Leadership",
        "IT Service Management"
      ]
    }
  },
  certifications: [
    { name: "Cisco CCIE", provider: "Cisco", level: "Advanced", relevance: "High" },
    { name: "AWS Solutions Architect Professional", provider: "AWS", level: "Advanced", relevance: "High" },
    { name: "Certified Information Systems Security Professional (CISSP)", provider: "ISC2", level: "Advanced", relevance: "High" },
    { name: "Certified Kubernetes Administrator", provider: "Linux Foundation", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 46000, max: 72000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 90000, max: 155000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 160000, max: 350000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 88,
  growthPath: [
    { level: 1, title: "Senior Administrator", duration: "6 months" },
    { level: 2, title: "Systems Architect", duration: "1-2 years" },
    { level: 3, title: "Infrastructure Architect", duration: "2-3 years" },
    { level: 4, title: "Principal Architect", duration: "3-5 years" },
    { level: 5, title: "VP IT", duration: "5-8 years" },
    { level: 6, title: "CIO/SVP", duration: "8+ years" }
  ],
  futureScope: "As organizations adopt cloud and hybrid infrastructure, MIT graduates are in extreme demand. Expertise in infrastructure and security ensures lucrative career opportunities globally.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "CloudFactory",
    "Deloitte Nepal"
  ],
  relatedPrograms: ["BIT", "BSc CSIT", "MCA", "MSc IT"]
};

careerDatabase.mscit = {
  programName: "Master of Science in Computer Science and Information Technology",
  shortName: "MSc IT",
  category: "Technology",
  description: "MSc IT is a 2-year research-focused postgraduate degree emphasizing advanced computer science theory and practical applications. Graduates pursue roles in research, academia, and specialized technology domains.",
  careers: [
    {
      title: "Research Scientist",
      demand: "High",
      avgSalary: { entry: "NPR 50,000-70,000", mid: "NPR 95,000-140,000", senior: "NPR 160,000-280,000" },
      description: "Conduct research in computer science and develop innovative technologies."
    },
    {
      title: "Academic Researcher",
      demand: "Medium",
      avgSalary: { entry: "NPR 45,000-65,000", mid: "NPR 85,000-130,000", senior: "NPR 150,000-260,000" },
      description: "Pursue academic career in computer science with research and teaching."
    },
    {
      title: "AI Research Engineer",
      demand: "Very High",
      avgSalary: { entry: "NPR 56,000-76,000", mid: "NPR 110,000-160,000", senior: "NPR 195,000-330,000" },
      description: "Conduct cutting-edge AI and machine learning research."
    },
    {
      title: "Computational Scientist",
      demand: "Very High",
      avgSalary: { entry: "NPR 52,000-72,000", mid: "NPR 100,000-150,000", senior: "NPR 180,000-310,000" },
      description: "Apply computational methods to solve complex scientific problems."
    },
    {
      title: "Software Architect",
      demand: "Very High",
      avgSalary: { entry: "NPR 54,000-74,000", mid: "NPR 105,000-155,000", senior: "NPR 185,000-320,000" },
      description: "Design sophisticated software systems with deep technical expertise."
    },
    {
      title: "Innovation Engineer",
      demand: "High",
      avgSalary: { entry: "NPR 52,000-72,000", mid: "NPR 100,000-150,000", senior: "NPR 175,000-310,000" },
      description: "Lead innovation initiatives and develop next-generation technologies."
    },
    {
      title: "Specialist Technical Consultant",
      demand: "High",
      avgSalary: { entry: "NPR 53,000-73,000", mid: "NPR 105,000-155,000", senior: "NPR 190,000-330,000" },
      description: "Provide specialized technical consulting on advanced topics."
    },
    {
      title: "Tech Lead/VP Engineering",
      demand: "High",
      avgSalary: { entry: "NPR 58,000-78,000", mid: "NPR 115,000-170,000", senior: "NPR 210,000-380,000" },
      description: "Lead engineering teams with deep technical knowledge."
    }
  ],
  skills: {
    technical: [
      "Advanced Algorithms",
      "Machine Learning",
      "Data Science",
      "Formal Methods",
      "Cryptography",
      "Advanced Python/Java",
      "Research Methodology",
      "Statistical Analysis",
      "Graph Theory",
      "Artificial Intelligence"
    ],
    soft: [
      "Research Skills",
      "Communication",
      "Critical Thinking",
      "Leadership",
      "Innovation"
    ],
    tools: [
      "TensorFlow/PyTorch",
      "Jupyter Notebook",
      "R/Python",
      "MATLAB",
      "Git",
      "LaTeX"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Advanced Algorithms",
        "Research Methodology",
        "Machine Learning Basics",
        "Statistical Methods",
        "Advanced Programming",
        "Academic Writing"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "AI/Deep Learning",
        "Research Project Design",
        "Data Science",
        "Cryptography",
        "Formal Methods",
        "Advanced Database Design"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Cutting-Edge AI Research",
        "Distributed Computing",
        "Quantum Computing Intro",
        "Advanced Cybersecurity",
        "Innovation & Patent",
        "Technology Leadership"
      ]
    }
  },
  certifications: [
    { name: "Google Cloud Professional Data Engineer", provider: "Google", level: "Advanced", relevance: "High" },
    { name: "TensorFlow Developer Certification", provider: "Google", level: "Advanced", relevance: "High" },
    { name: "AWS Certified Machine Learning Specialist", provider: "AWS", level: "Advanced", relevance: "High" },
    { name: "Microsoft Certified Data Scientist", provider: "Microsoft", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 45000, max: 72000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 90000, max: 160000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 170000, max: 380000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 89,
  growthPath: [
    { level: 1, title: "Research Associate", duration: "6 months" },
    { level: 2, title: "Senior Researcher", duration: "1-2 years" },
    { level: 3, title: "Lead Researcher", duration: "2-3 years" },
    { level: 4, title: "Principal Researcher", duration: "3-5 years" },
    { level: 5, title: "Director of Research", duration: "5-8 years" },
    { level: 6, title: "Chief Technology Officer", duration: "8+ years" }
  ],
  futureScope: "MSc IT graduates are positioned at the forefront of technological advancement. With expertise in AI, research, and innovation, they command premium opportunities in tech giants and cutting-edge startups globally.",
  topEmployers: [
    "F1Soft International",
    "Leapfrog Technology",
    "Cotiviti Nepal",
    "CloudFactory",
    "Deloitte Nepal"
  ],
  relatedPrograms: ["BSc CSIT", "BCA", "MCA", "MIT"]
};

careerDatabase.bba = {
  programName: "Bachelor of Business Administration",
  shortName: "BBA",
  category: "Business",
  description: "BBA is a 4-year degree providing comprehensive business education covering management, marketing, finance, and entrepreneurship. Graduates are prepared for leadership roles in corporate, entrepreneurial, and development sectors.",
  careers: [
    {
      title: "Marketing Manager",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-38,000", mid: "NPR 50,000-80,000", senior: "NPR 100,000-180,000" },
      description: "Develop and execute marketing strategies for products and services."
    },
    {
      title: "Finance Officer",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-190,000" },
      description: "Manage financial records and ensure regulatory compliance."
    },
    {
      title: "HR Manager",
      demand: "High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 52,000-82,000", senior: "NPR 100,000-180,000" },
      description: "Recruit, develop, and manage organizational human resources."
    },
    {
      title: "Business Consultant",
      demand: "Medium",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 115,000-205,000" },
      description: "Advise organizations on business strategy and operational improvement."
    },
    {
      title: "Sales Manager",
      demand: "High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Lead sales teams and achieve revenue targets."
    },
    {
      title: "Operations Manager",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Oversee business operations and improve efficiency."
    },
    {
      title: "Entrepreneur",
      demand: "Medium",
      avgSalary: { entry: "NPR 20,000-50,000", mid: "NPR 60,000-150,000", senior: "NPR 200,000-500,000+" },
      description: "Start and manage own business ventures."
    },
    {
      title: "Brand Manager",
      demand: "Medium",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-195,000" },
      description: "Develop and maintain brand identity and market positioning."
    },
    {
      title: "Investment Analyst",
      demand: "Medium",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 120,000-210,000" },
      description: "Analyze investment opportunities and provide recommendations."
    },
    {
      title: "Supply Chain Manager",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-41,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-190,000" },
      description: "Manage logistics and optimize supply chain operations."
    }
  ],
  skills: {
    technical: [
      "Business Analysis",
      "Financial Analysis",
      "Excel",
      "Data Analysis",
      "Market Research",
      "SAP/ERP",
      "Tableau",
      "Strategic Planning",
      "Project Management",
      "Digital Marketing"
    ],
    soft: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Decision Making",
      "Negotiation"
    ],
    tools: [
      "Microsoft Office",
      "Tableau",
      "SAP",
      "Salesforce",
      "Google Analytics",
      "Project Management Tools"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Business Fundamentals",
        "Marketing Basics",
        "Accounting Principles",
        "Economics Introduction",
        "Organizational Behavior",
        "Excel Skills"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Financial Analysis",
        "Strategic Management",
        "Digital Marketing",
        "Operations Management",
        "Market Research",
        "Business Law"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Business Strategy",
        "Entrepreneurship",
        "International Business",
        "Advanced Finance",
        "Leadership Development",
        "Consulting Skills"
      ]
    }
  },
  certifications: [
    { name: "Project Management Professional (PMP)", provider: "PMI", level: "Intermediate", relevance: "High" },
    { name: "Certified Business Analyst (CBA)", provider: "IIBA", level: "Intermediate", relevance: "High" },
    { name: "Digital Marketing Certification", provider: "Google", level: "Intermediate", relevance: "Medium" },
    { name: "Executive Leadership Program", provider: "INSEAD/ISB", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 24000, max: 40000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 50000, max: 85000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 100000, max: 205000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "High",
  demandScore: 72,
  growthPath: [
    { level: 1, title: "Executive Trainee", duration: "6 months" },
    { level: 2, title: "Junior Manager", duration: "1-2 years" },
    { level: 3, title: "Manager", duration: "2-3 years" },
    { level: 4, title: "Senior Manager", duration: "3-5 years" },
    { level: 5, title: "Director", duration: "5-8 years" },
    { level: 6, title: "C-Suite/VP", duration: "8+ years" }
  ],
  futureScope: "BBA graduates are essential across all industries undergoing digital transformation. Leadership roles and entrepreneurial opportunities continue to grow in Nepal's expanding economy.",
  topEmployers: [
    "Nabil Bank",
    "Standard Chartered Nepal",
    "Deloitte Nepal",
    "NIC Asia Bank",
    "Himalayan Bank"
  ],
  relatedPrograms: ["BBM", "MBA", "BIM"]
};

careerDatabase.bbm = {
  programName: "Bachelor of Business Management",
  shortName: "BBM",
  category: "Business",
  description: "BBM is a 4-year degree focused on general management principles with emphasis on organizational management and business operations. Graduates work in diverse management roles across industries.",
  careers: [
    {
      title: "Marketing Manager",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-38,000", mid: "NPR 50,000-80,000", senior: "NPR 100,000-180,000" },
      description: "Develop marketing strategies and manage brand promotion campaigns."
    },
    {
      title: "Finance Officer",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-190,000" },
      description: "Manage financial operations and ensure compliance."
    },
    {
      title: "HR Manager",
      demand: "High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 52,000-82,000", senior: "NPR 100,000-180,000" },
      description: "Lead human resource functions and organizational development."
    },
    {
      title: "Business Consultant",
      demand: "Medium",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 115,000-205,000" },
      description: "Provide strategic business advice to organizations."
    },
    {
      title: "Sales Manager",
      demand: "High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Manage sales team performance and revenue generation."
    },
    {
      title: "Operations Manager",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Ensure smooth operational execution and efficiency."
    },
    {
      title: "Entrepreneur",
      demand: "Medium",
      avgSalary: { entry: "NPR 20,000-50,000", mid: "NPR 60,000-150,000", senior: "NPR 200,000-500,000+" },
      description: "Establish and run business ventures."
    },
    {
      title: "Brand Manager",
      demand: "Medium",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-195,000" },
      description: "Manage brand strategy and market positioning."
    },
    {
      title: "Investment Analyst",
      demand: "Medium",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 120,000-210,000" },
      description: "Evaluate investment opportunities and provide analysis."
    },
    {
      title: "Supply Chain Manager",
      demand: "High",
      avgSalary: { entry: "NPR 28,000-41,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-190,000" },
      description: "Manage supply chain and logistics operations."
    }
  ],
  skills: {
    technical: [
      "Business Analysis",
      "Operations Management",
      "Excel",
      "Data Analysis",
      "Project Management",
      "SAP/ERP",
      "Tableau",
      "Strategic Planning",
      "Financial Planning",
      "Digital Tools"
    ],
    soft: [
      "Leadership",
      "Communication",
      "Problem Solving",
      "Team Management",
      "Decision Making"
    ],
    tools: [
      "Microsoft Office",
      "Tableau",
      "SAP",
      "Salesforce",
      "Project Management Software",
      "Excel"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Management Fundamentals",
        "Operations Basics",
        "Business Economics",
        "Organizational Structure",
        "Basic Finance",
        "Communication Skills"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Operations Management",
        "Business Analytics",
        "Team Leadership",
        "Project Management",
        "Strategic Planning",
        "Process Improvement"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Strategic Management",
        "Change Management",
        "Business Transformation",
        "Leadership Excellence",
        "Consulting Practices",
        "International Management"
      ]
    }
  },
  certifications: [
    { name: "Project Management Professional (PMP)", provider: "PMI", level: "Intermediate", relevance: "High" },
    { name: "Lean Six Sigma", provider: "ASQ", level: "Intermediate", relevance: "High" },
    { name: "Operations Management Certification", provider: "APICS", level: "Intermediate", relevance: "High" },
    { name: "Certified Manager", provider: "AMA", level: "Advanced", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 23000, max: 38000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 48000, max: 82000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 95000, max: 195000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "High",
  demandScore: 70,
  growthPath: [
    { level: 1, title: "Management Trainee", duration: "6 months" },
    { level: 2, title: "Junior Manager", duration: "1-2 years" },
    { level: 3, title: "Manager", duration: "2-3 years" },
    { level: 4, title: "Senior Manager", duration: "3-5 years" },
    { level: 5, title: "Director", duration: "5-8 years" },
    { level: 6, title: "Executive", duration: "8+ years" }
  ],
  futureScope: "BBM graduates excel in operations and management roles across industries. Focus on process improvement and operational efficiency ensures strong career prospects.",
  topEmployers: [
    "Nabil Bank",
    "Standard Chartered Nepal",
    "Deloitte Nepal",
    "NIC Asia Bank",
    "Himalayan Bank"
  ],
  relatedPrograms: ["BBA", "MBA", "BIM"]
};

careerDatabase.mba = {
  programName: "Master of Business Administration",
  shortName: "MBA",
  category: "Business",
  description: "MBA is a prestigious 2-year postgraduate degree designed for professionals seeking advanced business knowledge and leadership skills. Graduates assume executive and strategic roles in organizations globally.",
  careers: [
    {
      title: "Senior Manager",
      demand: "Very High",
      avgSalary: { entry: "NPR 60,000-90,000", mid: "NPR 120,000-180,000", senior: "NPR 220,000-400,000" },
      description: "Lead organizational units and drive strategic initiatives."
    },
    {
      title: "Business Analyst",
      demand: "High",
      avgSalary: { entry: "NPR 55,000-80,000", mid: "NPR 110,000-160,000", senior: "NPR 200,000-350,000" },
      description: "Analyze business processes and develop strategic solutions."
    },
    {
      title: "Finance Director",
      demand: "High",
      avgSalary: { entry: "NPR 65,000-95,000", mid: "NPR 130,000-190,000", senior: "NPR 240,000-420,000" },
      description: "Oversee financial strategy and corporate finance decisions."
    },
    {
      title: "Marketing Director",
      demand: "High",
      avgSalary: { entry: "NPR 60,000-90,000", mid: "NPR 120,000-180,000", senior: "NPR 220,000-400,000" },
      description: "Lead marketing strategy and brand management."
    },
    {
      title: "Consultant",
      demand: "Very High",
      avgSalary: { entry: "NPR 60,000-90,000", mid: "NPR 130,000-200,000", senior: "NPR 250,000-450,000" },
      description: "Provide strategic business consulting to client organizations."
    },
    {
      title: "Chief Operating Officer (COO)",
      demand: "High",
      avgSalary: { entry: "NPR 80,000-120,000", mid: "NPR 160,000-240,000", senior: "NPR 300,000-500,000+" },
      description: "Oversee day-to-day business operations and strategy execution."
    },
    {
      title: "Business Development Manager",
      demand: "High",
      avgSalary: { entry: "NPR 58,000-85,000", mid: "NPR 115,000-170,000", senior: "NPR 210,000-370,000" },
      description: "Identify growth opportunities and expand business operations."
    }
  ],
  skills: {
    technical: [
      "Financial Management",
      "Strategic Planning",
      "Business Analytics",
      "Data Analysis",
      "Market Research",
      "Operations Management",
      "Financial Modeling",
      "Tableau",
      "Advanced Excel",
      "Business Intelligence"
    ],
    soft: [
      "Executive Leadership",
      "Strategic Thinking",
      "Communication",
      "Decision Making",
      "Negotiation"
    ],
    tools: [
      "Tableau",
      "SAP",
      "Advanced Excel",
      "Power BI",
      "Salesforce",
      "Project Management Tools"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Advanced Business Strategy",
        "Corporate Finance",
        "Leadership Development",
        "Global Business",
        "Executive Communication",
        "Strategic Innovation"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Financial Analysis",
        "Consulting Methodology",
        "Organizational Change",
        "International Strategy",
        "Digital Transformation",
        "Executive Presence"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Strategic Leadership",
        "Enterprise Strategy",
        "Advanced Consulting",
        "M&A Strategy",
        "Global Market Strategy",
        "Board-level Thinking"
      ]
    }
  },
  certifications: [
    { name: "Executive Leadership Program", provider: "INSEAD/ISB", level: "Advanced", relevance: "High" },
    { name: "Strategy Certification", provider: "Harvard Business School", level: "Advanced", relevance: "High" },
    { name: "Chartered Financial Analyst (CFA)", provider: "CFA Institute", level: "Advanced", relevance: "High" },
    { name: "Executive Coach Certification", provider: "ICF", level: "Advanced", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 40000, max: 65000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 100000, max: 180000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 200000, max: 500000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 78,
  growthPath: [
    { level: 1, title: "Senior Manager", duration: "6 months" },
    { level: 2, title: "Director", duration: "1-2 years" },
    { level: 3, title: "VP/Senior Director", duration: "2-3 years" },
    { level: 4, title: "C-Suite Executive", duration: "3-5 years" },
    { level: 5, title: "Board Member", duration: "5-8 years" },
    { level: 6, title: "Chairman/CEO", duration: "8+ years" }
  ],
  futureScope: "MBA graduates command top executive positions globally. With expertise in strategy and leadership, they drive organizational transformation and innovation in the digital economy.",
  topEmployers: [
    "Nabil Bank",
    "Standard Chartered Nepal",
    "Deloitte Nepal",
    "NIC Asia Bank",
    "Himalayan Bank"
  ],
  relatedPrograms: ["BBA", "BBM", "BIM"]
};

careerDatabase.bbs = {
  programName: "Bachelor of Business Studies",
  shortName: "BBS",
  category: "Business",
  description: "BBS is a 4-year degree focused on accounting, finance, and business fundamentals. Graduates work as accountants, financial analysts, and business professionals in accounting firms and corporate finance departments.",
  careers: [
    {
      title: "Accountant",
      demand: "High",
      avgSalary: { entry: "NPR 23,000-35,000", mid: "NPR 45,000-70,000", senior: "NPR 85,000-155,000" },
      description: "Manage financial records and accounting operations."
    },
    {
      title: "Auditor",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-37,000", mid: "NPR 50,000-75,000", senior: "NPR 95,000-170,000" },
      description: "Conduct financial audits and ensure compliance with standards."
    },
    {
      title: "Tax Consultant",
      demand: "High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 52,000-82,000", senior: "NPR 100,000-180,000" },
      description: "Provide tax planning and compliance advice."
    },
    {
      title: "Bank Officer",
      demand: "High",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 48,000-72,000", senior: "NPR 90,000-160,000" },
      description: "Manage banking operations and customer services."
    },
    {
      title: "Finance Assistant",
      demand: "Medium",
      avgSalary: { entry: "NPR 20,000-30,000", mid: "NPR 40,000-60,000", senior: "NPR 75,000-135,000" },
      description: "Support financial operations and accounting functions."
    },
    {
      title: "Bookkeeper",
      demand: "Medium",
      avgSalary: { entry: "NPR 19,000-28,000", mid: "NPR 38,000-55,000", senior: "NPR 70,000-125,000" },
      description: "Maintain financial records and transaction logs."
    },
    {
      title: "Financial Analyst",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Analyze financial data and provide investment insights."
    },
    {
      title: "Cost Accountant",
      demand: "Medium",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 48,000-72,000", senior: "NPR 90,000-160,000" },
      description: "Analyze and control production costs."
    }
  ],
  skills: {
    technical: [
      "Accounting",
      "Financial Analysis",
      "Excel",
      "Data Entry",
      "Auditing",
      "Tax Knowledge",
      "SAP/ERP",
      "Banking Regulations",
      "Financial Reporting",
      "Compliance"
    ],
    soft: [
      "Attention to Detail",
      "Communication",
      "Problem Solving",
      "Time Management",
      "Accuracy"
    ],
    tools: [
      "Tally",
      "SAP",
      "Excel",
      "Banking Software",
      "QuickBooks",
      "Microsoft Office"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Accounting Fundamentals",
        "General Ledger",
        "Trial Balance",
        "Banking Basics",
        "Excel for Accounting",
        "Compliance Basics"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Accounting",
        "Financial Analysis",
        "Auditing Principles",
        "Tax Planning",
        "Financial Statements",
        "Regulatory Compliance"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Management Accounting",
        "International Accounting",
        "Corporate Accounting",
        "Strategic Finance",
        "Forensic Accounting",
        "Advanced Auditing"
      ]
    }
  },
  certifications: [
    { name: "Chartered Accountant (CA)", provider: "ICAN", level: "Advanced", relevance: "High" },
    { name: "Chartered Financial Analyst (CFA)", provider: "CFA Institute", level: "Advanced", relevance: "High" },
    { name: "Certified Public Accountant (CPA)", provider: "AICPA", level: "Advanced", relevance: "High" },
    { name: "Certified Internal Auditor (CIA)", provider: "IIA", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 20000, max: 35000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 45000, max: 75000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 85000, max: 185000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "High",
  demandScore: 65,
  growthPath: [
    { level: 1, title: "Junior Accountant", duration: "6 months" },
    { level: 2, title: "Accountant", duration: "1-2 years" },
    { level: 3, title: "Senior Accountant", duration: "2-3 years" },
    { level: 4, title: "Accounting Manager", duration: "3-5 years" },
    { level: 5, title: "Finance Manager", duration: "5-8 years" },
    { level: 6, title: "Finance Director", duration: "8+ years" }
  ],
  futureScope: "BBS graduates with professional certifications (CA/CPA) have excellent career prospects. Increasing regulatory requirements ensure strong demand for qualified accountants and auditors.",
  topEmployers: [
    "Nepal Rastra Bank",
    "ICAN",
    "Prabhu Bank",
    "Global IME Bank",
    "Sunrise Bank"
  ],
  relatedPrograms: ["BBA", "BBM", "BCOM"]
};

careerDatabase.bcom = {
  programName: "Bachelor of Commerce",
  shortName: "BCom",
  category: "Business",
  description: "Bachelor of Commerce is a 4-year degree focusing on commerce, trade, and business. Graduates work in banking, accounting, and business sectors contributing to commercial and economic activities.",
  careers: [
    {
      title: "Accountant",
      demand: "High",
      avgSalary: { entry: "NPR 23,000-35,000", mid: "NPR 45,000-70,000", senior: "NPR 85,000-155,000" },
      description: "Handle accounting operations and financial record management."
    },
    {
      title: "Auditor",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-37,000", mid: "NPR 50,000-75,000", senior: "NPR 95,000-170,000" },
      description: "Perform financial audits and compliance checks."
    },
    {
      title: "Tax Consultant",
      demand: "High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 52,000-82,000", senior: "NPR 100,000-180,000" },
      description: "Advise on tax strategies and regulatory compliance."
    },
    {
      title: "Bank Officer",
      demand: "High",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 48,000-72,000", senior: "NPR 90,000-160,000" },
      description: "Manage banking services and operations."
    },
    {
      title: "Finance Assistant",
      demand: "Medium",
      avgSalary: { entry: "NPR 20,000-30,000", mid: "NPR 40,000-60,000", senior: "NPR 75,000-135,000" },
      description: "Support finance and accounting departments."
    },
    {
      title: "Bookkeeper",
      demand: "Medium",
      avgSalary: { entry: "NPR 19,000-28,000", mid: "NPR 38,000-55,000", senior: "NPR 70,000-125,000" },
      description: "Maintain accurate financial records."
    },
    {
      title: "Financial Analyst",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Analyze financial data for business decisions."
    },
    {
      title: "Cost Accountant",
      demand: "Medium",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 48,000-72,000", senior: "NPR 90,000-160,000" },
      description: "Manage cost accounting and budgeting."
    }
  ],
  skills: {
    technical: [
      "Accounting",
      "Financial Analysis",
      "Excel",
      "Database Management",
      "Auditing",
      "Tax Knowledge",
      "ERP Systems",
      "Financial Reporting",
      "Banking Software",
      "Compliance"
    ],
    soft: [
      "Accuracy",
      "Communication",
      "Problem Solving",
      "Attention to Detail",
      "Time Management"
    ],
    tools: [
      "Tally",
      "SAP",
      "Excel",
      "QuickBooks",
      "Banking Platforms",
      "Accounting Software"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Commerce Fundamentals",
        "Accounting Basics",
        "Banking Introduction",
        "Business Law",
        "Economics Principles",
        "Excel Skills"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Accounting",
        "Financial Statement Analysis",
        "Auditing Principles",
        "Tax Computation",
        "Banking Regulations",
        "Commercial Law"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Corporate Accounting",
        "International Commerce",
        "Management Accounting",
        "Advanced Auditing",
        "Strategic Finance",
        "International Law"
      ]
    }
  },
  certifications: [
    { name: "Chartered Accountant (CA)", provider: "ICAN", level: "Advanced", relevance: "High" },
    { name: "Certified Public Accountant (CPA)", provider: "AICPA", level: "Advanced", relevance: "High" },
    { name: "Chartered Financial Analyst (CFA)", provider: "CFA Institute", level: "Advanced", relevance: "High" },
    { name: "Certified Internal Auditor (CIA)", provider: "IIA", level: "Advanced", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 20000, max: 33000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 43000, max: 72000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 80000, max: 175000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "High",
  demandScore: 62,
  growthPath: [
    { level: 1, title: "Commerce Executive", duration: "6 months" },
    { level: 2, title: "Accountant", duration: "1-2 years" },
    { level: 3, title: "Senior Accountant", duration: "2-3 years" },
    { level: 4, title: "Manager Accounts", duration: "3-5 years" },
    { level: 5, title: "Finance Manager", duration: "5-8 years" },
    { level: 6, title: "Finance Director", duration: "8+ years" }
  ],
  futureScope: "Commerce graduates with accounting certifications enjoy stable career prospects. Banking sector expansion and regulatory complexity ensure consistent demand for qualified professionals.",
  topEmployers: [
    "Nepal Rastra Bank",
    "ICAN",
    "Prabhu Bank",
    "Global IME Bank",
    "Sunrise Bank"
  ],
  relatedPrograms: ["BBA", "BBS", "BBM"]
};

careerDatabase.bhm = {
  programName: "Bachelor of Hotel Management",
  shortName: "BHM",
  category: "Hospitality",
  description: "BHM is a 4-year degree preparing professionals for hospitality and tourism industry. Graduates manage hotels, restaurants, and tourism services, combining operational expertise with customer service excellence.",
  careers: [
    {
      title: "Hotel Manager",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-38,000", mid: "NPR 50,000-78,000", senior: "NPR 95,000-170,000" },
      description: "Oversee all hotel operations and guest services."
    },
    {
      title: "Restaurant Manager",
      demand: "High",
      avgSalary: { entry: "NPR 22,000-35,000", mid: "NPR 45,000-70,000", senior: "NPR 85,000-155,000" },
      description: "Manage restaurant staff and dining operations."
    },
    {
      title: "Tour Guide",
      demand: "Medium",
      avgSalary: { entry: "NPR 18,000-28,000", mid: "NPR 35,000-55,000", senior: "NPR 65,000-120,000" },
      description: "Guide tourists and provide travel information."
    },
    {
      title: "Event Manager",
      demand: "High",
      avgSalary: { entry: "NPR 23,000-36,000", mid: "NPR 48,000-75,000", senior: "NPR 90,000-160,000" },
      description: "Plan and execute hospitality events."
    },
    {
      title: "Travel Agent",
      demand: "Medium",
      avgSalary: { entry: "NPR 20,000-32,000", mid: "NPR 40,000-65,000", senior: "NPR 75,000-135,000" },
      description: "Arrange travel packages and bookings."
    },
    {
      title: "Front Office Manager",
      demand: "High",
      avgSalary: { entry: "NPR 24,000-37,000", mid: "NPR 48,000-73,000", senior: "NPR 90,000-160,000" },
      description: "Manage hotel reception and guest relations."
    },
    {
      title: "Food & Beverage Manager",
      demand: "High",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 50,000-78,000", senior: "NPR 95,000-170,000" },
      description: "Oversee food and beverage operations."
    }
  ],
  skills: {
    technical: [
      "Hotel Management Systems",
      "Food Service Management",
      "Event Planning",
      "Revenue Management",
      "Customer Service",
      "Staff Training",
      "Accounting Basics",
      "Kitchen Operations",
      "Housekeeping Management",
      "Safety Regulations"
    ],
    soft: [
      "Leadership",
      "Communication",
      "Customer Service",
      "Problem Solving",
      "Hospitality"
    ],
    tools: [
      "PMS (Property Management System)",
      "Excel",
      "Reservation Systems",
      "Point of Sale",
      "Event Management Software",
      "Microsoft Office"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Hotel Operations Basics",
        "Customer Service",
        "Food Service",
        "Hygiene & Safety",
        "Basic Management",
        "Tourism Introduction"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Hotel Management Systems",
        "Revenue Management",
        "Event Planning",
        "Staff Management",
        "Food & Beverage Management",
        "Quality Assurance"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Strategic Hotel Management",
        "Premium Service Delivery",
        "Revenue Optimization",
        "Leadership Development",
        "Luxury Hospitality",
        "Business Development"
      ]
    }
  },
  certifications: [
    { name: "Hotel Management Certification", provider: "IH&RA", level: "Intermediate", relevance: "High" },
    { name: "Certified Food Safety Manager", provider: "NFSTC", level: "Intermediate", relevance: "High" },
    { name: "Event Management Professional", provider: "MPI", level: "Intermediate", relevance: "Medium" },
    { name: "Tourism Guide License", provider: "Ministry of Tourism", level: "Intermediate", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 20000, max: 35000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 45000, max: 75000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 85000, max: 170000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Medium",
  demandScore: 60,
  growthPath: [
    { level: 1, title: "Executive Trainee", duration: "6 months" },
    { level: 2, title: "Department Supervisor", duration: "1-2 years" },
    { level: 3, title: "Assistant Manager", duration: "2-3 years" },
    { level: 4, title: "Manager", duration: "3-5 years" },
    { level: 5, title: "Senior Manager", duration: "5-8 years" },
    { level: 6, title: "Director/GM", duration: "8+ years" }
  ],
  futureScope: "Nepal's tourism sector is growing rapidly with increasing international arrivals. Hospitality professionals with international standards expertise are in demand for premium properties and emerging resorts.",
  topEmployers: [
    "Hyatt Regency Nepal",
    "Radisson Hotel",
    "Yak & Yeti",
    "Tiger Mountain",
    "Nepal Tourism Board"
  ],
  relatedPrograms: ["BBA", "BIM"]
};

careerDatabase.bed = {
  programName: "Bachelor of Education",
  shortName: "BED",
  category: "Education",
  description: "BED is a 4-year degree preparing teachers and educational professionals. Graduates teach in schools, design curricula, and contribute to education development in schools and educational institutions.",
  careers: [
    {
      title: "Teacher",
      demand: "High",
      avgSalary: { entry: "NPR 18,000-28,000", mid: "NPR 35,000-55,000", senior: "NPR 65,000-125,000" },
      description: "Teach subjects and develop students' academic and personal growth."
    },
    {
      title: "School Principal",
      demand: "Medium",
      avgSalary: { entry: "NPR 35,000-50,000", mid: "NPR 70,000-100,000", senior: "NPR 130,000-220,000" },
      description: "Lead schools and manage educational operations."
    },
    {
      title: "Curriculum Designer",
      demand: "Medium",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 105,000-185,000" },
      description: "Design educational curricula and learning materials."
    },
    {
      title: "Edtech Specialist",
      demand: "Very High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 115,000-205,000" },
      description: "Develop and implement educational technology solutions."
    },
    {
      title: "Education Consultant",
      demand: "Medium",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 115,000-205,000" },
      description: "Advise on educational policies and improvement strategies."
    },
    {
      title: "Corporate Trainer",
      demand: "High",
      avgSalary: { entry: "NPR 25,000-38,000", mid: "NPR 50,000-78,000", senior: "NPR 95,000-170,000" },
      description: "Develop and deliver corporate training programs."
    },
    {
      title: "Academic Coordinator",
      demand: "Medium",
      avgSalary: { entry: "NPR 23,000-35,000", mid: "NPR 48,000-72,000", senior: "NPR 90,000-160,000" },
      description: "Coordinate academic activities and student development."
    }
  ],
  skills: {
    technical: [
      "Subject Matter Expertise",
      "Curriculum Development",
      "Educational Technology",
      "Assessment Design",
      "Learning Management Systems",
      "Data Analysis",
      "Research Methods",
      "Online Teaching",
      "Presentation Tools",
      "Interactive Media"
    ],
    soft: [
      "Communication",
      "Leadership",
      "Patience",
      "Problem Solving",
      "Mentoring"
    ],
    tools: [
      "Google Classroom",
      "Moodle",
      "PowerPoint",
      "Google Meet/Zoom",
      "Canva",
      "Assessment Tools"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Teaching Fundamentals",
        "Classroom Management",
        "Lesson Planning",
        "Assessment Basics",
        "Student Psychology",
        "Communication Skills"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Teaching Methods",
        "Curriculum Design",
        "Educational Technology",
        "Inclusive Education",
        "Research in Education",
        "Leadership Skills"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Educational Leadership",
        "Policy Development",
        "Institutional Management",
        "Higher Education",
        "EdTech Innovation",
        "Educational Research"
      ]
    }
  },
  certifications: [
    { name: "International Baccalaureate (IB) Teaching", provider: "IBO", level: "Intermediate", relevance: "High" },
    { name: "TESOL Certification", provider: "Cambridge", level: "Intermediate", relevance: "High" },
    { name: "Educational Leadership Certification", provider: "ASCD", level: "Advanced", relevance: "High" },
    { name: "Google Certified Educator", provider: "Google", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 18000, max: 28000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 40000, max: 70000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 85000, max: 220000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Medium",
  demandScore: 58,
  growthPath: [
    { level: 1, title: "Trainee Teacher", duration: "6 months" },
    { level: 2, title: "Teacher", duration: "1-2 years" },
    { level: 3, title: "Senior Teacher", duration: "2-3 years" },
    { level: 4, title: "Head of Department", duration: "3-5 years" },
    { level: 5, title: "Vice Principal", duration: "5-8 years" },
    { level: 6, title: "Principal/Director", duration: "8+ years" }
  ],
  futureScope: "Education is undergoing rapid digital transformation. BED graduates with EdTech expertise and progressive teaching methods are in demand for innovative schools and online education platforms.",
  topEmployers: [
    "Rato Bangala School",
    "British School Nepal",
    "Little Angels School",
    "Department of Education Nepal",
    "Pathshala Nepal Foundation"
  ],
  relatedPrograms: ["BBA", "BIM"]
};

careerDatabase.bph = {
  programName: "Bachelor of Public Health",
  shortName: "BPH",
  category: "Medical",
  description: "BPH is a 4-year degree focused on population health, disease prevention, and health policy. Graduates work in public health organizations, NGOs, and government agencies addressing community health challenges.",
  careers: [
    {
      title: "Public Health Officer",
      demand: "High",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 50,000-78,000", senior: "NPR 100,000-180,000" },
      description: "Plan and implement public health programs at government level."
    },
    {
      title: "Epidemiologist",
      demand: "Medium",
      avgSalary: { entry: "NPR 28,000-42,000", mid: "NPR 58,000-90,000", senior: "NPR 120,000-210,000" },
      description: "Study disease patterns and develop prevention strategies."
    },
    {
      title: "Health Program Manager",
      demand: "High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-195,000" },
      description: "Manage and coordinate health programs and initiatives."
    },
    {
      title: "Community Health Worker",
      demand: "High",
      avgSalary: { entry: "NPR 16,000-24,000", mid: "NPR 30,000-48,000", senior: "NPR 65,000-120,000" },
      description: "Provide health education and services at community level."
    },
    {
      title: "Health Researcher",
      demand: "Medium",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-190,000" },
      description: "Conduct research on health issues and interventions."
    },
    {
      title: "NGO Health Coordinator",
      demand: "High",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 50,000-78,000", senior: "NPR 100,000-180,000" },
      description: "Coordinate health programs in non-profit organizations."
    }
  ],
  skills: {
    technical: [
      "Epidemiology",
      "Biostatistics",
      "Health Research",
      "Program Evaluation",
      "Health Policy Analysis",
      "Data Analysis",
      "Health Education",
      "SPSS/R",
      "Community Health",
      "Disease Surveillance"
    ],
    soft: [
      "Communication",
      "Leadership",
      "Problem Solving",
      "Community Engagement",
      "Cultural Sensitivity"
    ],
    tools: [
      "SPSS",
      "R/Python",
      "Epidemiological Software",
      "GIS Tools",
      "Excel",
      "Qualitative Analysis Software"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Public Health Fundamentals",
        "Epidemiology Basics",
        "Biostatistics Intro",
        "Health Policy Basics",
        "Research Methods",
        "Community Health"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Epidemiology",
        "Statistical Analysis",
        "Health Program Planning",
        "Environmental Health",
        "Maternal & Child Health",
        "Project Evaluation"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Disease Prevention Strategy",
        "Health Systems Management",
        "Global Health Issues",
        "Policy Implementation",
        "Advanced Research Methods",
        "Public Health Leadership"
      ]
    }
  },
  certifications: [
    { name: "Certified in Public Health (CPH)", provider: "NABHP", level: "Advanced", relevance: "High" },
    { name: "Epidemiology Certification", provider: "CDC", level: "Advanced", relevance: "High" },
    { name: "Health Education Specialist", provider: "NCHEC", level: "Intermediate", relevance: "High" },
    { name: "Geographic Information Systems (GIS)", provider: "ESRI", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 20000, max: 36000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 48000, max: 85000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 100000, max: 210000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Medium",
  demandScore: 62,
  growthPath: [
    { level: 1, title: "Health Worker", duration: "6 months" },
    { level: 2, title: "Public Health Officer", duration: "1-2 years" },
    { level: 3, title: "Senior Officer", duration: "2-3 years" },
    { level: 4, title: "Program Manager", duration: "3-5 years" },
    { level: 5, title: "Director", duration: "5-8 years" },
    { level: 6, title: "Chief/Secretary", duration: "8+ years" }
  ],
  futureScope: "Global health challenges and pandemic preparedness create growing demand for public health professionals. Nepal's health sector modernization offers opportunities in disease surveillance and health policy.",
  topEmployers: [
    "WHO Nepal",
    "UNICEF Nepal",
    "Save the Children",
    "Health Ministry Nepal",
    "Family Health Division"
  ],
  relatedPrograms: ["BN", "MBBS"]
};

careerDatabase.bn = {
  programName: "Bachelor of Nursing",
  shortName: "BN",
  category: "Medical",
  description: "BN is a 4-year degree preparing nurses to provide quality patient care in hospitals and healthcare settings. Graduates are skilled in clinical nursing, patient management, and health promotion.",
  careers: [
    {
      title: "Registered Nurse",
      demand: "Very High",
      avgSalary: { entry: "NPR 26,000-39,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-190,000" },
      description: "Provide direct patient care and nursing services in healthcare facilities."
    },
    {
      title: "Head Nurse",
      demand: "High",
      avgSalary: { entry: "NPR 32,000-48,000", mid: "NPR 65,000-100,000", senior: "NPR 130,000-220,000" },
      description: "Lead nursing teams and manage ward operations."
    },
    {
      title: "Hospital Administrator",
      demand: "High",
      avgSalary: { entry: "NPR 35,000-52,000", mid: "NPR 75,000-115,000", senior: "NPR 150,000-260,000" },
      description: "Manage hospital operations and administrative functions."
    },
    {
      title: "Community Health Nurse",
      demand: "High",
      avgSalary: { entry: "NPR 24,000-36,000", mid: "NPR 50,000-78,000", senior: "NPR 100,000-180,000" },
      description: "Provide health education and nursing care in communities."
    },
    {
      title: "ICU Nurse",
      demand: "Very High",
      avgSalary: { entry: "NPR 30,000-45,000", mid: "NPR 60,000-95,000", senior: "NPR 120,000-210,000" },
      description: "Provide specialized care to critically ill patients."
    },
    {
      title: "Pediatric Nurse",
      demand: "High",
      avgSalary: { entry: "NPR 27,000-40,000", mid: "NPR 55,000-85,000", senior: "NPR 110,000-190,000" },
      description: "Provide nursing care to children and pediatric patients."
    },
    {
      title: "Healthcare Manager",
      demand: "Medium",
      avgSalary: { entry: "NPR 33,000-49,000", mid: "NPR 70,000-110,000", senior: "NPR 140,000-240,000" },
      description: "Manage healthcare services and organizational operations."
    }
  ],
  skills: {
    technical: [
      "Clinical Nursing",
      "Patient Care",
      "Medical Procedures",
      "Medication Administration",
      "Patient Assessment",
      "Care Planning",
      "Emergency Procedures",
      "Health Education",
      "Infection Control",
      "Medical Documentation"
    ],
    soft: [
      "Compassion",
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Stress Management"
    ],
    tools: [
      "Electronic Health Records",
      "Medical Equipment",
      "Hospital Information Systems",
      "Monitoring Equipment",
      "Documentation Software",
      "Patient Care Apps"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Nursing Fundamentals",
        "Patient Care Basics",
        "Clinical Skills",
        "Medical Terminology",
        "Patient Safety",
        "Communication Skills"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Advanced Clinical Nursing",
        "Critical Care Nursing",
        "Pharmacology",
        "Disease Management",
        "Nursing Leadership",
        "Research Methods"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Specialized Nursing",
        "Hospital Management",
        "Quality Improvement",
        "Evidence-Based Practice",
        "Advanced Pathophysiology",
        "Healthcare Leadership"
      ]
    }
  },
  certifications: [
    { name: "Registered Nurse License", provider: "Nursing Council Nepal", level: "Advanced", relevance: "High" },
    { name: "Critical Care Nursing", provider: "AACN", level: "Advanced", relevance: "High" },
    { name: "International Nursing Registration (IELTS)", provider: "British Council", level: "Intermediate", relevance: "High" },
    { name: "Midwifery Certification", provider: "Health Ministry", level: "Intermediate", relevance: "Medium" }
  ],
  salaryRange: {
    entry: { min: 24000, max: 39000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 50000, max: 85000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 110000, max: 240000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 65,
  growthPath: [
    { level: 1, title: "Nursing Intern", duration: "6 months" },
    { level: 2, title: "Registered Nurse", duration: "1-2 years" },
    { level: 3, title: "Senior Nurse", duration: "2-3 years" },
    { level: 4, title: "Head Nurse", duration: "3-5 years" },
    { level: 5, title: "Nursing Director", duration: "5-8 years" },
    { level: 6, title: "Chief Nurse/Administrator", duration: "8+ years" }
  ],
  futureScope: "Nursing is in critical shortage globally with Nepal exporting nurses abroad. Strong demand in hospitals, clinics, and international healthcare organizations offers excellent career and income prospects.",
  topEmployers: [
    "Bir Hospital",
    "Tribhuvan University Hospital",
    "Norvic International",
    "Grande International",
    "Nepal Red Cross"
  ],
  relatedPrograms: ["MBBS", "BPH"]
};

careerDatabase.mbbs = {
  programName: "Bachelor of Medicine, Bachelor of Surgery",
  shortName: "MBBS",
  category: "Medical",
  description: "MBBS is a prestigious 5-6 year medical degree preparing physicians to provide comprehensive patient care. Graduates are respected medical professionals working in hospitals, clinics, and research institutions.",
  careers: [
    {
      title: "Medical Doctor",
      demand: "Very High",
      avgSalary: { entry: "NPR 60,000-100,000", mid: "NPR 120,000-200,000", senior: "NPR 200,000-500,000" },
      description: "Provide comprehensive patient care and medical treatment."
    },
    {
      title: "Surgeon",
      demand: "Very High",
      avgSalary: { entry: "NPR 80,000-120,000", mid: "NPR 150,000-250,000", senior: "NPR 300,000-600,000+" },
      description: "Perform surgical procedures and specialized surgical care."
    },
    {
      title: "Psychiatrist",
      demand: "High",
      avgSalary: { entry: "NPR 70,000-110,000", mid: "NPR 140,000-220,000", senior: "NPR 250,000-480,000" },
      description: "Provide mental health treatment and psychiatric care."
    },
    {
      title: "Pediatrician",
      demand: "High",
      avgSalary: { entry: "NPR 65,000-105,000", mid: "NPR 130,000-210,000", senior: "NPR 220,000-450,000" },
      description: "Provide medical care to children and infants."
    },
    {
      title: "Researcher",
      demand: "Medium",
      avgSalary: { entry: "NPR 60,000-100,000", mid: "NPR 120,000-200,000", senior: "NPR 200,000-400,000" },
      description: "Conduct medical research and clinical trials."
    },
    {
      title: "Medical Officer",
      demand: "Very High",
      avgSalary: { entry: "NPR 55,000-90,000", mid: "NPR 110,000-180,000", senior: "NPR 180,000-350,000" },
      description: "Work in hospitals and health institutions providing medical services."
    },
    {
      title: "Hospital Director",
      demand: "Medium",
      avgSalary: { entry: "NPR 90,000-140,000", mid: "NPR 180,000-280,000", senior: "NPR 350,000-700,000+" },
      description: "Lead hospital operations and strategic management."
    },
    {
      title: "Specialist Consultant",
      demand: "Very High",
      avgSalary: { entry: "NPR 100,000-150,000", mid: "NPR 200,000-350,000", senior: "NPR 400,000-800,000+" },
      description: "Provide specialized medical expertise and consultation."
    }
  ],
  skills: {
    technical: [
      "Clinical Diagnosis",
      "Medical Treatment",
      "Surgical Procedures",
      "Pathology Knowledge",
      "Pharmacology",
      "Medical Research",
      "Patient Management",
      "Emergency Medicine",
      "Advanced Procedures",
      "Medical Imaging"
    ],
    soft: [
      "Compassion",
      "Communication",
      "Decision Making",
      "Leadership",
      "Empathy"
    ],
    tools: [
      "Electronic Health Records",
      "Medical Imaging Equipment",
      "Diagnostic Equipment",
      "Surgical Instruments",
      "Medical Database",
      "Research Software"
    ]
  },
  roadmap: {
    beginner: {
      duration: "0-6 months",
      topics: [
        "Basic Medical Science",
        "Anatomy",
        "Physiology",
        "Biochemistry",
        "Pharmacology",
        "Microbiology"
      ]
    },
    intermediate: {
      duration: "6-18 months",
      topics: [
        "Clinical Medicine",
        "Surgery Basics",
        "Pathology",
        "Obstetrics & Gynecology",
        "Pediatrics",
        "Psychiatry"
      ]
    },
    advanced: {
      duration: "18-36 months",
      topics: [
        "Medical Specialization",
        "Surgical Specialization",
        "Advanced Diagnostics",
        "Research & Innovation",
        "Medical Leadership",
        "Global Health Issues"
      ]
    }
  },
  certifications: [
    { name: "Medical License", provider: "Medical Council of Nepal", level: "Advanced", relevance: "High" },
    { name: "Board Certification", provider: "Medical Specialty Boards", level: "Advanced", relevance: "High" },
    { name: "Advanced Life Support", provider: "AHA", level: "Intermediate", relevance: "High" },
    { name: "Trauma Certification", provider: "ATLS", level: "Intermediate", relevance: "High" }
  ],
  salaryRange: {
    entry: { min: 60000, max: 100000, currency: "NPR", experience: "0-2 years" },
    mid: { min: 120000, max: 200000, currency: "NPR", experience: "2-5 years" },
    senior: { min: 200000, max: 500000, currency: "NPR", experience: "5+ years" }
  },
  industryDemand: "Very High",
  demandScore: 78,
  growthPath: [
    { level: 1, title: "Medical Intern", duration: "1 year" },
    { level: 2, title: "Junior Doctor", duration: "1-2 years" },
    { level: 3, title: "Senior Doctor", duration: "2-3 years" },
    { level: 4, title: "Consultant", duration: "3-5 years" },
    { level: 5, title: "Senior Consultant", duration: "5-8 years" },
    { level: 6, title: "Professor/Director", duration: "8+ years" }
  ],
  futureScope: "Doctors are always in high demand with growing healthcare needs globally. MBBS graduates can practice internationally and enjoy prestigious career with excellent earning potential.",
  topEmployers: [
    "Bir Hospital",
    "BP Koirala Institute of Health Sciences",
    "Tribhuvan University Teaching Hospital",
    "Grande International Hospital",
    "Norvic International Hospital"
  ],
  relatedPrograms: ["BN", "BPH"]
};

module.exports = careerDatabase;
