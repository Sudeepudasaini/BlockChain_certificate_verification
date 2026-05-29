# Blockchain-Based Secure Academic Certificate Verification System

## 🎓 Overview

A complete, zero-cost blockchain-based system for verifying the authenticity of academic certificates. This system prevents certificate fraud and provides transparent verification using Hardhat local blockchain.

### Key Features
- ✅ **Blockchain Security**: SHA-256 hashes stored immutably on smart contract
- ✅ **Instant Verification**: Verify certificates by uploading file or entering ID
- ✅ **QR Code Support**: Scan codes for quick verification
- ✅ **Zero Cost**: Uses free, open-source tools and local blockchain
- ✅ **User Roles**: Admin, University, Student, Verifier/Employer
- ✅ **MongoDB Storage**: Secure certificate metadata storage
- ✅ **JWT Authentication**: Secure user authentication

## 📦 Tech Stack

### Frontend
- **React 18** + **Vite** - Modern frontend framework
- **Tailwind CSS** - Responsive UI styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

### Backend
- **Node.js + Express** - REST API server
- **MongoDB** - Document database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **ethers.js** - Blockchain interaction

### Blockchain
- **Solidity** - Smart contract language
- **Hardhat** - Ethereum development environment
- **Smart Contract**: CertificateRegistry
- **Network**: Local Hardhat blockchain (localhost:8545)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (running locally on port 27017)

### Installation Steps

#### 1. Clone the Project
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system
```

#### 2. Setup Blockchain
```bash
cd blockchain
npm install
npx hardhat node
```
Keep this terminal running. The blockchain will run on `http://localhost:8545`

#### 3. Deploy Smart Contract (New Terminal)
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```
Copy the deployed contract address from the output.

#### 4. Setup Backend
```bash
cd ../backend
npm install

# Create .env file
cp .env.example .env

# Edit .env and add:
# - CONTRACT_ADDRESS (from step 3)
# - Private key from Hardhat accounts
# - MongoDB URI

npm run dev
```
Backend will run on `http://localhost:5000`

#### 5. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📝 API Documentation

### Authentication APIs

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "studentId": "STU-2024-001"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "...",
    "token": "...",
    "role": "student"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "...",
    "token": "...",
    "role": "student"
  }
}
```

### Certificate APIs

#### Issue Certificate (University Only)
```
POST /api/certificates/issue
Content-Type: multipart/form-data
Authorization: Bearer {token}

Form Fields:
- studentName: "John Doe"
- studentEmail: "john@university.edu"
- studentId: "STU-2024-001"
- universityName: "XYZ University"
- programName: "Bachelor of Science in Computer Science"
- batchYear: "2024"
- certificateId: "CERT-2024-001"
- issueDate: "2024-05-03"
- certificate: <binary file>

Response:
{
  "success": true,
  "data": {
    "certificateId": "CERT-2024-001",
    "certificateHash": "abc123...",
    "blockchainTxHash": "0x...",
    "qrCode": "data:image/jpeg;base64,..."
  }
}
```

#### Verify Certificate by Upload
```
POST /api/certificates/verify-upload
Content-Type: multipart/form-data

Form Fields:
- certificate: <binary file>
- certificateId: "CERT-2024-001"

Response (if valid):
{
  "success": true,
  "isValid": true,
  "data": {
    "certificateId": "CERT-2024-001",
    "studentName": "John Doe",
    "universityName": "XYZ University",
    "programName": "Bachelor of Science...",
    "batchYear": "2024",
    "issueDate": "2024-05-03",
    "qrCode": "data:image/jpeg;base64,..."
  }
}
```

#### Verify Certificate by ID
```
POST /api/certificates/verify-id
Content-Type: application/json

{
  "certificateId": "CERT-2024-001"
}

Response (if valid):
{
  "success": true,
  "isValid": true,
  "data": {
    "certificateId": "CERT-2024-001",
    "studentName": "John Doe",
    ...
  }
}
```

#### Get Certificate Details
```
GET /api/certificates/:certificateId

Response:
{
  "success": true,
  "data": {
    "certificateId": "CERT-2024-001",
    "studentName": "John Doe",
    ...
  }
}
```

#### Get Student Certificates
```
GET /api/certificates/student/:studentId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

## 👥 User Roles and Permissions

### 1. Admin
- Can manage users and system settings
- Can revoke certificates if needed

### 2. University
- Can issue certificates
- Can view university dashboard
- Can see statistics and verification history

### 3. Student
- Can view their own certificates
- Can download certificates
- Can generate verification QR codes

### 4. Verifier/Employer
- Can verify certificates
- Can upload certificates for verification
- Can check verification history

## 🔐 How the System Works

### Certificate Issuance Flow
1. University uploads certificate file and fills in details
2. System generates SHA-256 hash of the file
3. Hash is stored on blockchain via smart contract
4. Certificate metadata stored in MongoDB
5. QR code generated for the certificate
6. Student receives certificate confirmation

### Certificate Verification Flow
1. Verifier uploads certificate file OR enters certificate ID
2. System generates SHA-256 hash of uploaded file
3. Hash is compared against blockchain record
4. If match found → Certificate is VALID
5. If no match → Certificate is INVALID or FAKE
6. Detailed certificate information displayed if valid

## 📱 Frontend Pages

### Home Page
- Hero section with system introduction
- How it works section (3 steps)
- Key features showcase
- Call-to-action buttons

### Authentication Pages
- **Login**: Email and password login
- **Register**: User registration with role selection

### University Pages
- **Dashboard**: Statistics and recent certificates
- **Issue Certificate**: Form to issue new certificates

### Student Pages
- **Dashboard**: View all owned certificates
- **Certificate Card**: Download and verify each certificate

### Verification Pages
- **Verify Certificate**: Upload file or enter ID to verify
- **Verification Result**: Display verification result with details

## 🛠️ Development

### Project Structure
```
certificate-verification-system/
├── blockchain/
│   ├── contracts/
│   │   └── CertificateRegistry.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── CertificateRegistry.test.js
│   └── hardhat.config.js
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   ├── api/
    │   └── App.jsx
    └── index.html
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/certificate_verification
JWT_SECRET=your_super_secret_jwt_key_change_this
BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=paste_deployed_contract_address
PRIVATE_KEY=paste_hardhat_private_key
NODE_ENV=development
```

## ✅ Testing the System

### Test Scenario 1: Issue and Verify Certificate
1. Register as University user
2. Go to "Issue Certificate" page
3. Fill in all details and upload a test PDF
4. Copy the Certificate ID
5. Logout and register as Verifier
6. Go to "Verify Certificate" page
7. Upload the same PDF with the Certificate ID
8. Verify → Should show "Valid Certificate"

### Test Scenario 2: Fake Certificate Detection
1. Follow step 1-4 from above
2. Modify the PDF file slightly
3. Try to verify with modified PDF
4. System should reject it as INVALID

### Test Scenario 3: Verify by ID Only
1. Have a Certificate ID
2. Go to "Verify Certificate" page
3. Select "Enter Certificate ID" method
4. Enter the Certificate ID
5. System checks if it exists on blockchain

## 📊 Smart Contract Details

### CertificateRegistry.sol

#### Functions
- `issueCertificate(certificateId, certificateHash)` - Issue new certificate
- `verifyCertificate(certificateId, providedHash)` - Verify certificate
- `getCertificateHash(certificateId)` - Get stored hash
- `certificateExists(certificateId)` - Check if certificate exists

#### Events
- `CertificateIssued` - Emitted when certificate is issued
- `CertificateVerified` - Emitted when certificate is verified

## 🐛 Troubleshooting

### Problem: Cannot connect to blockchain
**Solution**: Make sure Hardhat node is running with `npx hardhat node`

### Problem: Contract address not found
**Solution**: Deploy contract again and copy the address to .env

### Problem: MongoDB connection error
**Solution**: Ensure MongoDB is running on localhost:27017

### Problem: Frontend cannot reach backend
**Solution**: Check if backend is running on port 5000 and CORS is enabled

### Problem: File upload fails
**Solution**: Ensure file size is under 10MB and format is PDF/JPG/PNG

## 📚 Additional Resources

- [Hardhat Documentation](https://hardhat.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)

## 📄 License

MIT License - Free to use for educational and commercial purposes

## 👨‍💻 Author

Blockchain Certificate Verification System - Developed for educational purposes

## 🤝 Contributing

Feel free to fork, modify, and improve this system!

---

**Last Updated**: May 2024
**Version**: 1.0.0
