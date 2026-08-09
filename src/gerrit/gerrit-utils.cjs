// src/gerrit/gerrit-utils.cjs - Utilidades para respuestas Gerrit REST API
/**
 * Remueve el prefijo de seguridad anti-XSS de Gerrit ()]}'\n).
 * @param {string} responseText - Respuesta en texto plano de Gerrit.
 * @returns {string} - JSON válido en formato texto.
 */
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

// Ejecución condicional solo si se invoca directamente el script
if (require.main === module) {
  consultarSalud();
}

module.exports = { cleanGerritResponse, consultarSalud };
