/**
 * Orquestador Principal - moranricardo/proyecto-nuevo
 * Diseñado bajo arquitectura ligera para Termux / GitHub Actions
 */

const MODE = process.env.RAPULSE_MODE || process.argv[2] || 'check';

console.log(`[INFO] Iniciando Orquestador en Modo: ${MODE}`);

switch (MODE) {
  case 'check':
    console.log('[DRIVE] Ejecutando verificación de Gerrit...');
    require('./src/gerrit/gerrit-check.cjs');
    break;

  case 'pulse':
    console.log('[DRIVE] Ejecutando puente RA Pulse Bridge...');
    require('./src/rapulse.cjs');
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
