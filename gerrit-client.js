// Contenido de gerrit-client.js
export async function obtenerCambiosGerrit(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error('Error en la petición');
        const texto = await respuesta.text();
        const datosLimpios = texto.replace(")]}'", "");
        return JSON.parse(datosLimpios);
    } catch (error) {
        throw new Error(`Error al procesar Gerrit: ${error.message}`);
    }
}
