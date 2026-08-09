// src/gerrit/gerrit-check.cjs - Reexportación de reglas de integridad (Maat)
const { validarIntegridad } = require('../mantenimiento.cjs');

module.exports = { validarIntegridad };
