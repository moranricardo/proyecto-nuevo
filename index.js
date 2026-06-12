import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para emular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. CONFIGURACIÓN CENTRALIZADA
const CONFIG = {
    GERRIT_HOST: 'review.lineageos.org',
    ENDPOINT: '/changes/?q=status:open&n=5',
    STATE_FILE: path.join(__dirname, 'state.json')
};

/**
 * 2. TELEMETRÍA: Guarda el Pulso del Sistema en el Almacenamiento Local
 */
function reportarPulso(modulo, estado, detalles = {}) {
    const pulso = {
        modulo,
        estado,
        timestamp: new Date().toISOString(),
        ...detalles
    };
    try {
        fs.writeFileSync(CONFIG.STATE_FILE, JSON.stringify(pulso, null, 2));
    } catch (error) {
        console.error(`[⚠️ Error de Telemetría]: No se pudo escribir state.json:`, error.message);
    }
}

/**
 * 3. MOTOR HTTP: Lógica basada en Promesas (Purificación Avanzada)
 */
function fetchGerritData(endpoint) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: CONFIG.GERRIT_HOST,
            path: endpoint,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Ra-Pulse-Termux-Monitor/2.0'
            }
        };

        https.get(options, (res) => {
            let data = '';

            res.on('data', (chunk) => { data += chunk; });

            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return reject(new Error(`HTTP Error ${res.statusCode}`));
                }

                try {
                    const magicPrefix = ")]}'\n";
                    let cleanData = data;
                    
                    // Doble validación blindada contra Apofis
                    if (data.startsWith(magicPrefix)) {
                        cleanData = data.substring(magicPrefix.length);
                    } else if (data.startsWith(")]}'")) {
                        cleanData = data.substring(4);
                    }

                    resolve(JSON.parse(cleanData));
                } catch (error) {
                    reject(new Error(`Fallo en parseo JSON: ${error.message}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * 4. ORQUESTADOR ASÍNCRONO PRINCIPAL
 */
async function main() {
    console.log(`[${new Date().toLocaleTimeString()}] ☀️ Iniciando ciclo de Ra: Consultando LineageOS...`);

    try {
        const changes = await fetchGerritData(CONFIG.ENDPOINT);
        
        if (changes.length === 0) {
            console.log("Despejado. No hay cambios abiertos.");
            reportarPulso('Gerrit_Open', 'OK', { mensaje: 'Sin cambios activos' });
            return;
        }

        console.log(`✅ Conexión exitosa. Mostrando los ${changes.length} cambios más recientes:\n`);

        // Tu formato estético de salida en pantalla
        changes.forEach((change, index) => {
            console.log(`${index + 1}. [${change.project}]`);
            console.log(`   Asunto: ${change.subject}`);
            console.log(`   Creado por: ${change.owner.name || 'Anónimo'}`);
            console.log(`   URL: https://${CONFIG.GERRIT_HOST}/c/${change._number}\n`);
        });

        // Guardar persistencia exitosa en el mapa de archivos
        reportarPulso('Gerrit_Open', 'OK', {
            items: changes.length,
            latest_change_id: changes[0].change_id,
            latest_project: changes[0].project
        });

    } catch (error) {
        console.error(`❌ Ocurrió un error en el flujo principal:`, error.message);
        reportarPulso('Gerrit_Open', 'ERROR', { mensaje: error.message });
    }
}

// Arrancar el latido
main();
