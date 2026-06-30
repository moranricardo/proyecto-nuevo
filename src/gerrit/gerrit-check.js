import https from 'https';

const GERRIT_HOST = 'review.lineageos.org';
// Agregamos o=LABELS para traer la matriz de votaciones de los revisores
const QUERY_PARAMS = 'q=status:open&n=5&o=LABELS';
const ENDPOINT = `https://${GERRIT_HOST}/changes/?${QUERY_PARAMS}`;

const OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Termux-Gerrit-Monitor/3.0'
  }
};

async function main() {
  console.log("🛠️ --- ENTORNO: AUDITORÍA DE ETIQUETAS EN GERRIT --- 🛠️\n");
  console.log(`⏳ Conectando a: ${GERRIT_HOST}...`);

  https.get(ENDPOINT, OPTIONS, (res) => {
    let rawData = '';

    res.on('data', (chunk) => { rawData += chunk; });

    res.on('end', () => {
      try {
        // Limpieza robusta del prefijo de seguridad anti-XSS
        const cleanedData = rawData.replace(/^[\s\S]*?\]\}'\s*/, '');
        const changes = JSON.parse(cleanedData);

        if (!Array.isArray(changes)) {
          console.log("\n❌ Estructura de respuesta inválida.");
          return;
        }

        console.log(`\n🚀 Analizando las etiquetas de los últimos ${changes.length} cambios:\n`);
        
        changes.forEach(change => {
          console.log(`- [${change._number}] ${change.subject}`);
          
          // Extracción y análisis de etiquetas de revisión
          const codeReview = change.labels?.['Code-Review']?.approved ? 'CR +2 ✅' : 
                             change.labels?.['Code-Review']?.rejected ? 'CR -2 ❌' : 'CR ⏳';
                             
          const verified = change.labels?.['Verified']?.approved ? 'Verified +1 ✅' : 
                           change.labels?.['Verified']?.rejected ? 'Verified -1 ❌' : 'Verified ⏳';

          console.log(`  Estado: [${codeReview}] | [${verified}]`);
          console.log(`  Proyecto: ${change.project}`);
          console.log(`  URL: https://${GERRIT_HOST}/c/${change._number}\n`);
        });

      } catch (error) {
        console.error("\n❌ Error crítico de parseo en el entorno:", error.message);
      }
    });

  }).on('error', (err) => {
    console.error("\n❌ Error de red:", err.message);
  });
}

main();
