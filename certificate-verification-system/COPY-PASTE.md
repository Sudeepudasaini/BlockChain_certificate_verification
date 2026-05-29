# 💻 COPY-PASTE READY COMMANDS

**JUST COPY AND PASTE THESE COMMANDS IN ORDER**

No explanations needed. Just copy, paste, and press Enter.

---

## 📋 TERMINAL 1: START BLOCKCHAIN

**Copy all of this and paste in Terminal 1:**

```
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/blockchain && npm install && npx hardhat node
```

**Wait until you see:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545
```

**Then go to Terminal 2 (keep Terminal 1 running)**

---

## 📋 TERMINAL 2: DEPLOY CONTRACT

**Copy all of this and paste in Terminal 2:**

```
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/blockchain && npx hardhat run scripts/deploy.js --network localhost
```

**You'll see:**
```
CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00
```

**📝 Copy this address (the one with 0x...)**

**Then go to Terminal 3**

---

## 📋 TERMINAL 3: SETUP BACKEND - PART A

**Copy and paste this FIRST:**

```
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/backend && npm install && cp .env.example .env
```

**Wait for it to finish...**

**Now you need to edit the .env file:**

**Option 1: Using VS Code (Easiest)**
```
code /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/backend/.env
```

**Option 2: Using nano editor**
```
nano /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/backend/.env
```

**Find line 5 that says:**
```
CONTRACT_ADDRESS=paste_deployed_contract_address_here
```

**Replace with your address from Terminal 2:**
```
CONTRACT_ADDRESS=0x5FbDB2315678afccb333f8a9c4fc6b00b68f7c00
```

**Save the file (Ctrl+X, then Y in nano, or Ctrl+S in VS Code)**

---

## 📋 TERMINAL 3: SETUP BACKEND - PART B

**After editing .env, paste this in Terminal 3:**

```
npm run dev
```

**Wait until you see:**
```
✅ Server running on http://localhost:5000
```

**Keep Terminal 3 running, go to Terminal 4**

---

## 📋 TERMINAL 4: START FRONTEND

**Copy and paste this:**

```
cd /home/sudeeppudasaini/Desktop/blockchainproject/certificate-verification-system/frontend && npm install && npm run dev
```

**Wait until you see:**
```
➜  Local:   http://localhost:5173/
```

---

## 🌐 OPEN BROWSER

**Copy this URL:**
```
http://localhost:5173
```

**Paste in your browser and press Enter**

---

## ✅ EVERYTHING IS RUNNING!

You should have:
- ✅ Terminal 1: Blockchain running
- ✅ Terminal 2: Contract deployed (can be closed)
- ✅ Terminal 3: Backend running
- ✅ Terminal 4: Frontend running
- ✅ Browser: System loaded

---

## 🧪 NOW TEST THE SYSTEM

### TEST STEP 1: Register

**In browser, do this:**

1. Click **Register** button
2. Fill these fields exactly:
   - Name: `Test University`
   - Email: `uni@test.com`
   - Password: `password123`
   - Role: `University/Admin` (select from dropdown)
   - University Name: `Test University`
3. Click **Create Account**

**Should show: Dashboard with "0 issued certificates"**

✅ Done!

---

### TEST STEP 2: Issue Certificate

**In browser, do this:**

1. Click **Issue Certificate** in navbar
2. Fill these fields:
   - Student Full Name: `John Doe`
   - Student Email: `john@uni.edu`
   - Student ID: `STU-2024-001`
   - Program Name: `Computer Science`
   - Batch Year: `2024`
   - Certificate ID: `CERT-2024-001`
   - Issue Date: `Today's date` (click calendar)
   - Certificate File: **Select any PDF file**
3. Click **Issue Certificate** button

**Should show: Green success card with certificate details**

✅ Done!

---

### TEST STEP 3: Verify Certificate

**In browser, do this:**

1. Click **Logout** button
2. Click **Verify Certificate** (in navbar or home page)
3. Select **Upload Certificate** method
4. Fill:
   - Certificate ID: `CERT-2024-001`
   - Upload: **Same PDF file from TEST STEP 2**
5. Click **Verify Certificate**

**Should show: Green card "Certificate Verified Successfully"**

✅ Done! System works!

---

### TEST STEP 4: Try Fake Certificate

**In browser, do this:**

1. Keep on Verification page
2. Find the PDF file from TEST STEP 2
3. Edit it slightly (add any mark/annotation/text)
4. Upload this **modified PDF**
5. Use same Certificate ID: `CERT-2024-001`
6. Click **Verify Certificate**

**Should show: Red card "Certificate Not Verified"**

✅ Success! System detected fake certificate!

---

## 🛑 WHEN YOU'RE DONE TESTING

**To stop everything:**

1. **Terminal 1:** Press `Ctrl+C`
2. **Terminal 3:** Press `Ctrl+C`
3. **Terminal 4:** Press `Ctrl+C`
4. **Browser:** Close tab

**To run again later, just repeat the copy-paste commands above**

---

## 🆘 QUICK FIXES

### "Cannot connect to MongoDB"
```
# Check if MongoDB is running (Terminal 5 - new)
lsof -i :27017
```

If nothing shows:
```
# Start MongoDB
brew services start mongodb-community
```

Then restart Terminal 3 (Backend)

### "Port 5000 already in use"
```
lsof -i :5000
kill -9 <PID>
```

Then retry Terminal 3 command

### "npm install fails"
```
npm cache clean --force
npm install
```

### "Browser shows blank page"
1. Press Ctrl+Shift+R (hard refresh)
2. Check Terminal 4 for errors
3. Press F12 for console

### "Contract address error"
1. Check you copied correct address from Terminal 2
2. Check it's in backend/.env file
3. Restart Terminal 3

---

## 📝 NOTES

- Keep Terminals 1, 3, and 4 running
- Don't close Terminal 1 (blockchain)
- If anything breaks, just Ctrl+C and retry
- MongoDB must be running
- Use the exact certificate ID: `CERT-2024-001`
- Use the exact email: `uni@test.com`

---

## 🎉 THAT'S IT!

You now have a complete blockchain certificate verification system running locally!

**Features working:**
✅ User registration with roles
✅ Certificate issuance
✅ SHA-256 hashing
✅ Blockchain storage
✅ QR code generation
✅ Certificate verification
✅ Fake detection

**All free, all local, all working!**

---

**Enjoy your blockchain system! 🚀**
