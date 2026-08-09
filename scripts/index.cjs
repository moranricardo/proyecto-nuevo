// scripts/index.cjs (Orquestador auxiliar para auditoría y alertas de Gerrit)
const https = require('https');
const path = require('path');
const fs = require('fs');

// Cargar la pasarela de notificaciones en CommonJS (.cjs)
const { enviarAlerta } = require('../src/notification_gateway.cjs');

/**
 * Carga la configuración local del proyecto.
 */
function obtenerConfiguracion() {
  const rutaConfig = path.join(__dirname, '../config/settings.json');
  if (fs.existsSync(rutaConfig)) {
    try {
      return JSON.parse(fs.readFileSync(rutaConfig, 'utf8'));
    } catch (e) {
      console.warn('⚠️ [Ra Pulse Scripts] Error al leer settings.json. Usando valores por defecto.');
    }
  }
  return { gerrit_url: 'https://review.lineageos.org' };
}

/**
 * Consulta la API REST de Gerrit y notifica si existen cambios pendientes.
 */
async function auditarGerrit() {
  console.log("🔍 [Ra Pulse] Consultando el estado de la balanza en Gerrit...");

  const config = obtenerConfiguracion();
  const rawUrl = config.gerrit_url || (config.gerrit && config.gerrit.url) || 'https://review.lineageos.org';
  const urlObj = new URL(rawUrl);

  const options = {
    hostname: urlObj.hostname,
    path: '/changes/?q=status:open&n=5',
    method: 'GET',
    headers: {
      'User-Agent': 'Node-RaPulse-Orchestrator/1.0',
      'Accept': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    
    res.on('end', async () => {
      // Limpieza segura del prefijo anti-XSS
      const cleanData = rawData.replace(/^\)\]\}'\n?/, '').trim();

      try {
        const json = JSON.parse(cleanData);
        if (json.length > 0) {
          console.log(`⚠️ [Ra Pulse] Se encontraron ${json.length} cambios abiertos en ${urlObj.hostname}.`);
          
          if (typeof enviarAlerta === 'function') {
            await enviarAlerta(
              "🚨 Ra Pulse: Alerta Gerrit", 
              `Se han detectado ${json.length} cambios abiertos en ${urlObj.hostname}.`
            );
          }
        } else {
          console.log("✅ [Ra Pulse] Sistema en equilibrio.");
        }
      } catch (e) {
        console.error("❌ [Ra Pulse] Error al procesar respuesta de Gerrit:", e.message);
      }
    });
  });

  req.on('error', (e) => {
    console.error("❌ [Ra Pulse] Error en la conexión HTTP:", e.message);
  });

  req.end();
}

if (require.main === module) {
  auditarGerrit();
}

module.exports = { auditarGerrit };
