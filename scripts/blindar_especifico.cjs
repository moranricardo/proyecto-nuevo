const https = require('https');

// RECUERDA: Sustituye 'tu_token_aqui' por tu Personal Access Token real
const GITHUB_TOKEN = 'tu_token_aqui'; 
const OWNER = 'moranricardo';
const REPO = 'proyecto-nuevo';

const data = JSON.stringify({ private: true });

const options = {
  hostname: 'api.github.com',
  path: `/repos/${OWNER}/${REPO}`,
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Node-Maat-Automator',
    'Accept': 'application/vnd.github.v3+json'
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => responseData += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log(`[Éxito] El repositorio ${REPO} ahora es privado.`);
    } else {
      console.error(`[Error ${res.statusCode}] Respuesta:`, responseData);
    }
  });
});

req.on('error', (e) => {
  console.error(`[Error de Conexión]`, e);
});

req.write(data);
req.end();

