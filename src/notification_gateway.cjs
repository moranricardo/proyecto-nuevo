// src/notification_gateway.cjs - Servicio Gateway para alertas vía Nodemailer / Gmail
const nodemailer = require('nodemailer');

/**
 * Instancia el transporter leyendo variables de entorno en tiempo de ejecución.
 */
function obtenerTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
}

/**
 * Envía una alerta por correo electrónico usando Nodemailer.
 * @param {string} asunto - Asunto del correo.
 * @param {string} mensaje - Cuerpo del mensaje (texto plano).
 * @param {string} [htmlMensaje] - Cuerpo del mensaje en formato HTML opcional.
 * @returns {Promise<boolean>}
 */
async function enviarAlerta(asunto, mensaje, htmlMensaje = null) {
  const user = process.env.GMAIL_USER;
  const destinatario = process.env.ALERT_EMAIL || user;
  const transporter = obtenerTransporter();

  // Modo Simulado (Dry-Run / Dev Local sin credenciales)
  if (!transporter || !destinatario) {
    console.warn("⚠️ [Notification Gateway] Módulo en MODO SIMULACIÓN. Omitiendo envío real (Variables de entorno no configuradas).");
    console.log(`📩 [Simulación] Para: ${destinatario || 'no-definido'} | Asunto: "${asunto}" | Mensaje: "${mensaje}"`);
    return true;
  }

  try {
    const mailOptions = {
      from: `"Ra Pulse" <${user}>`,
      to: destinatario,
      subject: asunto,
      text: mensaje
    };

    if (htmlMensaje) {
      mailOptions.html = htmlMensaje;
    }

    await transporter.sendMail(mailOptions);
    console.log("✅ [Notification Gateway] Correo enviado exitosamente.");
    return true;
  } catch (error) {
    console.error("❌ [Notification Gateway] Error al enviar correo:", error.message);
    return false;
  }
}

// Bloque de prueba local al ejecutar directamente el script
if (require.main === module) {
  enviarAlerta(
    "Prueba de Notificación - Ra Pulse", 
    "Este es un mensaje de prueba de integridad del servicio.",
    "<h3>Ra Pulse</h3><p>Este es un mensaje de prueba de integridad del servicio en formato <b>HTML</b>.</p>"
  ).then(resultado => console.log("🧪 Estado del envío:", resultado));
}

module.exports = { enviarAlerta };
