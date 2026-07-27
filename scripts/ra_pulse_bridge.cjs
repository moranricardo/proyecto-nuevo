/**
 * @file index.js
 * @description Puente de Telemetría v2.0 - Optimizado para Node.js (GitHub Actions compatible)
 */

const fs = require('fs').promises; // Uso de promesas para evitar bloqueo de I/O
const config = require('../config/settings.json');
const { fetchChanges } = require('../utils/gerrit_client.cjs');
const { auditarLineasAccesibilidad } = require('./accessibility_audit.cjs');

console.log("📡 [Ra Pulse Bridge] Inicializando auditoría remota...");

/**
 * Limpiador de prefijo de seguridad Gerrit
 * @param {string} rawData 
 * @returns {Object}
 */
const cleanGerritResponse = (rawData) => {
    const cleaned = rawData.replace(/^\)\]\}'\n/, '');
    return JSON.parse(cleaned);
};

async function ejecutarCiclo() {
    try {
        // 1. Obtención de datos
        const rawData = await fetchChanges(config.gerrit_url, config.project);
        const changes = cleanGerritResponse(rawData);

        if (!Array.isArray(changes)) throw new Error("Formato de respuesta Gerrit inválido");

        console.log(`✅ Telemetría extraída. Cambios detectados: ${changes.length}`);

        // 2. Lógica de auditoría
        if (changes.length > 0) {
            const esSeguro = auditarLineasAccesibilidad(changes[0]);
            
            // 3. Persistencia de estado (Async para no bloquear)
            const status = { 
                status: esSeguro ? "STABLE" : "WARNING", 
                last_pulse: new Date().toISOString(),
                latest_change: changes[0]._number
            };
            await fs.writeFile('state.json', JSON.stringify(status, null, 2));

            if (!esSeguro) {
                console.error("❌ Auditoría fallida. Proceso interrumpido.");
                process.exit(1); 
            }
        }

        console.log("☀️ Ciclo completado exitosamente.");
    } catch (error) {
        console.error(`💥 [CRITICAL] Error en el flujo: ${error.message}`);
        process.exit(1);
    }
}

// Timeout de seguridad nativo
const WATCHDOG_MS = 15000;
const timer = setTimeout(() => {
    console.error("⏳ ERROR: Timeout alcanzado. La conexión a Gerrit es inestable.");
    process.exit(1);
}, WATCHDOG_MS);

ejecutarCiclo().finally(() => clearTimeout(timer));
