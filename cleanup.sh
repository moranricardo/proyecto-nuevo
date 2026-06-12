#!/bin/bash

echo "=========================================="
echo " [clean]: Iniciando Limpieza Estructural"
echo "=========================================="

# 1. Eliminar respaldos temporales o archivos colgados de editores (nano/vim)
find . -name "*.tmp" -type f -delete
find . -name "*~" -type f -delete

# 2. Controlar el tamaño del archivo de estado (opcional: resetear si supera 1MB)
if [ -f "state.json" ]; then
    SIZE=$(wc -c < "state.json")
    if [ $SIZE -gt 1048576 ]; then
        echo "⚠️ state.json superó 1MB. Reiniciando telemetría..."
        echo '{}' > state.json
    else
        echo "✅ state.json bajo control ($SIZE bytes)."
    fi
fi

# 3. Limpieza de caché ligera de npm si existiera en el futuro
if [ -d ".npm" ]; then
    echo "Eliminando caché residual de paquetes..."
    rm -rf .npm
fi

echo "✨ Entorno optimizado y limpio."
echo "=========================================="
