// Orquestador Ra Pulse - Cliente de Gerrit Purificado
export async function obtenerCambiosGerrit(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`HTTP Error: ${respuesta.status} ${respuesta.statusText}`);
        }
        
        let texto = await respuesta.text();
        const XSS_PREFIX = ")]}'";
        
        // Limpieza quirúrgica eliminando espacios y saltos de línea iniciales
        texto = texto.trim();
        if (texto.startsWith(XSS_PREFIX)) {
            texto = texto.slice(XSS_PREFIX.length).trim();
        }

        return JSON.parse(texto);
    } catch (error) {
        throw new Error(`[Gerrit Client] Error en el flujo del Duat: ${error.message}`);
    }
}
