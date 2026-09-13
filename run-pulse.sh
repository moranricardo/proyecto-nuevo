#!/usr/bin/env bash

# Determinación de directorio dinámico
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Ejecución del orquestador principal
node index.cjs >> pulse.log 2>&1
