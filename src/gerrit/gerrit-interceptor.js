import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const PORT = 8080;
const STATE_FILE = path.join(process.cwd(), 'state.json');
const GERRIT_ANTI_XSS = ")]}'\n";

async function obtenerEstadoLocal() {
  try {
    const data = await fs.readFile(STATE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { cambios_interceptados: [], ultimo_sync: null };
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'GET' && req.url.startsWith('/changes/')) {
    console.log(`[Gerrit-Interceptor] Capturando petición local: ${req.url}`);
    try {
      const estado = await obtenerEstadoLocal();
      const respuestaPayload = {
        instancia: "Termux-Local-Sandbox",
        timestamp: Date.now(),
        data: estado.cambios_interceptados
      };
      res.writeHead(200);
      res.end(`${GERRIT_ANTI_XSS}${JSON.stringify(respuestaPayload)}`);
      return;
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Fallo en la persistencia del interceptor local' }));
      return;
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Ruta no mapeada en el middleware local' }));
});

server.listen(PORT, () => {
  console.log(`[Sandbox] Interceptor de Gerrit activo en http://localhost:${PORT}`);
});
