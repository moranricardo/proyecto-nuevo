// scripts/blindar.cjs (Módulo de blindaje y privacidad del repositorio)
const https = require('https');

/**
 * Cambia la visibilidad del repositorio en GitHub a Privado.
 * Utiliza el token pasado por parámetro o la variable de entorno GITHUB_TOKEN.
 * @param {string} [tokenOverride] - Token opcional para autenticación con la API de GitHub.
 */
function blindarRepositorio(tokenOverride) {
  const token = tokenOverride || process.env.GITHUB_TOKEN;
  const owner = 'moranricardo';
  const repo = 'proyecto-nuevo';

  if (!token) {
    console.warn('⚠️ [Blindar] No se proporcionó GITHUB_TOKEN. Omitiendo actualización de visibilidad.');
    return;
  }

  const data = JSON.stringify({ private: true });
  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Termux-Maat-Client',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const req = https.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`🔒 [Éxito] El repositorio '${repo}' ahora es privado.`);
      } else {
        console.error(`❌ [Error ${res.statusCode}] No se pudo cambiar visibilidad:`, responseData);
      }
    });
  });

  req.on('error', (e) => console.error('❌ [Error de Red]:', e.message));
  req.write(data);
  req.end();
}

if (require.main === module) {
  blindarRepositorio();
}

module.exports = { blindarRepositorio };
