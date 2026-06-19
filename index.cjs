const { auditarLineasAccesibilidad } = require('./accessibility_audit.cjs');

/**
 * Extrae y limpia quirúrgicamente los detalles de un commit específico en Gerrit
 * @param {string} changeId - El ID o número del commit en LineageOS (ej: '345621')
 */
async function extraerCommitEspecifico(changeId) {
    console.log(`🔍 Ra Pulse: Extrayendo detalles del commit específico [ID: ${changeId}]...`);
    
    // Endpoint para obtener los detalles del cambio incluyendo archivos y revisiones actuales
    const url = `https://review.lineageos.org/changes/${changeId}/detail?O=CURRENT_REVISION&O=CURRENT_FILES`;

    try {
        const respuesta = await fetch(url, { 
            headers: { 'Accept': 'application/json' } 
        });

        if (!respuesta.ok) {
            throw new Error(`Error de red en Gerrit (Código: ${respuesta.status})`);
        }

        let textoCrudo = await respuesta.text();

        // 🛡️ LIMPIEZA OBLIGATORIA DEL PREFIJO ANTI-XSS
        // Gerrit añade )]}'\n al inicio para romper inyecciones de scripts automáticas en navegadores.
        const textoLimpio = textoCrudo.replace(/^\)]}'\n/, '');

        // Convertimos el JSON seguro a Objeto de JavaScript
        const datosCommit = JSON.parse(textoLimpio);

        console.log(`✅ Datos extraídos con éxito.`);
        console.log(`📝 Proyecto: ${datosCommit.project}`);
        console.log(`👤 Autor: ${datosCommit.owner.name}`);

        // Enviamos el commit directamente a la aduana de accesibilidad que creamos
        const esSeguro = auditarLineasAccesibilidad(datosCommit);
        
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

// Prueba local automática con un ID de cambio de ejemplo (puedes cambiarlo por cualquier ID real de Gerrit)
// Usamos el ID de un cambio reciente o genérico para validar que la limpieza anti-XSS funcione
extraerCommitEspecifico("385000").then(resultado => {
    console.log(`📡 Monitoreo del radio completado. Estado final: ${resultado}`);
});
