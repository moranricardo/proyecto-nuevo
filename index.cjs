/**
 * Orquestador Principal - moranricardo/proyecto-nuevo
 * Diseñado bajo arquitectura ligera para Termux / GitHub Actions
 */

// Leer el contexto de ejecución (por variable de entorno o argumento)
const MODE = process.env.RAPULSE_MODE || process.argv[2] || 'check';

console.log(`[INFO] Iniciando Orquestador en Modo: ${MODE}`);

switch (MODE) {
  case 'check':
    console.log('[DRIVE] Ejecutando verificación de Gerrit...');
    require('./src/gerrit/gerrit-check.js');
    break;

  case 'pulse':
    console.log('[DRIVE] Ejecutando puente RA Pulse Bridge...');
    require('./src/rapulse.js');
    break;

  case 'client':
    console.log('[DRIVE] Iniciando cliente nativo Gerrit...');
    require('./src/gerrit/gerrit-client.js');
    break;

  default:
    console.warn(`[WARN] Modo '${MODE}' no reconocido. Ejecutando consulta de salud por defecto...`);
    require('./src/gerrit/gerrit-utils.js');
    break;
}
