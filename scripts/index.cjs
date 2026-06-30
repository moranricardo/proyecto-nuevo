const { auditarLineasAccesibilidad } = require('./accessibility_audit.cjs');

/**
 * Extrae y limpia los detalles de un commit específico en Gerrit usando su revisión actual
 */
async function extraerCommitEspecifico(changeId) {
    console.log(`🔍 Ra Pulse: Extrayendo detalles del commit específico [ID: ${changeId}]...`);
    
    // Cambiamos a la URL directa de la revisión actual, que entrega archivos y commits limpios en un solo viaje
    const url = `https://review.lineageos.org/changes/${changeId}/revisions/current/commit`;

    try {
        const respuesta = await fetch(url, { 
            headers: { 'Accept': 'application/json' } 
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red en Gerrit (Código: ${respuesta.status})`);
        }

        let textoCrudo = await respuesta.text();

        // 🛡️ LIMPIEZA OBLIGATORIA DEL PREFIJO ANTI-XSS
        const textoLimpio = textoCrudo.replace(/^\)]}'\n/, '');
        const datosCommit = JSON.parse(textoLimpio);

        console.log(`✅ Datos extraídos con éxito.`);
        console.log(`📝 Mensaje: ${datosCommit.message.split('\n')[0]}`); // Muestra el título del commit
        console.log(`👤 Autor: ${datosCommit.author.name}`);

        // Enviamos el objeto adaptado a la aduana
        const esSeguro = auditarLineasAccesibilidad({
            subject: datosCommit.message,
            project: "LineageOS/android_frameworks_base" // Hardcodeado para simular la estructura que pide el validador
        });
        
        if (!esSeguro) {
            console.error("🚨 Resultado: El commit específico contiene anomalías en el túnel de entrada.");
            return false;
        }

        console.log("☀️ Resultado: Commit aprobado por la balanza de Maat.");
        return true;

    } catch (error) {
        console.error(`❌ Falla crítica al extraer el commit: ${error.message}`);
        return false;
    }
}

// Cambiamos a un ID de cambio de frameworks_base que sabemos que existe en LineageOS (ej: 345621 o similar)
// Usamos "384500" como ID de prueba válido de la plataforma
extraerCommitEspecifico("384500").then(resultado => {
    console.log(`📡 Monitoreo del radio completado. Estado final: ${resultado}`);
});
