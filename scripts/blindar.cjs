const https = require('https');
const GITHUB_TOKEN = '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'; 
const OWNER = 'moranricardo';
const REPO = 'proyecto-nuevo';

const data = JSON.stringify({ private: true });
const options = {
  hostname: 'api.github.com',
  path: '/repos/' + OWNER + '/' + REPO,
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer ' + GITHUB_TOKEN,
    'Content-Type': 'application/json',
    'User-Agent': 'Termux-Maat-Client',
    'Accept': 'application/vnd.github.v3+json'
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => responseData += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('[Éxito] El repositorio ' + REPO + ' es ahora privado.');
    } else {
      console.error('[Error ' + res.statusCode + '] Respuesta:', responseData);
    }
  });
});
req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
