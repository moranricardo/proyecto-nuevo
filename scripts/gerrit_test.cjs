// scripts/gerrit_test.cjs (Módulo de prueba de conectividad directa con Gerrit)
const https = require('https');
const path = require('path');
const fs = require('fs');

/**
 * Carga la configuración global o usa un fallback seguro.
 */
function obtenerConfiguracion() {
  const rutaConfig = path.join(__dirname, '../config/settings.json');
  if (fs.existsSync(rutaConfig)) {
    try {
      const raw = fs.readFileSync(rutaConfig, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      console.warn('⚠️ [Gerrit Test] No se pudo leer settings.json. Usando valores predeterminados.');
    }
  }
  return {
    gerrit_url: 'https://review.lineageos.org',
    gerrit: { query_limit: 5 }
  };
}

/**
 * Ejecuta una prueba de pulso/conectividad directamente a la API REST de Gerrit.
 */
function probarConexionGerrit() {
  const config = obtenerConfiguracion();
  const rawUrl = config.gerrit_url || (config.gerrit && config.gerrit.url) || 'https://review.lineageos.org';
  
  const urlObj = new URL(rawUrl);
  const hostname = urlObj.hostname;
  const limit = (config.gerrit && config.gerrit.query_limit) || 5;
  const queryPath = `/changes/?q=status:open&n=${limit}`;

  console.log(`🌐 [Gerrit Test] Probando conexión directa a: https://${hostname}${queryPath}`);

  const options = {
    hostname: hostname,
    path: queryPath,
    method: 'GET',
    headers: {
      'User-Agent': 'Node-Gerrit-Tester/1.0',
      'Accept': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      // Limpieza del prefijo de seguridad anti-XSS de Gerrit: )]}'
      const cleanData = rawData.replace(/^\)\]\}'\n?/, '').trim();
      
      try {
        const changes = JSON.parse(cleanData);
        console.log(`✅ [Gerrit Test] Pulso del sistema estable. Cambios recuperados: ${changes.length}`);
        if (changes.length > 0) {
          console.log(`   └ Cambios recientes en: ${changes[0].project} (${changes[0].change_id})`);
        }
      } catch (e) {
        console.error('❌ [Gerrit Test] Error al parsear respuesta de Gerrit:', e.message);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ [Gerrit Test] Error de conexión:', e.message);
  });

  req.end();
}

if (require.main === module) {
  probarConexionGerrit();
}

module.exports = { probarConexionGerrit };
