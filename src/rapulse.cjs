// src/rapulse.cjs - Puente de validación Ra Pulse (Maat Bridge)
const { validarIntegridad } = require('./mantenimiento.cjs');
const { enviarAlerta } = require('./notification_gateway.cjs');

/**
 * Ejecuta el pipeline de validación de integridad para Ra Pulse.
 * @param {string} [textoPrueba] - Texto opcional a evaluar.
 * @returns {Promise<boolean>}
 */
async function ejecutarPipeline(textoPrueba) {
  const contenidoLeccion = textoPrueba || "Esta es una lección de prueba sobre Git. ¿Entiendes el concepto?";

  console.log("[RA PULSE] Iniciando validación de integridad...");

  const resultado = validarIntegridad(contenidoLeccion);

  if (!resultado.aprobado) {
    console.error("❌ Error de Integridad:", resultado.mensaje);
    console.log("📧 Procesando alerta de correo...");
    await enviarAlerta("🚨 Alerta Ra Pulse: Fallo de Integridad", `Fallo en el pipeline: ${resultado.mensaje}`);
    return false;
  }

  console.log("✅ Integridad validada con éxito. Pipeline continúa.");
  return true;
}

// Ejecución directa desde CLI
if (require.main === module) {
  ejecutarPipeline()
    .then((exito) => {
      process.exit(exito ? 0 : 1);
    })
    .catch(async (err) => {
      console.error("💥 Error fatal en el pipeline:", err);
      await enviarAlerta("🚨 Alerta Ra Pulse: Error Fatal", err.message || String(err));
      process.exit(1);
    });
}

module.exports = { ejecutarPipeline };
