import fs from 'fs';

const archivo = process.argv[2];

if (!archivo) {
    console.error("Uso: node verificar.js <nombre-del-archivo>");
    process.exit(1);
}

try {
    const contenido = fs.readFileSync(archivo, 'utf8').trim();

    const conteoPreguntas = (contenido.match(/\?/g) || []).length;
    const terminaConPregunta = contenido.endsWith('?');

    if (conteoPreguntas === 1 && terminaConPregunta) {
        console.log("✅ INTEGRIDAD APROBADA: La lección termina con una única pregunta.");
        process.exit(0);
    } else {
        console.error("❌ ERROR DE INTEGRIDAD: La lección debe finalizar con UNA ÚNICA PREGUNTA.");
        console.error(`Estado actual: ${conteoPreguntas} pregunta(s).`);
        process.exit(1);
    }
} catch (error) {
    console.error(`💥 Error al leer el archivo: ${error.message}`);
    process.exit(1);
}
