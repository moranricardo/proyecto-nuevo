/**
 * @file scripts/ra_pulse_bridge.cjs
 * @description Puente de Telemetría v2.0 - Optimizado para Node.js (GitHub Actions / CI/CD)
 */

const fs = require('fs').promises;
const path = require('path');
const { fetchChanges } = require('../utils/gerrit_client.cjs');
const { auditarLineasAccesibilidad } = require('./accessibility_audit.cjs');

console.log("📡 [Ra Pulse Bridge] Inicializando auditoría remota...");

/**
 * Carga la configuración local del proyecto de forma segura.
 */
function cargarConfiguracion() {
  const rutaConfig = path.join(__dirname, '../config/settings.json');
  try {
    return require(rutaConfig);
  } catch (e) {
    console.warn("⚠️ [Ra Pulse Bridge] No se pudo cargar config/settings.json, usando valores de respaldo.");
    return { gerrit_url: 'https://review.lineageos.org', project: '' };
  }
}

/**
 * Parsea de forma segura la respuesta de Gerrit quitando el prefijo anti-XSS si es necesario.
 */
function parsearRespuestaGerrit(data) {
  if (typeof data === 'object' && data !== null) return data;
  if (typeof data === 'string') {
    const cleaned = data.replace(/^\)\]\}'\n?/, '').trim();
    return JSON.parse(cleaned);
  }
  throw new Error("Formato de respuesta desconocido al procesar Gerrit.");
}

async function ejecutarCiclo() {
  const config = cargarConfiguracion();

  try {
    // 1. Obtención de datos desde el cliente de Gerrit
    const rawData = await fetchChanges(config.gerrit_url, config.project);
    const changes = parsearRespuestaGerrit(rawData);

    if (!Array.isArray(changes)) {
      throw new Error("La respuesta de Gerrit no es una lista válida de cambios.");
    }

    console.log(`✅ Telemetría extraída. Cambios detectados: ${changes.length}`);

    // 2. Lógica de auditoría y persistencia de estado
    if (changes.length > 0) {
      const esSeguro = auditarLineasAccesibilidad(changes[0]);

      const status = {
        status: esSeguro ? "STABLE" : "WARNING",
        last_pulse: new Date().toISOString(),
        latest_change: changes[0].change_id || changes[0]._number || "N/A"
      };

      await fs.writeFile('state.json', JSON.stringify(status, null, 2));

      if (!esSeguro) {
        console.error("❌ Auditoría fallida. Proceso interrumpido.");
        process.exit(1);
      }
    } else {
      console.log("ℹ️ No hay cambios abiertos actualmente para auditar.");
    }

    console.log("☀️ Ciclo completado exitosamente.");
  } catch (error) {
    console.error(`💥 [CRITICAL] Error en el flujo de telemetría: ${error.message}`);
    process.exit(1);
  }
}

// Executable / Entry point logic
if (require.main === module) {
  const WATCHDOG_MS = 15000;
  const timer = setTimeout(() => {
    console.error("⏳ ERROR: Timeout alcanzado. La conexión a Gerrit es inestable.");
    process.exit(1);
  }, WATCHDOG_MS);

  ejecutarCiclo().finally(() => clearTimeout(timer));
}

module.exports = { ejecutarCiclo };
