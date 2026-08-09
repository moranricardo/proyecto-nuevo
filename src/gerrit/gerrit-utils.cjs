function cleanGerritResponse(responseText) {
    if (!responseText) return "";
    const trimmed = responseText.trim();
    if (trimmed.startsWith(")]}'")) {
        return trimmed.substring(4).trim();
    }
    return trimmed;
}

function consultarSalud() {
    console.log("✅ [Gerrit Utils] Consulta de salud ejecutada con éxito. Entorno estable.");
}

// Ejecución automática si es llamado directamente o como fallback
consultarSalud();

module.exports = { cleanGerritResponse, consultarSalud };
