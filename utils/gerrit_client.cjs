// utils/gerrit_client.cjs - Cliente API Gerrit Moderno
let cleanGerritResponse;
try {
  ({ cleanGerritResponse } = require('../src/gerrit/gerrit-utils.cjs'));
} catch (e) {
  cleanGerritResponse = null;
}

/**
 * Consulta cambios abiertos en la API REST de Gerrit.
 * @param {string} [url] - URL base del servidor Gerrit.
 * @param {string} [project] - Nombre del proyecto en Gerrit.
 * @returns {Promise<Object>}
 */
async function fetchChanges(
  url = 'https://android-review.googlesource.com',
  project = 'platform/frameworks/base'
) {
  const endpoint = `${url}/changes/?q=project:${project}+status:open`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const rawText = await response.text();
    const cleanText = typeof cleanGerritResponse === 'function'
      ? cleanGerritResponse(rawText)
      : rawText.replace(/^\)\]\}'\n/, '');

    return JSON.parse(cleanText);
  } catch (error) {
    throw new Error(`[Gerrit Client Utils] Fallo en la consulta: ${error.message}`);
  }
}

// Bloque de prueba directa desde CLI
if (require.main === module) {
  fetchChanges()
    .then(data => console.log("✔ [Utils Client] Registros obtenidos exitosamente:", data.length))
    .catch(err => console.error("❌ Error en prueba:", err.message));
}

module.exports = { fetchChanges };
