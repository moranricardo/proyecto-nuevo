import https from 'https';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
    GERRIT_HOST: 'review.lineageos.org',
    ENDPOINT: '/changes/?q=status:open&n=3',
    STATE_FILE: path.join(__dirname, 'state.json')
};

function fetchGerritData(endpoint) {
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
                    let cleanData = data;
                    if (data.startsWith(magicPrefix)) cleanData = data.substring(magicPrefix.length);
                    else if (data.startsWith(")]}'")) cleanData = data.substring(4);
                    resolve(JSON.parse(cleanData));
                } catch (e) { reject(new Error(`Error JSON: ${e.message}`)); }
            });
        }).on('error', (err) => reject(err));
    });
}

function actualizarEstadoEcosistema(gitCambios, gerritItems) {
    const pulso = {
        modulo: 'RaPulse_Core_Dashboard',
        estado: 'OK',
        timestamp: new Date().toISOString(),
        cambios_locales_git: gitCambios,
        cambios_remotos_gerrit: gerritItems
    };
    fs.writeFileSync(CONFIG.STATE_FILE, JSON.stringify(pulso, null, 2));
}

async function ejecutarDashboardHibrido() {
    console.log("========================================");
    console.log("   ☀️  RA PULSE: CEREBRO HÍBRIDO ACTIVO  ");
    console.log("========================================\n");

    console.log("🔍 [LOCAL] Analizando espacio de trabajo Git...");
    let tieneCambiosLocales = false;
    let gitStatusOutput = "";
    
    try {
        gitStatusOutput = execSync('git status --short 2>&1', { stdio: 'pipe' }).toString().trim();
        if (gitStatusOutput && !gitStatusOutput.includes('fatal:')) {
            console.log("⚠️ Cambios detectados sin comitear en Termux:");
            console.log(gitStatusOutput);
            tieneCambiosLocales = true;
        } else {
            console.log("✅ Repositorio local limpio o fuera de un árbol Git. Sincronía estable.");
        }
    } catch (e) {
        console.log("ℹ️ Nota: Entorno local listo para inicializar.");
    }

    console.log("\n📡 [REMOTO] Consultando últimos cambios de LineageOS...");
    try {
        const changes = await fetchGerritData(CONFIG.ENDPOINT);
        
        changes.forEach((change, index) => {
            console.log(`----------------------------------------`);
            console.log(`${index + 1}. Proyecto: ${change.project.split('/').pop()}`);
            console.log(`   Asunto:   ${change.subject}`);
            console.log(`   Estado:   ${change.status} | ID: ${change._number}`);
        });
        console.log(`----------------------------------------`);

        actualizarEstadoEcosistema(tieneCambiosLocales, changes.length);
        console.log("\n💾 [TELEMETRÍA] state.json actualizado con el pulso actual.");

    } catch (error) {
        console.log("❌ Error en conexión remota:", error.message);
    }
}

ejecutarDashboardHibrido();
