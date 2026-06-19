const { auditarLineasAccesibilidad } = require('./accessibility_audit');

function ejecutarConWatchdog(tarea, tiempoMaximoMs) {
    const timeout = setTimeout(() => {
        console.error("⏳ ERROR: Tiempo límite excedido en Ra Pulse. Abortando para proteger cuota.");
        process.exit(1); 
    }, tiempoMaximoMs);
    tarea().finally(() => clearTimeout(timeout));
}

async function iniciarMotorRaPulse() {
    console.log("📡 Ra Pulse: Conectando al centro de LineageOS Gerrit...");
    const url = 'https://review.lineageos.org/changes/?q=project:LineageOS/android_frameworks_base+status:open&n=1';
    
    try {
        const respuesta = await fetch(url, { headers: { 'Accept': 'application/json' } });
        let texto = await respuesta.text();
        const datos = JSON.parse(texto.replace(/^\)]}'\n/, ''));

        if (datos.length > 0) {
            const esSeguro = auditarLineasAccesibilidad(datos[0]);
            if (!esSeguro) {
                console.error("❌ Validación fallida. El cambio ha sido bloqueado en el Dashboard.");
                process.exit(1);
            }
            console.log("☀️ Sistema Ra Pulse: Todo en orden. Maat restaurado.");
        } else {
            console.log("💤 Sin cambios nuevos en el framework de accesibilidad.");
        }
    } catch (error) {
        console.error(`❌ Falla en el puente: ${error.message}`);
        process.exit(1);
    }
}

ejecutarConWatchdog(iniciarMotorRaPulse, 10000);
