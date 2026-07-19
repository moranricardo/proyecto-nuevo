import { validarIntegridad } from './gerrit/gerrit-check.js';

async function ejecutarPipeline() {
    // Simulamos el contenido que el pipeline está procesando actualmente
    const contenidoLeccion = "Esta es una lección de prueba sobre Git. ¿Entiendes el concepto?";
    
    console.log("Iniciando validación de integridad...");
    
    const resultado = validarIntegridad(contenidoLeccion);
    
    if (!resultado.aprobado) {
        console.error("Error de Integridad: " + resultado.mensaje);
        process.exit(1); // Esto fuerza al workflow de GitHub a marcar "Fallido" para que lo veas
    }
    
    console.log("Integridad validada con éxito. Pipeline continúa.");
    process.exit(0); // Éxito
}

ejecutarPipeline().catch(err => {
    console.error(err);
    process.exit(1);
});
