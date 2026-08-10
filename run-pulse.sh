#!/bin/bash
# Cargar variables de entorno
source ~/.bashrc
# Ir a la carpeta del proyecto
cd ~/proyecto-nuevo
# Ejecutar el orquestador
node scripts/index.cjs >> ~/pulse.log 2>&1
