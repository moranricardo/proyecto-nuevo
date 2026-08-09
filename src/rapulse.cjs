const { validarIntegridad } = require('./gerrit/gerrit-check.cjs');
const { enviarAlerta } = require('./notification_gateway.cjs');

async function ejecutarPipeline() {
    const contenidoLeccion = "Esta es una lección de prueba sobre Git. ¿Entiendes el concepto?";

    console.log("[RA PULSE] Iniciando validación de integridad...");

    const resultado = validarIntegridad(contenidoLeccion);

    if (!resultado.aprobado) {
        console.error("❌ Error de Integridad:", resultado.mensaje);

        if (process.env.GMAIL_USER && process.env.ALERT_EMAIL) {
            console.log("📧 Enviando alerta de correo...");
            await enviarAlerta("🚨 Alerta Ra Pulse: Fallo de Integridad", `Fallo en el pipeline: ${resultado.mensaje}`);
        }

        process.exit(1);
    }

    console.log("✅ Integridad validada con éxito. Pipeline continúa.");
    process.exit(0);
}

ejecutarPipeline().catch(async err => {
    console.error("💥 Error fatal en el pipeline:", err);
    if (process.env.GMAIL_USER && process.env.ALERT_EMAIL) {
        await enviarAlerta("🚨 Alerta Ra Pulse: Error Fatal", err.message || String(err));
    }
    process.exit(1);
});
