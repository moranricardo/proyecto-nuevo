// Lógica de validación de Integridad (Maat)
export function validarIntegridad(texto) {
    const conteoPreguntas = (texto.match(/\?/g) || []).length;
    const terminaConPregunta = texto.trim().endsWith('?');
    
    // La regla: exactamente una pregunta y que esté al final
    const aprobado = (conteoPreguntas === 1 && terminaConPregunta);
    
    return {
        aprobado,
        mensaje: aprobado ? "Integridad validada" : "Violación: Debe finalizar con UNA ÚNICA PREGUNTA."
    };
}
