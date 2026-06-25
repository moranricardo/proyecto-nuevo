import { writeFile } from 'fs/promises';

// Simulador de Endpoint de Gerrit con filtro anti-XSS y Cambios Abiertos
async function probarConexionGerrit() {
    console.log("=== INICIANDO VALIDACIÓN DE ENTORNO LOCAL ===");
    console.log("Modo de Ejecución: ECMAScript Modules (ESM)");
    
    // Simulación del payload crudo que retorna la API de Gerrit
    const respuestaCrudaGerrit = ")]}'\n" + JSON.stringify([
        {
            "id": "Iabc1239876543210ffffffffffffffffffffffff",
            "project": "platform/frameworks/base",
            "branch": "main",
            "change_id": "Iabc1239876543210",
            "subject": "Fix: Optimización de ciclos I/O en persistencia local",
            "status": "NEW", 
            "created": "2026-06-13 11:30:00.000000000",
            "updated": "2026-06-13 11:31:00.000000000",
            "labels": {
                "Code-Review": { "approved": {} }
            }
        }
    ], null, 2);

    try {
        const prefijoSeguridad = ")]}'\n";
        let datosLimpios = respuestaCrudaGerrit;

        if (respuestaCrudaGerrit.startsWith(prefijoSeguridad)) {
            console.log("✔ Prefijo anti-XSS detectado y aislado correctamente.");
            datosLimpios = respuestaCrudaGerrit.slice(prefijoSeguridad.length);
        }

        const cambios = JSON.parse(datosLimpios);
        console.log(`✔ JSON parseado con éxito. Cambios abiertos detectados: ${cambios.length}`);
        
        console.log("\nEstructura del Cambio:");
        console.log(`- ID del Cambio: ${cambios[0].change_id}`);
        console.log(`- Proyecto: ${cambios[0].project}`);
        console.log(`- Estado en Gerrit: ${cambios[0].status} (Abierto)`);

        await writeFile('sandbox-state.json', JSON.stringify({ status: "success", timestamp: Date.now() }, null, 2));
        console.log("\n✔ Verificación finalizada. Archivo 'sandbox-state.json' creado.");

    } catch (error) {
        console.error("❌ Error de sintaxis o parseo en el entorno:", error.message);
    }
}

probarConexionGerrit();
