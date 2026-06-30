const https = require('https');

// Configuración base de Gerrit
const GERRIT_HOST = 'gerrit.tu-servidor.com'; // Reemplazar con tu host real
const GERRIT_PORT = 443;
const ENDPOINT = '/changes/?q=status:open&n=5'; // Ejemplo: últimos 5 cambios abiertos

const options = {
  hostname: GERRIT_HOST,
  port: GERRIT_PORT,
  path: ENDPOINT,
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    // 'Authorization': 'Basic ' + Buffer.from('usuario:token').toString('base64') // Descomentar si requiere auth
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      // Regla Técnica: Limpieza estricta del prefijo de seguridad anti-XSS
      const antiXssPrefix = ")]}'\n";
      let cleanData = data;
      
      if (data.startsWith(antiXssPrefix)) {
        cleanData = data.slice(antiXssPrefix.length);
      }

      const jsonResponse = JSON.parse(cleanData);
      console.log('=== Conexión Exitosa con Gerrit ===');
      console.log(`Cambios detectados: ${jsonResponse.length}`);
      console.log(JSON.stringify(jsonResponse, null, 2));

    } catch (error) {
      console.error('::error::Error al parsear la respuesta JSON de Gerrit:', error.message);
    }
  });
});

req.on('error', (e) => {
  console.error(`::error::Fallo en la petición HTTP: ${e.message}`);
});

req.end();
