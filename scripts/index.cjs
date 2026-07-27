const https = require('https');
const { enviarAlerta } = require('../src/notification_gateway.js');

// Configuración de tu servidor Gerrit (ejemplo)
const GERRIT_URL = 'android-review.googlesource.com';

async function auditarGerrit() {
    console.log("🔍 Ra Pulse: Consultando el estado de la balanza en Gerrit...");
    
    // Petición a la API (añadimos q=status:open para ver cambios recientes)
    https.get(`https://${GERRIT_URL}/changes/?q=status:open`, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', async () => {
            // Gerrit añade el prefijo )]}'\n para evitar XSS, hay que quitarlo
            const json = JSON.parse(data.replace(")]}'\n", ""));
            
            // Lógica: Si hay cambios muy recientes o inseguros, disparamos
            if (json.length > 0) {
                console.log(`⚠️ Se encontraron ${json.length} cambios abiertos.`);
                await enviarAlerta("🚨 Ra Pulse: Alerta Gerrit", `Se han detectado ${json.length} cambios abiertos en el repositorio.`);
            } else {
                console.log("✅ Sistema en equilibrio.");
            }
        });
    }).on('error', (e) => console.error("Error en la conexión:", e));
}

auditarGerrit();
