const https = require('https');

// Configuración - Ajusta la URL a la tuya
const GERRIT_URL = 'tu-instancia-gerrit.com'; 
const GERRIT_TOKEN = 'TU_TOKEN_AQUI'; // Sustituye por tu token real

const options = {
  hostname: GERRIT_URL,
  path: '/changes/?q=status:open',
  method: 'GET',
  headers: { 'Authorization': `Bearer ${GERRIT_TOKEN}` }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const cleanData = data.replace(/^\)\]\}'\n/, '');
    try {
      const changes = JSON.parse(cleanData);
      console.log('Pulso del sistema estable. Cambios recuperados:', changes.length);
    } catch (e) {
      console.error('Error en el Duat:', e.message);
    }
  });
});

req.on('error', (e) => console.error('Apofis detectado:', e.message));
req.end();

