// src/mantenimiento.cjs - Lógica de mantenimiento y validación de Integridad (Maat)

/**
 * Valida la estructura e integridad del texto bajo las reglas de Maat.
 * @param {string} texto - Cadena de texto a evaluar.
 * @returns {{ aprobado: boolean, mensaje: string }}
 */
function validarIntegridad(texto) {
  if (typeof texto !== 'string') {
    return {
      aprobado: false,
      mensaje: "Violación: El parámetro de entrada debe ser una cadena de texto."
    };
  }

  const limpio = texto.trim();
  const conteoPreguntas = (limpio.match(/\?/g) || []).length;
  const terminaConPregunta = limpio.endsWith('?');

  const aprobado = (conteoPreguntas === 1 && terminaConPregunta);

  return {
    aprobado,
    mensaje: aprobado 
      ? "Integridad validada." 
      : "Violación: Debe finalizar con UNA ÚNICA PREGUNTA."
  };
}

// Prueba rápida si el script es ejecutado directamente
if (require.main === module) {
  const prueba = validarIntegridad("¿Está el entorno de Maat validado correctamente?");
  console.log("🧪 Prueba directa:", prueba);
}

module.exports = { validarIntegridad };
