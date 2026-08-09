// Lógica de validación de Integridad (Maat)
function validarIntegridad(texto) {
    const conteoPreguntas = (texto.match(/\?/g) || []).length;
    const terminaConPregunta = texto.trim().endsWith('?');

    const aprobado = (conteoPreguntas === 1 && terminaConPregunta);

    return {
        aprobado,
        mensaje: aprobado ? "Integridad validada" : "Violación: Debe finalizar con UNA ÚNICA PREGUNTA."
    };
}

module.exports = { validarIntegridad };
