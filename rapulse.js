import { exec } from 'child_process';
import { promisify } from 'util';
import https from 'https';

const execAsync = promisify(exec);

const COLOR = {
  reset: "\x1b[0m", green: "\x1b[32m", red: "\x1b[31m",
  cyan: "\x1b[36m", yellow: "\x1b[33m", gray: "\x1b[90m", bold: "\x1b[1m"
};

// Función para peticiones reales a la API
async function obtenerDatosRemotos(host, path) {
  return new Promise((resolve, reject) => {
    https.get(`https://${host}${path}`, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function ejecutarSincronizacion() {
  console.clear();
  console.log(`${COLOR.bold}${COLOR.yellow}=== [ (ra) SINCRO-NODO ACTIVO ] ===${COLOR.reset}\n`);

  try {
    // 1. Escaneo Local
    const { stdout } = await execAsync('git branch --format="%(refname:short)"');
    const ramasLocales = stdout.trim().split('\n');
    console.log(`${COLOR.cyan}[+] Ramas locales detectadas: ${ramasLocales.length}${COLOR.reset}`);

    // 2. Consulta Remota (Usaremos un endpoint de prueba público para validar)
    console.log(`${COLOR.yellow}[+] Consultando estado remoto...${COLOR.reset}`);
    // Aquí integraremos tu host real de Gerrit cuando lo tengas
    const datosRemotos = await obtenerDatosRemotos('jsonplaceholder.typicode.com', '/todos/1');
    
    console.log(`${COLOR.green}✓ Sincronización exitosa con servidor externo.${COLOR.reset}`);
    console.log(`  Datos recibidos: ${datosRemotos.title.slice(0, 20)}...`);

  } catch (error) {
    console.error(`${COLOR.red}[!] Error de red:${COLOR.reset} ${error.message}`);
  }
}

// Bucle de sincronización cada 60s
ejecutarSincronizacion();
setInterval(ejecutarSincronizacion, 60000);
