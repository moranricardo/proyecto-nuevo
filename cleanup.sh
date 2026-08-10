#!/usr/bin/env bash

echo "🧹 Iniciando rutina de limpieza (Vórtice 818)..."

# 1. Limpiar caché de npm si existe
if command -v npm &> /dev/null; then
    echo "📦 Limpiando caché de npm..."
    npm cache clean --force
fi

# 2. Eliminar node_modules locales si se requiere una limpieza profunda (opcional, comentado por seguridad)
# find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

# 3. Limpiar archivos temporales y cachés del sistema
echo "🗑️ Purgando archivos temporales..."
rm -rf .tmp/ temp/ *.log

# 4. Liberar memoria (TrimCache / Simulado para el flujo toroidal)
echo "⚡ Ejecutando liberación de memoria (TrimCache)..."
sync && echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || echo "ℹ️ Nota: Se requieren permisos de root para vaciar drop_caches (comportamiento normal en Termux sin root)."

echo "✨ ¡Limpieza completada con éxito!"
