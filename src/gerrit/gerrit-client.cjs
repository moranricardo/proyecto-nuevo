// src/gerrit/gerrit-client.cjs - Cliente API Gerrit con CommonJS
const { cleanGerritResponse } = require('./gerrit-utils.cjs');

let settings = {};
try {
  settings = require('../../config/settings.json');
} catch (e) {
  // Fallback si no existe el JSON de configuración local
  settings = {};
}

/**
 * Consulta cambios en la API REST de Gerrit.
 * @param {string} [urlPersonalizada] - URL alternativa para la petición.
 * @returns {Promise<Object>}
 */
async function obtenerCambiosGerrit(urlPersonalizada) {
  const baseUrl = process.env.GERRIT_URL || settings.gerrit?.url || settings.gerrit_url || 'https://android-review.googlesource.com';
  const project = process.env.GERRIT_PROJECT || settings.gerrit?.project || settings.project || 'platform/frameworks/base';
  const limit = settings.gerrit?.query_limit || 10;

  const url = urlPersonalizada || `${baseUrl}/changes/?q=project:${project}&n=${limit}`;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`HTTP Error: ${respuesta.status} ${respuesta.statusText}`);
    }

    const textoBruto = await respuesta.text();
    const textoLimpio = cleanGerritResponse(textoBruto);

    return JSON.parse(textoLimpio);
  } catch (error) {
    throw new Error(`[Gerrit Client] Error en el flujo del Duat: ${error.message}`);
  }
}

if (require.main === module) {
  obtenerCambiosGerrit()
    .then(data => console.log("✔ [Gerrit Client] Respuesta recibida exitosamente. Registros:", data.length))
    .catch(err => console.error("❌", err.message));
}

module.exports = { obtenerCambiosGerrit };
