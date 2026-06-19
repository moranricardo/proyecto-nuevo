// index.js - El latido inicial de Ra Pulse (Versión ESM)
import fs from 'fs'; // Cambiado: require -> import

function parseGerritResponse(rawText) {
    // La regla de oro: Conjurar el prefijo anti-XSS antes del parseo
    const antiXssPrefix = ")]}'\n";
    let cleanText = rawText;
    
    if (rawText.startsWith(antiXssPrefix)) {
        cleanText = rawText.slice(antiXssPrefix.length);
    }
    
    return JSON.parse(cleanText);
}

// Simulación de prueba local para validar el comportamiento en Termux
try {
    const simulacionGerrit = ")]}'\n" + JSON.stringify({ status: "open", project: "Ra-Pulse-Radio" });
    console.log("=== Datos crudos del Duat ===");
    console.log(simulacionGerrit);
    
    const datosLimpios = parseGerritResponse(simulacionGerrit);
    console.log("\n=== Maat Restablecido (JSON Saneado) ===");
    console.log(datosLimpios);
} catch (error) {
    console.error("Apofis ha corrompido el flujo:", error.message);
}
