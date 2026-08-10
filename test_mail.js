const { enviarAlerta } = require('./src/notification_gateway.js');

// Envolvemos el código en una función asíncrona
async function ejecutarPrueba() {
    console.log("🛠️ Iniciando envío de alerta...");

    try {
        const resultado = await enviarAlerta(
            "🚨 Alerta de Seguridad Ra Pulse", 
            "El Maat ha detectado un commit no conforme. Prueba de sistema operativo."
        );

        if (resultado) {
            console.log("✅ ¡Correo enviado exitosamente!");
        } else {
            console.log("❌ Error: No se pudo enviar el correo.");
        }
    } catch (error) {
        console.error("💥 Error crítico:", error);
    }
}

// LLAMAMOS a la función aquí abajo
ejecutarPrueba();
