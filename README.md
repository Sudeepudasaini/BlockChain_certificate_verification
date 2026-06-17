# CertChain — Blockchain-Based Secure Academic Certificate Verification System

A full-stack web application for issuing, storing, and verifying tamper-proof academic certificates using SHA-256 hashing and Ethereum smart contracts.

## 🎯 Features

- ✅ **Cryptographic Security** — SHA-256 hashing ensures complete data integrity
- ✅ **Blockchain Immutability** — All certificates stored on Ethereum smart contracts
- ✅ **Instant Verification** — Verify certificates in under 2 seconds
- ✅ **Role-Based Access** — Admin, University, Student, and Verifier roles
- ✅ **QR Code Generation** — Easy sharing and verification via QR codes
- ✅ **Production-Ready** — Complete error handling, validation, and security measures

## 🛠️ Tech Stack

**Frontend:**
- React.js 18.2 with Vite
- Tailwind CSS for styling
- React Router v6 for navigation
- Axios for API requests
- react-toastify for notifications

**Backend:**
- Node.js with Express.js
- MongoDB for data persistence
- JWT for authentication
- Multer for file uploads
- ethers.js v6 for blockchain interaction

**Blockchain:**
- Solidity ^0.8.19 smart contracts
- Hardhat for development and testing
- Local Ethereum network (hardhat node)

## 📁 Project Structure

```
certchain/
├── blockchain/          # Smart contract & Hardhat config
├── backend/            # Express server & API
└── frontend/           # React Vite application
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ and npm
- **MongoDB** (running locally on port 27017)
- **Git**

### 1. Clone & Install

```bash
# Navigate to project root
cd certchain

# Install blockchain dependencies
cd blockchain
npm install

# Install backend dependencies
cd ../backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start MongoDB

```bash
# Windows (if installed via chocolatey or directly)
mongod

# Or use MongoDB Atlas (update MONGO_URI in backend/.env)
```

### 3. Deploy Smart Contract

```bash
cd blockchain

# Compile contracts
npx hardhat compile

# Start local Hardhat node (in a new terminal)
npx hardhat node

# Deploy contract (in another terminal)
npx hardhat run scripts/deploy.js --network localhost
```

This will:
- Start a local Ethereum network on `http://127.0.0.1:8545`
- Deploy `CertificateRegistry` smart contract
- Generate `backend/config/contractConfig.json` and `frontend/src/config/contractConfig.json`

### 4. Start Backend Server

```bash
cd backend

# Create .env file (already included with defaults)
# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### 5. Start Frontend

```bash
cd frontend

# Start Vite dev server
npm run dev

# App runs on http://localhost:5173
```

## 🔐 Default Test Accounts

After deployment, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@certchain.com | Admin@123 |
| University | university@tu.edu.np | University@123 |
| Student | student@example.com | Student@123 |
| Verifier | verifier@example.com | Verifier@123 |

> Note: Run `node seedData.js` in the backend folder to create these users (file not included, create manually or import seed data)

## 📌 Key Endpoints

### Authentication
- `POST /api/auth/register` — Create new account
- `POST /api/auth/login` — Login and get JWT
- `GET /api/auth/me` — Get current user (requires JWT)

### Certificates
- `POST /api/certificates/issue` — Issue new certificate (University)
- `GET /api/certificates` — Get all certificates (University/Admin)
- `GET /api/certificates/my` — Get student's certificates (Student)
- `POST /api/certificates/verify-upload` — Verify by file upload (Public)
- `POST /api/certificates/verify-id` — Verify by Certificate ID (Public)

### Admin
- `GET /api/admin/stats` — Dashboard statistics
- `GET /api/admin/users` — List all users
- `PATCH /api/admin/users/:id/status` — Toggle user status
- `GET /api/admin/certificates` — List all certificates
- `PATCH /api/admin/certificates/:id/revoke` — Revoke certificate

## 🌐 User Workflows

### University Issues Certificate
1. Login as University → Dashboard
2. Click "Issue Certificate"
3. Fill form (student name, degree, etc.)
4. Upload PDF/image file
5. Click "Deploy to Blockchain"
6. Certificate stored with SHA-256 hash and blockchain proof

### Student Views Certificates
1. Login as Student → "My Certificates"
2. View all issued certificates
3. Download or share via QR code

### Verifier Checks Certificate
1. Go to `/verify` (public, no login required)
2. Upload file OR enter Certificate ID
3. System verifies:
   - File hash matches blockchain record
   - Certificate not revoked
4. Shows detailed verification result

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/certchain
JWT_SECRET=certchain_super_secret_jwt_key_2024
NODE_ENV=development
BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
CONTRACT_OWNER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### Frontend
- API base URL: `http://localhost:5000/api` (hardcoded in `src/api/axios.js`)
- Frontend runs on: `http://localhost:5173`

## 🧪 Smart Contract Testing

```bash
cd blockchain

# Run all tests
npx hardhat test

# Run specific test
npx hardhat test test/CertificateRegistry.test.js
```

## 📊 Database Models

### User
- name, email, password (hashed)
- role (admin, university, student, verifier)
- universityName, studentId, isActive

### Certificate
- certId (unique), studentName, studentId, studentEmail
- degree, major, universityName, graduationYear
- sha256Hash, blockchainTxHash, blockchainStored
- filePath, qrCode, isRevoked

## 🔒 Security Features

- ✅ JWT-based authentication (7-day expiry)
- ✅ Role-based access control (RBAC)
- ✅ bcryptjs password hashing (10 rounds)
- ✅ CORS enabled for localhost only
- ✅ File upload validation (PDF, PNG, JPG max 5MB)
- ✅ SHA-256 cryptographic hashing
- ✅ Immutable blockchain records

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000/5173/8545
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000
```

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
# Default: mongodb://localhost:27017
# Update MONGO_URI in backend/.env if needed
```

### Smart Contract Deployment Failed
```bash
# Ensure hardhat node is running
npx hardhat node

# In another terminal
npx hardhat run scripts/deploy.js --network localhost
```

### CORS Errors
- Check frontend is on `http://localhost:5173`
- Check backend .env has correct CORS origin

## 📈 Production Deployment

### Backend
- Deploy to Heroku, Railway, or AWS
- Update `MONGO_URI` to production MongoDB (e.g., MongoDB Atlas)
- Update `BLOCKCHAIN_RPC_URL` to Ethereum testnet (Sepolia/Goerli) or mainnet
- Use environment variables for sensitive data

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, or AWS S3 + CloudFront
- Update API base URL to production backend

### Smart Contract
- Deploy to Ethereum testnet first (Sepolia recommended)
- Test thoroughly before mainnet deployment
- Use `hardhat.config.js` with network configuration

## 📚 API Documentation

See `/docs` folder for detailed API documentation or refer to controller files in `backend/controllers/`.

## 📝 License

MIT License — feel free to use this project for educational and commercial purposes.

## 👨‍💻 Author

Sudeep Kumar Pudasaini

---

**Questions or Issues?** Check the GitHub issues or contact the development team.

Happy building! 🎉
