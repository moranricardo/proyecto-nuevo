#!/usr/bin/env bash

echo "🌀 Iniciando rutina de limpieza..."

# 1. Limpiar caché de npm si existe
if command -v npm &> /dev/null; then
    echo "📦 Limpiando caché de npm..."
    npm cache clean --force
fi

# 2. Limpiar archivos temporales y cachés
echo "🗑️ Purgando archivos temporales..."
rm -rf .tmp/ temp/ *.log

# 3. Liberar memoria
echo "⚡ Ejecutando liberación de memoria (TrimCache)..."
sync && echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || echo "ℹ️ Nota: Se requieren permisos de superusuario para vaciar drop_caches."

echo "✨ ¡Limpieza completada con éxito!"
