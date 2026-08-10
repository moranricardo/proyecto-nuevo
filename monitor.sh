#!/bin/bash
# Monitor inteligente de Git y Gerrit — Ra Pulse Pro

while true; do
    clear
    echo "================================================="
    echo "   ☀️  [RA PULSE] DASHBOARD DE MONITOREO ACTIVO  "
    echo "================================================="
    echo "Última sincronización: $(date)"
    echo "-------------------------------------------------"

    # 1. Ejecutar el motor principal unificado
    node index.cjs

    # 2. Ejecutar la limpieza estructural en segundo plano de forma silenciosa
    ./cleanup.sh > /dev/null

    echo "-------------------------------------------------"
    echo "⏳ Esperando 30 segundos para el próximo latido..."
    sleep 30
done
