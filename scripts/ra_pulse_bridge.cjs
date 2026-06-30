// ra_pulse_bridge.cjs
const fs = require('fs');
// Radio Desacoplado: Módulo de auditoría de accesibilidad
const { auditarLineasAccesibilidad } = require('./accessibility_audit.cjs');

console.log("📡 [Ra Pulse Bridge] Iniciando puente de telemetría hacia LineageOS Gerrit...");

/**
 * EL PERRO GUARDIÁN (Watchdog)
 * Evita que el proceso quede atrapado en el Duat (timeouts infinitos)
 * protegiendo los recursos de Termux y los minutos de GitHub Actions.
 */
function ejecutarConWatchdog(tarea, tiempoMaximoMs) {
    const timeout = setTimeout(() => {
        console.error("⏳ ERROR FATAL: Apofis ha atrapado el proceso. Tiempo límite excedido. Abortando...");
        
        // Reportar falla crítica al centro de estado antes de morir
        const failedStatus = { 
            status: "CRITICAL", 
            last_pulse: new Date().toISOString(), 
            modules: { bridge: "TIMEOUT" } 
        };
        fs.writeFileSync('state.json', JSON.stringify(failedStatus, null, 2));
        
        process.exit(1); 
    }, tiempoMaximoMs);
    
    tarea().finally(() => clearTimeout(timeout));
}

/**
 * EL MOTOR DE RA PULSE
 * Consume la API de Gerrit, limpia el JSON y delega la validación.
 */
async function iniciarMotorRaPulse() {
    const url = 'https://review.lineageos.org/changes/?q=project:LineageOS/android_frameworks_base+status:open&n=1';
    
    try {
        // Uso de fetch nativo (Node v18+) para mantener el entorno ligero
        const respuesta = await fetch(url, { 
            headers: { 
                'Accept': 'application/json',
                'User-Agent': 'RaPulse-Orchestrator-Termux' 
            } 
        });
        
        let texto = await respuesta.text();
        
        // REGLA DE ORO: Limpieza del prefijo anti-XSS de Gerrit
        const magicPrefix = ")]}'\n";
        if (texto.startsWith(magicPrefix)) {
            texto = texto.slice(magicPrefix.length);
        }

        const datos = JSON.parse(texto);
        console.log(`✅ Telemetría extraída. Cambios detectados en el framework: ${datos.length}`);

        let maatRestaurado = true;

        if (datos.length > 0) {
            // Se invoca al Mago de Oz: El análisis ocurre silenciosamente en el backend
            const esSeguro = auditarLineasAccesibilidad(datos[0]);
            
            if (!esSeguro) {
                console.error("❌ Validación fallida. El cambio ha sido bloqueado en el Dashboard.");
                maatRestaurado = false;
            } else {
                console.log("☀️ Sistema Ra Pulse: Auditoría limpia. Maat restaurado.");
            }
        } else {
            console.log("💤 Sin cambios nuevos en el framework de accesibilidad.");
        }

        // Reportar el pulso final al archivo central de estado para que los radios lo lean
        const status = { 
            status: maatRestaurado ? "STABLE" : "WARNING", 
            last_pulse: new Date().toISOString(), 
            modules: { bridge: maatRestaurado ? "OK" : "AUDIT_FAILED" } 
        };
        fs.writeFileSync('state.json', JSON.stringify(status, null, 2));
        console.log("📝 Pulso reportado en state.json");

        // Si el Maat se rompió, forzamos salida con error para detener el CI/CD en GitHub Actions
        if (!maatRestaurado) process.exit(1);

    } catch (error) {
        console.error(`💥 Falla en el puente al cruzar el Duat: ${error.message}`);
        
        // Registro forense en state.json
        const errorStatus = { 
            status: "CRITICAL", 
            last_pulse: new Date().toISOString(), 
            modules: { bridge: "ERROR", detail: error.message } 
        };
        fs.writeFileSync('state.json', JSON.stringify(errorStatus, null, 2));
        
        process.exit(1);
    }
}

// Iniciar el Ciclo de Ra con un límite estricto de 10 segundos
ejecutarConWatchdog(iniciarMotorRaPulse, 10000);
