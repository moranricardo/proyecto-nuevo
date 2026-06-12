import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas nativas en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. CONFIGURACIÓN CENTRALIZADA CON FILTRO AVANZADO MULTIMEDIA
const CONFIG = {
    GERRIT_HOST: 'review.lineageos.org',
    ENDPOINT: '/changes/?q=project:LineageOS/android_external_v4l2_codec2+status:open&n=5',
    STATE_FILE: path.join(__dirname, 'state.json')
};

/**
 * Motor de red asíncrono optimizado con huella digital móvil segura (Chrome-mobile-es-419)
 */
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
                if (res.statusCode !== 200) {
                    return reject(new Error(`Error de servidor remoto: HTTP ${res.statusCode}`));
                }
                try {
                    // Sanitización obligatoria del prefijo mágico de Gerrit para evitar quiebres de JSON
                    const magicPrefix = ")]}'\n";
                    let cleanData = data;
                    if (data.startsWith(magicPrefix)) {
                        cleanData = data.substring(magicPrefix.length);
                    } else if (data.startsWith(")]}'")) {
                        cleanData = data.substring(4);
                    }
                    resolve(JSON.parse(cleanData));
                } catch (e) {
                    reject(new Error(`Fallo en el parseo estructural del JSON: ${e.message}`));
                }
            });
        }).on('error', (err) => reject(err));
    });
}

/**
 * Guarda el latido de la telemetría local en el archivo de estado
 */
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

/**
 * Flujo Principal Orquestador
 */
async function iniciarCicloRa() {
    const horaActual = new Date().toLocaleTimeString();
    console.log(`☀️ [${horaActual}] Consultando LineageOS (Filtro v4l2_codec2)...`);

    try {
        const cambios = await consultarGerrit(CONFIG.ENDPOINT);

        if (!cambios || cambios.length === 0) {
            console.log("✅ No hay cambios abiertos actualmente para este filtro en LineageOS.");
            registrarEstadoTelemetria(null, 0);
            return;
        }

        console.log(`✅ Conexión exitosa. Mostrando los ${cambios.length} cambios más recientes:\n`);

        cambios.forEach((cambio, index) => {
            console.log(`   ${index + 1}. [${cambio.project.split('/').pop()}]`);
            console.log(`      Asunto: ${cambio.subject}`);
            console.log(`      Creado por: ${cambio.owner ? (cambio.owner.name || 'Anónimo') : 'Anónimo'}`);
            console.log(`      URL: https://review.lineageos.org/c/${cambio._number}\n`);
        });

        const primerCambio = cambios[0];
        registrarEstadoTelemetria(primerCambio.change_id, cambios.length);

    } catch (error) {
        console.log(`❌ Error crítico en el ciclo activo: ${error.message}`);
    }
}

iniciarCicloRa();
