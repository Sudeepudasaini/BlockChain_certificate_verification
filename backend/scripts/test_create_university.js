const fetch = global.fetch || require('node-fetch');

async function run() {
  try {
    const login = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@certchain.com', password: 'Admin@123' }),
    });
    const loginData = await login.json();
    const token = loginData.token;
    if (!token) { console.error('Admin login failed'); process.exit(1); }

    const res = await fetch('http://localhost:5000/api/admin/universities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: 'Test University', universityCode: 'TSTU', email: `testu+${Date.now()}@example.com`, password: 'TestPass123', phone: '1234567890', address: '123 Test St', status: 'active' }),
    });
    const data = await res.json();
    console.log('create university response:', data);
  } catch (err) {
    console.error(err);
  }
}

run();
