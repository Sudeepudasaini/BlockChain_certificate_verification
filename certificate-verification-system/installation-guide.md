# Installation and Setup Guide

Complete step-by-step guide to install and run the entire Blockchain Certificate Verification System.

## Prerequisites Check

Before you begin, ensure you have:
- Node.js v16+ installed (`node --version`)
- npm installed (`npm --version`)
- MongoDB running locally on port 27017
- A code editor (VS Code recommended)

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system
```

### Step 2: Setup Hardhat Blockchain (Terminal 1)

**Install Hardhat dependencies:**
```bash
cd blockchain
npm install
```

**Expected output:**
```
added XX packages
```

**Start Hardhat local blockchain node:**
```bash
npx hardhat node
```

**Expected output:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545

Accounts:
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
0x70997970C51812e339D9B73b0245ad59c36d569fEefb922b8F6b89d294E41A36 (10000 ETH)
...

WARNING: These accounts, and their private keys, are publicly known.
```

⚠️ **KEEP THIS TERMINAL RUNNING** - Do not close it while working with the system

### Step 3: Deploy Smart Contract (Terminal 2 - New Terminal)

**Navigate to blockchain directory:**
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/blockchain
```

**Deploy the contract:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**Expected output:**
```
Starting CertificateRegistry deployment...
Deploying CertificateRegistry contract...
✅ CertificateRegistry deployed successfully!
📝 Contract Address: 0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00

⚠️  IMPORTANT: Copy this contract address and paste it in backend/.env as CONTRACT_ADDRESS
CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00
```

📝 **COPY THE CONTRACT ADDRESS** - You'll need it in the next step

### Step 4: Setup MongoDB

**Check if MongoDB is running:**
```bash
# On Linux/Mac
lsof -i :27017

# On Windows - Open PowerShell and run
netstat -ano | findstr :27017
```

If MongoDB is not running, start it:
```bash
# On Linux/Mac with Homebrew
brew services start mongodb-community

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 5: Setup Backend (Terminal 3 - New Terminal)

**Navigate to backend directory:**
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/backend
```

**Install dependencies:**
```bash
npm install
```

**Create .env file:**
```bash
cp .env.example .env
```

**Edit .env file with the following:**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/certificate_verification
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb476caddccdddfb1042f3e6871f1
NODE_ENV=development
```

⚠️ **Replace CONTRACT_ADDRESS** with the one from Step 3
⚠️ **PRIVATE_KEY**: Use the first account private key from Hardhat output (0xac0974bec39...)

**Start the backend server:**
```bash
npm run dev
```

**Expected output:**
```
✅ MongoDB connected successfully
✅ Blockchain initialized successfully
✅ Server running on http://localhost:5000
📝 API Documentation:
   - POST /api/auth/register - Register user
   - POST /api/auth/login - Login user
   - POST /api/certificates/issue - Issue certificate
   ...
```

### Step 6: Setup Frontend (Terminal 4 - New Terminal)

**Navigate to frontend directory:**
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/frontend
```

**Install dependencies:**
```bash
npm install
```

**Start the development server:**
```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## ✅ Verification Checklist

After all installations, verify everything is working:

**Check 1: Blockchain Running**
- Terminal 1 shows "Started HTTP and WebSocket JSON-RPC server"

**Check 2: Contract Deployed**
- Terminal 2 shows contract address

**Check 3: Backend Running**
- Terminal 3 shows "Server running on http://localhost:5000"
- Try accessing http://localhost:5000/health

**Check 4: Frontend Running**
- Terminal 4 shows "Local: http://localhost:5173/"
- Open browser and go to http://localhost:5173

## 🧪 Testing the Installation

### Test 1: Check Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Backend server is running"
}
```

### Test 2: Register a University User
Go to http://localhost:5173 → Register

Fill in:
- Name: Test University
- Email: uni@test.com
- Password: password123
- Role: University/Admin
- University Name: Test University

Click "Create Account"

### Test 3: Issue a Certificate
- Go to "Issue Certificate" page
- Fill in all details
- Upload any PDF file
- Click "Issue Certificate"

## 🚀 Quick Start Commands

Once everything is installed, use these commands to start the system:

### Terminal 1 - Blockchain
```bash
cd blockchain
npx hardhat node
```

### Terminal 2 - Backend
```bash
cd backend
npm run dev
```

### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser

## 📋 Typical Session

1. **Start blockchain** (Terminal 1)
   ```bash
   cd blockchain && npx hardhat node
   ```

2. **Start backend** (Terminal 2)
   ```bash
   cd backend && npm run dev
   ```

3. **Start frontend** (Terminal 3)
   ```bash
   cd frontend && npm run dev
   ```

4. **Open browser**
   - Go to http://localhost:5173

5. **Test the system**
   - Register as University
   - Issue a certificate
   - Register as Verifier
   - Verify the certificate

## 🔄 Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

Files will be in `frontend/dist/`

### Build Backend
Backend doesn't need building, it's ready to run

### Deploy Smart Contract
For production, deploy to a testnet:
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network sepolia
```

## ❌ Common Installation Issues

### Issue: "Cannot find module 'hardhat'"
**Solution:**
```bash
cd blockchain
npm install
```

### Issue: "MongoDB connection failed"
**Solution:**
```bash
# Check if MongoDB is running
lsof -i :27017

# If not, start it
brew services start mongodb-community
```

### Issue: "Contract address not found in .env"
**Solution:**
- Re-run deployment: `npx hardhat run scripts/deploy.js --network localhost`
- Copy the address from output to backend/.env

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill process using port 5000
lsof -i :5000
kill -9 <PID>
```

### Issue: "Port 5173 already in use"
**Solution:**
```bash
# Kill process using port 5173
lsof -i :5173
kill -9 <PID>
```

## 📞 Support

If you face any issues:

1. Check the error message carefully
2. Verify all prerequisites are installed
3. Ensure all services are running in correct terminals
4. Check that ports are not in use
5. Verify .env file has correct values
6. Check MongoDB is running
7. Try restarting all services

## 🎓 Next Steps

Once installation is complete:

1. **Register test users** with different roles
2. **Issue certificates** as a university
3. **Verify certificates** as an employer
4. **Explore the UI** and test all features
5. **Check blockchain transactions** in Hardhat
6. **View data in MongoDB** using MongoDB Compass

---

**Installation Complete!** 🎉

Your system is now ready to use. Access it at http://localhost:5173
