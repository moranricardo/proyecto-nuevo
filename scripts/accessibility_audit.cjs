// scripts/accessibility_audit.cjs (Módulo de validación de accesibilidad y metadatos)

/**
 * Audita los metadatos de un cambio de Gerrit para verificar calidad, 
 * formato de commit y cumplimiento de reglas de la suite.
 * @param {Object} cambio - Objeto de cambio proveniente de la API de Gerrit.
 * @returns {boolean} - true si pasa la inspección, false si detecta anomalías.
 */
function auditarLineasAccesibilidad(cambio) {
    console.log("🔍 [Auditoría] Analizando metadatos del cambio...");

    if (!cambio || typeof cambio !== 'object') {
        console.warn("⚠️ [Auditoría] Objeto de cambio inválido o nulo.");
        return false;
    }

    if (cambio.status === 'ABANDONED') {
        console.warn(`⚠️ [Auditoría] El cambio '${cambio.change_id || 'Desconocido'}' está abandonado.`);
        return false;
    }

    if (!cambio.change_id || !cambio.change_id.startsWith('I')) {
        console.warn("❌ [Auditoría] Formato de 'change_id' de Gerrit inválido o ausente.");
        return false;
    }

    if (!cambio.subject || cambio.subject.trim().length < 5) {
        console.warn("❌ [Auditoría] Asunto (subject) del commit demasiado corto o vacío.");
        return false;
    }

    console.log(`✔ [Auditoría] Cambio '${cambio.change_id}' en '${cambio.project || 'General'}' verificado correctamente.`);
    return true; 
}

module.exports = { auditarLineasAccesibilidad };
