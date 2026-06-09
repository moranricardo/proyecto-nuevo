import { execSync } from 'child_process';
import { cleanGerritResponse } from './gerrit-utils.js';

async function mostrarDashboard() {
    console.clear();
    console.log("========================================");
    console.log("   DASHBOARD DE MONITOREO DE PROYECTO   ");
    console.log("========================================\n");

    // 1. Escaneo Local (Git)
    console.log("--- ESTADO LOCAL (GIT) ---");
    try {
        const gitStatus = execSync('git status --short').toString();
        console.log(gitStatus || "Todo limpio (No hay cambios locales)");
    } catch (e) {
        console.log("Error: No parece ser un repositorio Git.");
    }

    // 2. Escaneo Remoto (Gerrit)
    console.log("\n--- ÚLTIMOS CAMBIOS EN GERRIT (LINEAGEOS) ---");
    const url = 'https://review.lineageos.org/changes/?q=status:open';
    try {
        const response = await fetch(url);
        const rawText = await response.text();
        const cleanData = cleanGerritResponse(rawText);
        const changes = JSON.parse(cleanData);

        changes.slice(0, 3).forEach(change => {
            console.log(`Proyecto: ${change.project.split('/').pop()}`);
            console.log(`Cambio:   ${change.subject}`);
            console.log(`Estado:   ${change.status} | ID: ${change._number}`);
            console.log('----------------------------------------');
        });
    } catch (error) {
        console.log("Error al consultar Gerrit:", error.message);
    }
}

mostrarDashboard();
