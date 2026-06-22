const fetch = global.fetch || require('node-fetch');

async function login(email, password) {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function run() {
  try {
    console.log('Logging in as admin...');
    const admin = await login('admin@certchain.com', 'Admin@123');
    console.log('admin login:', admin.token ? 'ok' : admin);

    if (admin.token) {
      const res = await fetch('http://localhost:5000/api/certificates', { headers: { Authorization: `Bearer ${admin.token}` } });
      const data = await res.json();
      console.log('/api/certificates status', res.status, 'data keys:', Object.keys(data));
    }

    console.log('Logging in as student...');
    const student = await login('student1@school.edu', 'Student@123');
    console.log('student login:', student.token ? 'ok' : student);
    if (student.token) {
      const res2 = await fetch('http://localhost:5000/api/certificates/my', { headers: { Authorization: `Bearer ${student.token}` } });
      const data2 = await res2.json();
      console.log('/api/certificates/my status', res2.status, 'cert count:', (data2.certificates || []).length);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
