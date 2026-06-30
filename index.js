import https from 'https';
import fs from 'fs/promises';

// 1. Configuración central alineada al Toroide
const CONFIG = {
  gerrit: {
    host: 'chromium-review.googlesource.com',
    port: 443,
    headers: {
      'User-Agent': 'anonymous (chrome-mobile-es-419)',
      'Accept': 'application/json'
    }
  },
  targets: ['3194', '3193', '3192'],
  telemetryFile: './state.json'
};

/**
 * 3. Purifica la respuesta de Gerrit eliminando el prefijo anti-XSS
 */
function sanitizeGerritResponse(rawData) {
  const MAGIC_PREFIX = ")]}'\n";
  let cleanData = rawData;
  if (rawData.startsWith(MAGIC_PREFIX)) {
    cleanData = rawData.slice(MAGIC_PREFIX.length);
  } else if (rawData.trim().startsWith(")]}'")) {
    cleanData = rawData.replace(/^\s*\)\]\}\'\s*/, '');
  }
  return JSON.parse(cleanData);
}

/**
 * Realiza la petición GET purificada
 */
function requestGerrit(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CONFIG.gerrit.host,
      port: CONFIG.gerrit.port,
      path: path,
      method: 'GET',
      headers: CONFIG.gerrit.headers
    };

    const req = https.request(options, (res) => {
      let rawData = '';
      res.on('data', (c) => rawData += c);
      res.on('end', () => {
        try { resolve(sanitizeGerritResponse(rawData)); }
        catch (e) { reject(new Error('Fallo al purificar: ' + e.message)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

/**
 * Motor Orquestador de Auditoría
 */
async function corePulse() {
  console.log('🔮 Iniciando auditoría de etiquetas en el inframundo...');
  const auditResults = {};

  for (const id of CONFIG.targets) {
    try {
      const reviewers = await requestGerrit(`/changes/${id}/reviewers`);
      // Lógica de auditoría: ¿Alguien votó +2?
      const isApproved = reviewers.some(r => r.approvals?.['Code-Review'] == 2);
      
      auditResults[id] = {
        status: isApproved ? 'VALIDADO_APROBADO' : 'PENDIENTE_VALIDACION',
        timestamp: new Date().toISOString()
      };
      
      console.log(`✅ Cambio ${id}: ${auditResults[id].status}`);
    } catch (err) {
      console.error(`❌ Error auditando ${id}:`, err.message);
      auditResults[id] = { status: 'ERROR', error: err.message };
    }
  }

  // Escribir el nuevo estado del Maat
  await fs.writeFile(CONFIG.telemetryFile, JSON.stringify(auditResults, null, 2));
  console.log('🏁 Proceso finalizado. El pulso ha sido registrado en state.json.');
}

// Inicialización del Vórtice
corePulse();
