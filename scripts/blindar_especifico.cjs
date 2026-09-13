// scripts/blindar_especifico.cjs (Módulo parametrizable de blindaje por repositorio)
const https = require('https');

/**
 * Cambia la visibilidad de UN REPOSICORIO ESPECÍFICO en GitHub a Privado.
 * @param {string} owner - Propietario de la cuenta/organización en GitHub.
 * @param {string} repo - Nombre del repositorio a blindar.
 * @param {string} [tokenOverride] - Token opcional para autenticar la petición.
 */
function blindarRepositorioEspecifico(owner = 'moranricardo', repo = 'proyecto-nuevo', tokenOverride) {
  const token = tokenOverride || process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn(`⚠️ [Blindar Específico] No se proporcionó GITHUB_TOKEN para '${owner}/${repo}'. Omitiendo...`);
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
      'User-Agent': 'Node-Maat-Automator',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const req = https.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`🔒 [Éxito] El repositorio objetivo '${owner}/${repo}' ahora es privado.`);
      } else {
        console.error(`❌ [Error ${res.statusCode}] No se pudo blindar '${owner}/${repo}':`, responseData);
      }
    });
  });

  req.on('error', (e) => console.error(`❌ [Error de Conexión]`, e.message));
  req.write(data);
  req.end();
}

if (require.main === module) {
  const targetOwner = process.argv[2] || 'moranricardo';
  const targetRepo = process.argv[3] || 'proyecto-nuevo';
  blindarRepositorioEspecifico(targetOwner, targetRepo);
}

module.exports = { blindarRepositorioEspecifico };
