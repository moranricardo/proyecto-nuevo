import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURACIÓN CON AUDITORÍA DE LABELS ACTIVADA
const CONFIG = {
    GERRIT_HOST: 'review.lineageos.org',
    // Buscamos parches abiertos en el codec e inyectamos &o=LABELS para leer las votaciones
    ENDPOINT: '/changes/?q=project:LineageOS/android_external_v4l2_codec2+status:open&n=5&o=LABELS',
    STATE_FILE: path.join(__dirname, 'state.json')
};

function consultarGerrit(endpoint) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: CONFIG.GERRIT_HOST,
            path: endpoint,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'es-419,es;q=0.9,en;q=0.8',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
                try {
                    const magicPrefix = ")]}'\n";
                    let cleanData = data.startsWith(magicPrefix) ? data.substring(magicPrefix.length) : data;
                    resolve(JSON.parse(cleanData));
                } catch (e) { reject(new Error(`JSON Error: ${e.message}`)); }
            });
        }).on('error', (err) => reject(err));
    });
}

function registrarEstadoTelemetria(ultimoCambioId, totalCambios) {
    const pulso = {
        origen: "RaPulse_Master_Index",
        estado: "Sincronizado",
        timestamp: new Date().toISOString(),
        ultimo_change_id: ultimoCambioId || null,
        total_monitoreados: totalCambios
    };
    fs.writeFileSync(CONFIG.STATE_FILE, JSON.stringify(pulso, null, 2));
}

async function iniciarCicloRa() {
    const horaActual = new Date().toLocaleTimeString();
    console.log(`☀️ [${horaActual}] Consultando Auditoría en LineageOS...`);

    try {
        const cambios = await consultarGerrit(CONFIG.ENDPOINT);
        if (!cambios || cambios.length === 0) {
            console.log("✅ No hay cambios abiertos para este filtro.");
            return;
        }

        console.log(`✅ Conexión exitosa. Monitoreando ${cambios.length} cambios activos:\n`);

        cambios.forEach((cambio, index) => {
            console.log(`   ${index + 1}. [${cambio.project.split('/').pop()}]`);
            console.log(`      Asunto:    ${cambio.subject}`);
            
            // Análisis sintáctico del sistema de votación de Gerrit
            const cr = cambio.labels && cambio.labels['Code-Review'];
            let votoValue = '⏳ Sin votos (Pendiente de revisión)';
            
            if (cr) {
                if (cr.approved) votoValue = '👑 +2 (Aprobación Máxima - Listo para Fusionar)';
                else if (cr.recommended) votoValue = '👍 +1 (Recomendado / Voto Positivo)';
                else if (cr.disliked) votoValue = '⚠️ -1 (Falta refactorizar / Cambios sugeridos)';
                else if (cr.rejected) votoValue = '❌ -2 (Bloqueado por un revisor)';
            }

            console.log(`      Auditoría: ${votoValue}`);
            console.log(`      URL:       https://review.lineageos.org/c/${cambio._number}\n`);
        });

        registrarEstadoTelemetria(cambios[0].change_id, cambios.length);
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
}

iniciarCicloRa();
