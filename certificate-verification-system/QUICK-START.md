# ⚡ QUICK START GUIDE - Run Everything in 4 Steps

## 📍 Important: Read This First

This guide provides the **exact commands** to get the entire system running. Follow them in order in **4 separate terminals**.

---

## 🎯 What You'll Get

✅ Working blockchain on localhost  
✅ Running backend API server  
✅ Modern React frontend  
✅ Full certificate verification system  
✅ All in < 10 minutes

---

## 🚀 STEP 1: Start Blockchain (Terminal 1)

**Run this in the FIRST terminal:**

```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/blockchain
npm install
npx hardhat node
```

**You should see:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545

Accounts:
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
...
```

✅ **Leave this terminal running**

---

## 🔗 STEP 2: Deploy Smart Contract (Terminal 2)

**Open a NEW terminal and run:**

```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/blockchain
npx hardhat run scripts/deploy.js --network localhost
```

**You should see:**
```
✅ CertificateRegistry deployed successfully!
📝 Contract Address: 0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00

CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00
```

📝 **COPY THIS ADDRESS** - You need it in next step

---

## 🔧 STEP 3: Start Backend (Terminal 3)

**Open a NEW terminal and run:**

```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/backend
npm install
cp .env.example .env
```

**Now EDIT the .env file:**

Open `backend/.env` in your editor and replace:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/certificate_verification
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
BLOCKCHAIN_RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb476caddccdddfb1042f3e6871f1
NODE_ENV=development
```

**⚠️ IMPORTANT:**
- Replace `CONTRACT_ADDRESS` with address from Step 2
- `PRIVATE_KEY` is the first account from Hardhat (shown in Terminal 1)

**Then run:**

```bash
npm run dev
```

**You should see:**
```
✅ MongoDB connected successfully
✅ Blockchain initialized successfully
✅ Server running on http://localhost:5000
```

✅ **Leave this terminal running**

---

## 🎨 STEP 4: Start Frontend (Terminal 4)

**Open a NEW terminal and run:**

```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/frontend
npm install
npm run dev
```

**You should see:**
```
➜  Local:   http://localhost:5173/
```

✅ **Leave this terminal running**

---

## ✅ EVERYTHING IS RUNNING!

Now open your browser and go to:

```
http://localhost:5173
```

---

## 🧪 Test the System Immediately

### Test 1: Register as University
1. Click "Register" button
2. Fill in:
   - Name: `Test University`
   - Email: `uni@test.com`
   - Password: `password123`
   - Role: `University/Admin`
   - University Name: `Test University`
3. Click "Create Account"

✅ You're logged in!

### Test 2: Issue a Certificate
1. Click "Issue Certificate" in navbar
2. Fill in:
   - Student Full Name: `John Doe`
   - Student Email: `john@uni.com`
   - Student ID: `STU-2024-001`
   - Program Name: `Bachelor of Computer Science`
   - Batch Year: `2024`
   - Certificate ID: `CERT-2024-001`
   - Issue Date: `Today's date`
   - Upload any PDF file
3. Click "Issue Certificate"

✅ Certificate issued and stored on blockchain!

### Test 3: Verify Certificate
1. Logout (click Logout button)
2. Go to "Verify Certificate"
3. Upload the same PDF file
4. Enter Certificate ID: `CERT-2024-001`
5. Click "Verify Certificate"

✅ Should show "Certificate Verified Successfully"!

---

## 📊 System Architecture Overview

```
┌─────────────────┐
│   Frontend      │
│  (React+Vite)   │
│  Port: 5173     │
└────────┬────────┘
         │ HTTP Requests
         ▼
┌─────────────────┐
│   Backend       │
│ (Node+Express)  │
│  Port: 5000     │
└────┬────────┬───┘
     │        │
     │        └──────────────────────┐
     │                               │
     ▼                               ▼
┌──────────────┐         ┌──────────────────┐
│  MongoDB     │         │ Hardhat Network  │
│              │         │ Smart Contract   │
│   Database   │         │  Port: 8545      │
└──────────────┘         └──────────────────┘
```

---

## 🔐 User Roles to Test

### Role 1: University
- Can issue certificates
- Can see dashboard with statistics
- Can view recent certificates

### Role 2: Student
- Can view their certificates
- Can see QR codes
- Can track verifications

### Role 3: Verifier/Employer
- Can verify any certificate
- Can upload to check authenticity
- Can check by certificate ID

---

## 🎯 Core Features to Try

### ✅ Feature 1: Issue Certificate
- University issues certificate
- SHA-256 hash generated
- Stored on blockchain
- QR code created

### ✅ Feature 2: Verify by Upload
- Upload certificate file
- System generates hash
- Compares with blockchain
- Shows VALID or INVALID

### ✅ Feature 3: Verify by ID
- Enter certificate ID
- Check if on blockchain
- No file needed

### ✅ Feature 4: QR Code
- Scan QR code
- Takes to verification page
- Easy quick verification

---

## 🐛 If Something Doesn't Work

### Problem: "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
lsof -i :27017

# If not running, start MongoDB
brew services start mongodb-community
```

### Problem: "Contract address not found"
- Did you copy address from Step 2?
- Is it in the .env file?
- Did you save the .env file?

### Problem: "Port 5000 already in use"
```bash
# Kill the process using port 5000
lsof -i :5000
kill -9 <PID>
```

### Problem: "Blockchain connection failed"
- Is Terminal 1 still running?
- Is it showing "Started HTTP and WebSocket"?
- Check BLOCKCHAIN_RPC_URL is `http://127.0.0.1:8545`

---

## 📋 Terminal Checklist

**You should have 4 terminals open:**

| Terminal | What's Running | Port | Command |
|----------|---|---|---|
| 1 | Hardhat Blockchain | 8545 | `npx hardhat node` |
| 2 | (Used for deploy, can close) | - | `npx hardhat run scripts/deploy.js` |
| 3 | Backend API | 5000 | `npm run dev` |
| 4 | Frontend Dev Server | 5173 | `npm run dev` |

---

## 🎓 What You've Built

A complete **blockchain-based certificate verification system** with:

- 🔐 **Smart Contract** in Solidity
- 🌐 **REST API** with Express.js
- 🎨 **Modern UI** with React + Tailwind
- 📦 **MongoDB** for data storage
- 🔗 **Blockchain** integration with ethers.js
- 🔑 **JWT Authentication**
- 📁 **File Upload** with Multer
- 🔒 **SHA-256 Hashing**
- 📱 **QR Code** generation
- ✅ **Zero cost** using local blockchain

---

## 📚 Documentation Files

- 📖 `README.md` - Full system documentation
- 📋 `installation-guide.md` - Detailed installation steps
- 📝 This file - Quick start guide

---

## 🚀 Next Steps

### Explore Features
1. Create multiple certificates
2. Test all verification methods
3. Check Hardhat accounts and balances
4. View MongoDB data

### Customize
1. Edit Tailwind colors in `frontend/tailwind.config.js`
2. Modify smart contract in `blockchain/contracts/`
3. Add new API endpoints in `backend/routes/`
4. Create new React components

### Deploy
1. Deploy frontend to Vercel
2. Deploy backend to Heroku
3. Deploy contract to testnet
4. Use proper database instead of local MongoDB

---

## 💡 Pro Tips

**Tip 1: Keep Hardhat Running**
- Don't close Terminal 1
- All blockchain operations depend on it

**Tip 2: View Hardhat Accounts**
- First account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
- Has 10,000 ETH (local only)
- Used by system automatically

**Tip 3: Test Different Scenarios**
- Valid certificate verification
- Invalid/fake certificate detection
- Multiple certificate issuing
- Different user roles

**Tip 4: View Blockchain Data**
- Hardhat shows all transactions
- Check Terminal 1 for details
- Transactions are instant and free

**Tip 5: MongoDB View**
- Use MongoDB Compass to view data
- Database: `certificate_verification`
- Collections: `users`, `certificates`

---

## 🎉 SUCCESS!

Your system is completely set up and running. You now have a professional-grade blockchain certificate verification system!

**Share your success:**
- ✅ Verify multiple certificates
- ✅ Test different user roles
- ✅ Check blockchain transactions
- ✅ Explore the clean, modern UI

---

## 📞 Quick Help

**Check Backend Health:**
```bash
curl http://localhost:5000/health
```

**View Blockchain Logs:**
- Check Terminal 1 for all blockchain activity

**View Backend Logs:**
- Check Terminal 3 for API requests

**View Frontend Logs:**
- Check Terminal 4 for errors
- Check browser console (F12)

---

**You're all set! Happy verifying! 🎓**
