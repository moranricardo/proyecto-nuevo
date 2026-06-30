const https = require('https');

// --- CONFIGURACIÓN ---
// Sustituye 'TU_TOKEN_REAL_AQUI' por tu personal access token de GitHub
const GITHUB_TOKEN = 'TU_TOKEN_REAL_AQUI'; 
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
    'User-Agent': 'Termux-Maat-Client',
    'Accept': 'application/vnd.github.v3+json'
  }
};

console.log(`[Maat] Iniciando proceso para blindar ${REPO}...`);

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => responseData += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log(`[Éxito] El repositorio ${REPO} es ahora privado.`);
    } else {
      console.error(`[Error ${res.statusCode}] Respuesta de GitHub:`, responseData);
    }
  });
});

req.on('error', (e) => {
  console.error('[Error de red] No se pudo conectar a GitHub:', e.message);
});

req.write(data);
req.end();

