import { exec } from 'child_process';
import { promisify } from 'util';
import https from 'https';
import { parseGerritResponse } from './gerrit-utils.js';

const execAsync = promisify(exec);

const COLOR = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  bold: "\x1b[1m"
};

// Función corregida y adaptada para usar nuestro limpiador de Gerrit
async function obtenerDatosRemotos(host, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      path: path,
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    };

    https.get(options, (res) => {
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', async () => {
        try {
          // Creamos un objeto de respuesta simulado para reutilizar nuestra función limpia
          const fakeResponse = { text: async () => rawData };
          const cleanJson = await parseGerritResponse(fakeResponse);
          resolve(cleanJson);
        } catch (e) {
          reject(new Error(`Error al parsear JSON de Gerrit: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function ejecutarSincronizacion() {
  console.clear();
  console.log(`${COLOR.bold}${COLOR.cyan}=== Iniciando Monitor RaPulse ===${COLOR.reset}\n`);
  
  try {
    // 1. Escaneo Local
    console.log(`${COLOR.yellow}[1] Ejecutando escaneo local...${COLOR.reset}`);
    const { stdout } = await execAsync('git status --porcelain');
    if (stdout) {
      console.log(`${COLOR.green}Cambios locales detectados:${COLOR.reset}\n${stdout}`);
    } else {
      console.log(`${COLOR.green}Árbol de trabajo limpio.${COLOR.reset}`);
    }
  } catch (error) {
    console.error(`${COLOR.reset}Error en la sincronización:`, error);
  }
}

// Ejecutar el monitor
ejecutarSincronizacion();
