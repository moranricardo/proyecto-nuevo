const settings = require('../../config/settings.json');

async function obtenerCambiosGerrit(urlPersonalizada) {
    // Usar URL pasada por parámetro o tomar la de settings.json (soportando ambas estructuras)
    const baseUrl = settings.gerrit?.url || settings.gerrit_url;
    const project = settings.gerrit?.project || settings.project;
    const limit = settings.gerrit?.query_limit || 10;
    
    const url = urlPersonalizada || `${baseUrl}/changes/?q=project:${project}&n=${limit}`;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`HTTP Error: ${respuesta.status} ${respuesta.statusText}`);
        }

        let texto = await respuesta.text();
        const XSS_PREFIX = ")]}'";

        texto = texto.trim();
        if (texto.startsWith(XSS_PREFIX)) {
            texto = texto.slice(XSS_PREFIX.length).trim();
        }

        return JSON.parse(texto);
    } catch (error) {
        throw new Error(`[Gerrit Client] Error en el flujo del Duat: ${error.message}`);
    }
}

// Si se ejecuta directamente desde consola
if (require.main === module) {
    obtenerCambiosGerrit()
        .then(data => console.log("[Gerrit Client] Respuesta recibida:", data))
        .catch(err => console.error(err.message));
}

module.exports = { obtenerCambiosGerrit };
