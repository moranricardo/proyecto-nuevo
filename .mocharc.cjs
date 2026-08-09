/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

let timeout = process.platform === 'win32' ? 30_000 : 15_000;
if (!!process.env.DEBUGGER_ATTACHED) {
  timeout = 0;
}
module.exports = {
  logLevel: 'debug',
  require: ['./test/build/mocha-utils.js', 'source-map-support/register'],
  exit: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  parallel: !!process.env.PARALLEL,
  timeout: timeout,
  reporter: process.env.CI ? 'spec' : 'dot',
  allowUncaught: true,
  asyncOnly: true,
};
