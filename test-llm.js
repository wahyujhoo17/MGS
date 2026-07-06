const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/mgs-admin/generate-article',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('RESPONSE:', data));
});

req.on('error', e => console.error(e));
req.write(JSON.stringify({ prompt: "Harga tepung naik" }));
req.end();
