/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Configuración liviana de Puppeteer adaptada a entorno Node.js sin descarga de binarios pesados.
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Desactivar descargas automáticas de binarios pesados de navegadores
  chrome: {
    skipDownload: true,
  },
  'chrome-headless-shell': {
    skipDownload: true,
  },
  firefox: {
    skipDownload: true,
  },
};
