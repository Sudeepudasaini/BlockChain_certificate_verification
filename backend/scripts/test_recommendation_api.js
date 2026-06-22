const fetch = global.fetch || require('node-fetch');

async function run() {
  try {
    console.log('Logging in...');
    const loginResp = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@example.com', password: 'Student@123' }),
    });
    const loginData = await loginResp.json();
    console.log('Login response:', loginData);
    const token = loginData.token;
    if (!token) {
      console.error('Login failed, no token');
      process.exit(1);
    }

    console.log('Requesting recommendations...');
    const recResp = await fetch('http://localhost:5000/api/career/recommendations', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const recData = await recResp.json();
    console.log('Recommendations response:', JSON.stringify(recData, null, 2));
  } catch (err) {
    console.error('API test failed:', err);
    process.exit(1);
  }
}

run();
