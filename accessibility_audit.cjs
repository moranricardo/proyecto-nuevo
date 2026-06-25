const fs = require('fs');

function auditarLineasAccesibilidad(cambio) {
    console.log(`🧬 Analizando líneas del túnel de accesibilidad para: ${cambio.subject || 'Cambio sin título'}`);
    
    // Filtro estricto: Palabras clave que alteran el bypass de entrada
    const patronesCriticos = [
        /AccessibilityInputFilter/,
        /inputflinger/,
        /policyFlags\s*&/,
        /FLAG_INJECTED_FROM_ACCESSIBILITY/
    ];

    const stringCambio = JSON.stringify(cambio);
    let esTúnelCritico = patronesCriticos.some(patron => patron.test(stringCambio));

    if (esTúnelCritico) {
        console.log("⚠️ ALERTA: El parche modifica el túnel de interruptores. Verificando protección Debounce...");
        
        // Anti-Bucles: Si modifica el túnel pero no incluye protección de tiempo, rechazar
        const tieneProteccionDebounce = /timeout|debounce|delay|lastEventTime/i.test(stringCambio);
        if (!tieneProteccionDebounce) {
            console.error("🚨 ERROR: El código altera el flujo de entrada sin mitigación de rebote (Riesgo de bucle infinito).");
            return false;
        }
        console.log("✅ Protección de rebote/debounce detectada en las líneas del túnel.");
    } else {
        console.log("🔹 El cambio no compromete los componentes críticos de entrada.");
    }
    return true;
}

// Exportamos para el puente principal
module.exports = { auditarLineasAccesibilidad };
