# 📖 COMPLETE COMMAND REFERENCE

This document contains ALL commands needed to run the system, organized by component.

---

## 🚀 FASTEST WAY TO START (Copy-Paste Ready)

### Terminal 1: Start Blockchain
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/blockchain
npm install
npx hardhat node
```

### Terminal 2: Deploy Contract
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/blockchain
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract address from output!

### Terminal 3: Start Backend
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/backend
npm install
cp .env.example .env
# Edit .env and paste contract address
nano .env  # or use your editor
npm run dev
```

### Terminal 4: Start Frontend
```bash
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/frontend
npm install
npm run dev
```

Open http://localhost:5173 in browser!

---

## 🔗 BLOCKCHAIN COMMANDS

### Install Blockchain Dependencies
```bash
cd blockchain
npm install
```

### Start Hardhat Local Blockchain
```bash
cd blockchain
npx hardhat node
```

### Deploy Smart Contract
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Test Network (Sepolia)
```bash
cd blockchain
npx hardhat run scripts/deploy.js --network sepolia
```

### Run Smart Contract Tests
```bash
cd blockchain
npx hardhat test
```

### Verify Smart Contract
```bash
cd blockchain
npx hardhat verify --network localhost <CONTRACT_ADDRESS>
```

### Clean Hardhat Artifacts
```bash
cd blockchain
npx hardhat clean
```

### Compile Smart Contract
```bash
cd blockchain
npx hardhat compile
```

---

## 🔧 BACKEND COMMANDS

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Setup Environment File
```bash
cd backend
cp .env.example .env
```

### Edit Environment Variables
```bash
# Linux/Mac
nano backend/.env

# Or use VS Code
code backend/.env
```

### Start Backend Development Server
```bash
cd backend
npm run dev
```

### Start Backend Production Server
```bash
cd backend
npm start
```

### Run Backend Tests (when added)
```bash
cd backend
npm test
```

### View Backend Logs
- Check the terminal running `npm run dev`
- All API requests will be logged

### Check Backend Health
```bash
curl http://localhost:5000/health
```

### View Running Processes
```bash
# Linux/Mac
lsof -i :5000

# Windows
netstat -ano | findstr :5000
```

### Kill Process on Port 5000
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

---

## 🎨 FRONTEND COMMANDS

### Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Preview Production Build
```bash
cd frontend
npm run preview
```

### Run Frontend Linting
```bash
cd frontend
npm run lint
```

### View Running Frontend
- Open http://localhost:5173 in browser
- Press F12 for browser console
- Check terminal for build warnings

### Kill Process on Port 5173
```bash
# Linux/Mac
lsof -i :5173
kill -9 <PID>

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

---

## 📦 DATABASE COMMANDS

### Check MongoDB Status
```bash
# Linux/Mac
lsof -i :27017

# Windows
netstat -ano | findstr :27017
```

### Start MongoDB (Homebrew)
```bash
brew services start mongodb-community
```

### Stop MongoDB (Homebrew)
```bash
brew services stop mongodb-community
```

### Start MongoDB with Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Stop MongoDB with Docker
```bash
docker stop mongodb
docker rm mongodb
```

### Connect to MongoDB
```bash
# Using MongoDB shell (mongosh)
mongosh

# Then use database
use certificate_verification
```

### View Collections in MongoDB
```javascript
// In mongosh terminal
show databases
use certificate_verification
show collections
db.users.find().pretty()
db.certificates.find().pretty()
```

### Check MongoDB Logs
```bash
# Linux
tail -f /opt/homebrew/var/log/mongodb/mongo.log
```

---

## 🌐 API TESTING COMMANDS

### Test Backend Health Endpoint
```bash
curl http://localhost:5000/health
```

### Register User via API
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "password123",
    "role": "student",
    "studentId": "STU-2024-001"
  }'
```

### Login User via API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔍 UTILITY COMMANDS

### View Project Structure
```bash
cd certificate-verification-system
tree -L 3 -I 'node_modules|dist'
```

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Update npm to Latest
```bash
npm install -g npm@latest
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Install Node Modules Again
```bash
# Remove node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Check Port Usage
```bash
# View all ports
lsof -i -P -n | grep LISTEN

# Check specific port
lsof -i :5000
lsof -i :5173
lsof -i :8545
```

---

## 🐛 DEBUGGING COMMANDS

### View Hardhat Accounts
- Run `npx hardhat node` and check Terminal 1 output
- First account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

### Get Hardhat Private Key
- Check Terminal 1 output when `npx hardhat node` runs
- First private key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb476caddccdddfb1042f3e6871f1

### Test Smart Contract
```bash
cd blockchain
npx hardhat test
```

### View Contract ABI
```bash
cd blockchain
cat artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json | jq '.abi'
```

### Debug Backend with Logs
- Add console.log() in backend code
- Check Terminal 3 logs
- Use `npm run dev` for hot reload

### Debug Frontend with Browser
- Open http://localhost:5173
- Press F12 for Developer Tools
- Check Console tab for errors
- Check Network tab for API calls

---

## 📝 FILE EDITING COMMANDS

### Edit Backend .env File
```bash
# Use nano
cd backend
nano .env

# Use VS Code
code backend/.env

# Use vim
vim backend/.env
```

### View Backend .env File
```bash
cd backend
cat .env
```

### Edit Smart Contract
```bash
code blockchain/contracts/CertificateRegistry.sol
```

### Edit Backend Routes
```bash
code backend/routes/certificateRoutes.js
```

### Edit Frontend Components
```bash
code frontend/src/components/
```

### Edit Frontend Pages
```bash
code frontend/src/pages/
```

---

## 🚀 PRODUCTION DEPLOYMENT COMMANDS

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Build Backend for Production
Backend doesn't need building, just ensure dependencies are installed

### Deploy Frontend to Vercel
```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy Frontend to Netlify
```bash
cd frontend
npm run build
# Then upload dist/ folder to Netlify
```

### Deploy Backend to Heroku
```bash
cd backend
heroku create
git push heroku main
```

### Build Docker Image for Backend
```bash
cd backend
docker build -t cert-backend .
docker run -p 5000:5000 cert-backend
```

---

## 📊 MONITORING COMMANDS

### Monitor Hardhat Node (Terminal 1)
```bash
# Just watch the output
# Shows all transactions and blocks
npx hardhat node
```

### Monitor Backend (Terminal 3)
```bash
# Shows all API requests
npm run dev
```

### Monitor Frontend Build (Terminal 4)
```bash
# Shows compilation status
npm run dev
```

### View Real-time Logs
```bash
# Backend logs
tail -f backend_log.txt

# Hardhat logs
tail -f hardhat_log.txt
```

---

## 🔄 RESTART COMMANDS

### Restart Everything
1. Kill all terminals (Ctrl+C)
2. Close all terminal windows
3. Run Quick Start again

### Restart Blockchain Only
```bash
# In Terminal 1: Press Ctrl+C then run
npx hardhat node
```

### Restart Backend Only
```bash
# In Terminal 3: Press Ctrl+C then run
npm run dev
```

### Restart Frontend Only
```bash
# In Terminal 4: Press Ctrl+C then run
npm run dev
```

---

## 🧹 CLEANUP COMMANDS

### Remove Node Modules (All)
```bash
# Blockchain
cd blockchain
rm -rf node_modules package-lock.json

# Backend
cd ../backend
rm -rf node_modules package-lock.json

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
```

### Clean Hardhat Cache
```bash
cd blockchain
npx hardhat clean
```

### Remove MongoDB Data
```bash
# WARNING: This deletes all data!
# Linux/Mac
rm -rf /opt/homebrew/var/mongodb/

# Docker
docker stop mongodb
docker rm mongodb
```

### Remove All Artifacts
```bash
cd blockchain
rm -rf artifacts
rm -rf cache
```

---

## 📱 MOBILE TESTING COMMANDS

### View on Phone (Same Network)
```bash
# Get your machine IP
ipconfig getifaddr en0  # Mac
hostname -I             # Linux

# Access from phone
http://<YOUR_IP>:5173
```

### Test on Android Emulator
```bash
# Create reverse port mapping
adb reverse tcp:5173 tcp:5173
adb reverse tcp:5000 tcp:5000
adb reverse tcp:8545 tcp:8545

# Access from emulator
http://localhost:5173
```

---

## 🎓 EDUCATIONAL COMMANDS

### Understand File Structure
```bash
tree -L 2 -I 'node_modules'
```

### Count Lines of Code
```bash
find . -name "*.js" -o -name "*.jsx" -o -name "*.sol" | xargs wc -l
```

### View Smart Contract Source
```bash
cat blockchain/contracts/CertificateRegistry.sol
```

### View API Routes
```bash
cat backend/routes/certificateRoutes.js
```

---

## ⚡ QUICK REFERENCE TABLE

| Task | Command | Port |
|------|---------|------|
| Start Blockchain | `npx hardhat node` | 8545 |
| Deploy Contract | `npx hardhat run scripts/deploy.js --network localhost` | - |
| Start Backend | `npm run dev` (from backend) | 5000 |
| Start Frontend | `npm run dev` (from frontend) | 5173 |
| Check Backend | `curl http://localhost:5000/health` | - |
| MongoDB | `brew services start mongodb-community` | 27017 |
| Check Port Usage | `lsof -i :PORT_NUMBER` | - |
| Kill Process | `kill -9 PID` | - |

---

## 📌 IMPORTANT REMINDERS

✅ Keep Hardhat running in Terminal 1
✅ Keep Backend running in Terminal 3
✅ Keep Frontend running in Terminal 4
✅ MongoDB must be running for database operations
✅ Use correct port numbers (8545, 5000, 5173)
✅ Update .env with correct contract address
✅ Use first Hardhat account private key in .env

---

## 🆘 WHEN SOMETHING BREAKS

### Reset Everything
```bash
# Kill all processes
pkill -f "node"
pkill -f "hardhat"
pkill -f "vite"

# Wait 5 seconds
sleep 5

# Start fresh (follow Quick Start guide)
```

### Reinstall Everything
```bash
# Blockchain
cd blockchain && rm -rf node_modules && npm install

# Backend
cd ../backend && rm -rf node_modules && npm install

# Frontend
cd ../frontend && rm -rf node_modules && npm install
```

### Clear Cache and Reinstall
```bash
npm cache clean --force
# Then reinstall in all folders
```

---

This document should cover 99% of commands you'll need! 🎉
