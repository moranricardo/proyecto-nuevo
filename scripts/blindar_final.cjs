// scripts/blindar_final.cjs (Ejecutable del flujo final de blindaje Maat)
const { blindarRepositorioEspecifico } = require('./blindar_especifico.cjs');

/**
 * Punto de entrada final para ejecutar el blindaje del proyecto.
 */
function ejecutarBlindajeFinal() {
  console.log('🛡️ [Maat] Iniciando proceso de blindaje final del entorno...');
  
  const owner = process.env.REPO_OWNER || 'moranricardo';
  const repo = process.env.REPO_NAME || 'proyecto-nuevo';

  blindarRepositorioEspecifico(owner, repo);
}

if (require.main === module) {
  ejecutarBlindajeFinal();
}

module.exports = { ejecutarBlindajeFinal };
