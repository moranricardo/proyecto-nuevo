import { validarIntegridad } from './gerrit/gerrit-check.js';

// Supongamos que esta es tu función principal de procesamiento
async function procesarPipeline(contenidoLeccion) {
    const resultado = validarIntegridad(contenidoLeccion);
    
    if (!resultado.aprobado) {
        throw new Error(resultado.mensaje);
    }
    
    console.log("Integridad validada con éxito.");
    // Aquí iría el resto de tu lógica de guardado...
}
