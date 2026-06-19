import https from 'https';

/**
 * CONFIGURACIÓN SOBRE CÓDIGO (Arquitectura Centro y Radios)
 * Centraliza los parámetros para escalar el script sin alterar la lógica de negocio.
 */
const CONFIG = {
    gerrit: {
        baseUrl: 'https://android-review.googlesource.com', // Cambiar por tu host de Gerrit objetivo
        endpoint: '/changes/?q=status:open&n=5',          // Consulta optimizada para lectura
        antiXssPrefix: ")]}'\n"
    },
    telemetry: {
        stateFile: './state.json'
    }
};

/**
 * SANEAR RESPUESTA DE GERRIT
 * Elimina el prefijo anti-XSS para evitar que JSON.parse() colapse en el Duat.
 */
function parseGerritResponse(rawText) {
    let cleanText = rawText;
    if (rawText.startsWith(CONFIG.gerrit.antiXssPrefix)) {
        cleanText = rawText.slice(CONFIG.gerrit.antiXssPrefix.length);
    }
    return JSON.parse(cleanText);
}

/**
 * CONSUMO OPTIMIZADO DE LA API REST DE GERRIT
 * Implementa manejo de errores (Apofis) para garantizar la resiliencia del pipeline.
 */
function fetchGerritChanges() {
    const targetUrl = `${CONFIG.gerrit.baseUrl}${CONFIG.gerrit.endpoint}`;
    
    console.log(`[PULSO] Iniciando conexión con las puertas de Gerrit: ${targetUrl}`);

    https.get(targetUrl, (res) => {
        let rawData = '';

        // Escuchar el flujo de datos entrante
        res.on('data', (chunk) => { rawData += chunk; });

        // Procesar la respuesta completa
        res.on('end', () => {
            try {
                if (res.statusCode !== 200) {
                    throw new Error(`Código de estado inesperado en el Duat: ${res.statusCode}`);
                }

                const changes = parseGerritResponse(rawData);
                
                console.log("\n=== [MAAT] Sincronización Exitosa (Últimos Cambios Abiertos) ===");
                changes.forEach((change) => {
                    console.log(`- [${change._number}] ${change.subject} (Por: ${change.owner.name})`);
                    console.log(`  Proyecto: ${change.project} | Estado: ${change.status}`);
                    console.log(`  URL: ${CONFIG.gerrit.baseUrl}/c/${change._number}\n`);
                });

                // Aquí se dispararía la actualización a state.json para la telemetría de estado

            } catch (error) {
                console.error("\n[APOFIS DETECTADO] Error al procesar los datos de Gerrit:", error.message);
            }
        });

    }).on('error', (error) => {
        console.error("\n[FALLO DE RED] Error de conexión en el Inframundo:", error.message);
    });
}

// Ejecución del Latido Inicial
fetchGerritChanges();
