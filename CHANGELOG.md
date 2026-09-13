# Changelog

## [1.3.0](https://github.com/moranricardo/proyecto-nuevo/compare/v1.2.0...v1.3.0) (2026-08-10)


### Features

* **config:** agregar configuracion base de TypeScript tsconfig.json ([02af730](https://github.com/moranricardo/proyecto-nuevo/commit/02af7306726eb9356673998965c2a11475217f47))
* **config:** agregar configuracion de TSDoc tsdoc.json ([84a0584](https://github.com/moranricardo/proyecto-nuevo/commit/84a058493b57d0f690cfa3a48cfa2e253869c83d))
* **script:** agregar script de validacion de integridad verificar.js ([7401ac6](https://github.com/moranricardo/proyecto-nuevo/commit/7401ac6d24ad0afba6147feba9ba0e6d76391e32))
* **test:** actualizar script test_mail.js para pasarela de notificaciones ([6e45115](https://github.com/moranricardo/proyecto-nuevo/commit/6e45115d18922c5bbb03b6d418f8618223f1858e))
* **test:** actualizar script test-bridge.js para validación de Puppeteer ([183449a](https://github.com/moranricardo/proyecto-nuevo/commit/183449af5d18f9995928669a50bc1c88154316bb))

## [1.2.0](https://github.com/moranricardo/proyecto-nuevo/compare/v1.1.0...v1.2.0) (2026-08-10)


### Features

* **config:** actualizar y optimizar config.json con parámetros de reintentos e intervalos ([9024abe](https://github.com/moranricardo/proyecto-nuevo/commit/9024abedc09a44aa5e7399f88511029591cfa587))
* **core:** actualizar y proteger index.cjs con bloque try-catch ([820ef7c](https://github.com/moranricardo/proyecto-nuevo/commit/820ef7ce13d29c35fe0120571d0934637031f623))
* **lint:** actualizar y optimizar eslint.config.mjs con la nueva configuración plana ([8b64b1c](https://github.com/moranricardo/proyecto-nuevo/commit/8b64b1c222e2a238ea27b718ddbe906031f238ef))
* **lint:** configurar reglas para archivos de tipos .d.ts ([e743d38](https://github.com/moranricardo/proyecto-nuevo/commit/e743d38c5442d20d5cb9157535f22dd05250afc0))
* **monitor:** agregar script monitor.sh para bucle de control Ra Pulse Pro ([10e52f0](https://github.com/moranricardo/proyecto-nuevo/commit/10e52f03585676ef93edf254a41f4dbd64bf7741))
* **pulse:** agregar script run-pulse.sh para ejecución automatizada ([0576b5e](https://github.com/moranricardo/proyecto-nuevo/commit/0576b5e38b12196d9b5f1aab7fa29a35e8952a28))
* **script:** poblar cleanup.sh con rutina de limpieza y optimización ([9e422b1](https://github.com/moranricardo/proyecto-nuevo/commit/9e422b1adc9034d24c93cb7db9856a8e256c1f1e))


### Bug Fixes

* **pulse:** corregir ruta del orquestador a index.cjs en la raíz ([508a1a2](https://github.com/moranricardo/proyecto-nuevo/commit/508a1a2e9da1b6a1d5b4c3fd8769e6c323fbe78a))

## [1.1.0](https://github.com/moranricardo/proyecto-nuevo/compare/v1.0.0...v1.1.0) (2026-08-10)


### Features

* **utils:** agregar cliente gerrit moderno con fetch nativo ([f0aced9](https://github.com/moranricardo/proyecto-nuevo/commit/f0aced915a39276b52e29a0f8c0db3fd1e3bd468))


### Bug Fixes

* **ci:** agregar permisos de escritura a release-please workflow ([5eff4e7](https://github.com/moranricardo/proyecto-nuevo/commit/5eff4e76ff9525e4179459a61c9aefde57a1f4cb))
* **src:** migrar pipeline a CommonJS (.cjs) y conectar alertas ([c7b18e4](https://github.com/moranricardo/proyecto-nuevo/commit/c7b18e4876f453c39f14f5d453a55d805794c059))

## 1.0.0 (2026-08-09)


### Features

* Agregar monitoreo automatizado de cambios abiertos en Gerrit ([811bae3](https://github.com/moranricardo/proyecto-nuevo/commit/811bae3653db6558092f075404c86d27bb1e4639))
* allow configuring the output of @puppeteer/browsers install ([#14657](https://github.com/moranricardo/proyecto-nuevo/issues/14657)) ([1ce908e](https://github.com/moranricardo/proyecto-nuevo/commit/1ce908e424aff2e9a04250c26822ff66dedb636b))
* expose Page.hasDevTools ([#14758](https://github.com/moranricardo/proyecto-nuevo/issues/14758)) ([5ed7e77](https://github.com/moranricardo/proyecto-nuevo/commit/5ed7e7784a3e23bd1b42b8f0d041a74709a1bf4e))
* Guardar script de Gerrit y workflow ([cbf0361](https://github.com/moranricardo/proyecto-nuevo/commit/cbf0361ed2313b7d58a42b2cec06c8d3b149b5c3))
* implementar auditoría de etiquetas de aprobación Code-Review +2 ([bab04ea](https://github.com/moranricardo/proyecto-nuevo/commit/bab04ea7da5316b6f0496984a9b8043355bb008e))
* implementar cerebro híbrido, motor de telemetría y monitoreo en Termux ([98c6a9c](https://github.com/moranricardo/proyecto-nuevo/commit/98c6a9c6a9c33a22cf611cd03e4fd4beb0c7fe39))
* implementar index.js como orquestador dinamico y ligero ([2c3c03f](https://github.com/moranricardo/proyecto-nuevo/commit/2c3c03f6bdeadcfb687e236e48f023012a563a47))
* Integrar dashboard de monitoreo para Git y Gerrit ([4fba21b](https://github.com/moranricardo/proyecto-nuevo/commit/4fba21b7750d9fe4edba29043b9ee36b0affe82b))
* integrar filtro de seguridad anti-XSS para la API de Gerrit ([17153bd](https://github.com/moranricardo/proyecto-nuevo/commit/17153bd1b2b26422af331a64210150031821e37b))
* integrar saneamiento anti-XSS de Gerrit y telemetría asíncrona ([6d328cc](https://github.com/moranricardo/proyecto-nuevo/commit/6d328cc3dcc0422b6cb4fbac44378eb792ff2bf9))
* **modules:** add modules folder (scraping, cache-trim, sentiment) and refactor index.js to run modular loop ([3af5f97](https://github.com/moranricardo/proyecto-nuevo/commit/3af5f97b0b085177fd19fff784d954f5896604b9))
* optimizar filtro multimedia avanzado y configurar pipeline GitHub Actions ([0f6133b](https://github.com/moranricardo/proyecto-nuevo/commit/0f6133b2756edc1ae1a11146474affe7ea32d839))
* roll to Chrome 146.0.7680.31 ([#14729](https://github.com/moranricardo/proyecto-nuevo/issues/14729)) ([627eb5e](https://github.com/moranricardo/proyecto-nuevo/commit/627eb5e6572f5248286ab09d74c204e2399632e8))
* roll to Firefox 148.0 ([#14728](https://github.com/moranricardo/proyecto-nuevo/issues/14728)) ([09b655a](https://github.com/moranricardo/proyecto-nuevo/commit/09b655a1a4b2ee389f4a63f701a347566a5b9d88))


### Bug Fixes

* actualizar documentación de puppeteer fork para gestión de recursos ([f316bf8](https://github.com/moranricardo/proyecto-nuevo/commit/f316bf8e4f8aa1fd8f88e9780999720e53ddd014))
* agregar permisos explícitos y fallback a GITHUB_TOKEN" ([86e12b4](https://github.com/moranricardo/proyecto-nuevo/commit/86e12b4d338965cbe82efae74f8fa824378889c3))
* apuntar validador principal Maat a index.cjs ([94ae90a](https://github.com/moranricardo/proyecto-nuevo/commit/94ae90a287e2d95b04f80b8601bf603712a49bae))
* autenticación dinámica con GITHUB_TOKEN para evadir 403 ([b0a9872](https://github.com/moranricardo/proyecto-nuevo/commit/b0a9872f4044f38720322a53eb1e1875f30cd5fc))
* **cdp:** add missing .catch(debugError) to void initialize() in onAttachedToTarget ([#14701](https://github.com/moranricardo/proyecto-nuevo/issues/14701)) ([b8b1004](https://github.com/moranricardo/proyecto-nuevo/commit/b8b1004764fed66f3aac9841da4aa5b001b4b221))
* **ci:** purga de workflows defectuosos y creacion de master CI ([c0ba215](https://github.com/moranricardo/proyecto-nuevo/commit/c0ba215002452e3f5af2517b592b6c3dd43e2ecd))
* cleanup merge conflicts and standardize README ([991acfa](https://github.com/moranricardo/proyecto-nuevo/commit/991acfa2db1d790dfdff83d476aa7bb4310c7e53))
* configurar autenticación con token para push de telemetría" ([e9c3012](https://github.com/moranricardo/proyecto-nuevo/commit/e9c3012eab2544b417578c19930d497edddeb778))
* configure release-please with correct token and permissions ([1266e5c](https://github.com/moranricardo/proyecto-nuevo/commit/1266e5ced13cc479cca4effa607c93646649e43f))
* consider browsingContext.navigationCommitted to dispose an existing navigation ([#14724](https://github.com/moranricardo/proyecto-nuevo/issues/14724)) ([b4e92c6](https://github.com/moranricardo/proyecto-nuevo/commit/b4e92c637c503710895c842f391793018c4f35b5))
* Corrige formato de URL de la API de Gerrit para evitar error 400 ([8d4fb02](https://github.com/moranricardo/proyecto-nuevo/commit/8d4fb0237a1ea80fbc0a2924011a5f0f588ab8f3))
* **dependabot:** eliminar configuracion de docker en ruta inexistente /docker ([265e380](https://github.com/moranricardo/proyecto-nuevo/commit/265e3803bd9e718d7eb5f2c158a7174d23693014))
* disable PartitionAllocSchedulerLoopQuarantineTaskControlledPurge ([#14744](https://github.com/moranricardo/proyecto-nuevo/issues/14744)) ([e6c7425](https://github.com/moranricardo/proyecto-nuevo/commit/e6c7425d3f459adfbf5c1dd0b230da33fa9eb7c3))
* do not resolve user data dir if it is absolute ([#14680](https://github.com/moranricardo/proyecto-nuevo/issues/14680)) ([7765ae7](https://github.com/moranricardo/proyecto-nuevo/commit/7765ae7d532634a919ca146b742b4a863e3366e9))
* Forzar ejecución de ra_pulse_bridge.cjs en el entorno del servidor ([c1318bd](https://github.com/moranricardo/proyecto-nuevo/commit/c1318bd9fafbd8a32650bff200edb1dc6e635ae6))
* implementar ad-m/github-push-action para corregir error 403 ([daa8d93](https://github.com/moranricardo/proyecto-nuevo/commit/daa8d93c88b183945fed7bc457044a4eb1ae03dc))
* improve/fix locator callback example ([#14670](https://github.com/moranricardo/proyecto-nuevo/issues/14670)) ([87b5865](https://github.com/moranricardo/proyecto-nuevo/commit/87b5865a5dc9c6bce2f3a7fe720c094aeacf74f3))
* Integración de flujo de mantenimiento y llamadas .cjs seguras ([26cae43](https://github.com/moranricardo/proyecto-nuevo/commit/26cae4322345fd533520cafc3c789882d2546fa8))
* mejorar reporte de errores en rapulse para auditoría ([accd2ae](https://github.com/moranricardo/proyecto-nuevo/commit/accd2aed946d4e3bbde863f795320a5ea73fc1d8))
* Migración de index a .cjs para evadir las restricciones de ES modules de Node v26 ([f930fa3](https://github.com/moranricardo/proyecto-nuevo/commit/f930fa39c228c9a1caa679949ed58dc69cdc70ad))
* migrar orquestador a index.cjs y actualizar workflows de CI/CD ([5f61dc4](https://github.com/moranricardo/proyecto-nuevo/commit/5f61dc4f15cd1bfd152750c835e35ae7b48fa17e))
* optimización de buffers para procesadores ARM ([7e3b9a5](https://github.com/moranricardo/proyecto-nuevo/commit/7e3b9a53dc26004bd4113216f1f2d3a7064065d7))
* otorgar permisos de escritura al job orchestrate en monitor.yml ([2cc2666](https://github.com/moranricardo/proyecto-nuevo/commit/2cc26669cb8ea54f4fb2c798d1ab0b1ed23df1da))
* **pkg:** habilitar type module para soportar importaciones en rapulse.js ([dbe62cc](https://github.com/moranricardo/proyecto-nuevo/commit/dbe62cca99cf61e68095720ab5a8766d07214a20))
* reconfiguración completa del workflow ([96b34b3](https://github.com/moranricardo/proyecto-nuevo/commit/96b34b3d9a6ef48f05e5d2f9c39d0b757bdfdcf9))
* reestructurar ciclo de Ra con permisos de escritura y limpieza anti-XSS ([6d5d0d3](https://github.com/moranricardo/proyecto-nuevo/commit/6d5d0d3e5846452a94c3298f03c6d51bd1804f22))
* remapear ruta de gerrit-check.js a src/gerrit/ en workflows ([42b7b13](https://github.com/moranricardo/proyecto-nuevo/commit/42b7b1388ff9281ed2b6e76a628bef2f642c34e8))
* remove invalid JSON syntax from release-please-config.json ([28fe4e8](https://github.com/moranricardo/proyecto-nuevo/commit/28fe4e8ad1aa9f3a9695fd8a9e66ecc49aaa3380))
* remover cache de npm para corregir pipeline ([77c8bda](https://github.com/moranricardo/proyecto-nuevo/commit/77c8bdae48d818af4b55aa34e2e394dd23195852))
* Reparar el workflow de actualización de navegadores - Agregar permisos necesarios y usar GITHUB_TOKEN ([7304315](https://github.com/moranricardo/proyecto-nuevo/commit/7304315fa13044461a8ae83727e2547961b9a940))
* reubicar documentación en /docs para cumplir con el protocolo de integridad ([4753d36](https://github.com/moranricardo/proyecto-nuevo/commit/4753d3696534b48ad6a7ca8c851e967989dcbe74))
* roll to Chrome 145.0.7632.117 ([#14719](https://github.com/moranricardo/proyecto-nuevo/issues/14719)) ([1d407e1](https://github.com/moranricardo/proyecto-nuevo/commit/1d407e1e69ee0f307f8819152a980fa0a24835ff))
* roll to Chrome 145.0.7632.67 ([#14679](https://github.com/moranricardo/proyecto-nuevo/issues/14679)) ([dfc22dd](https://github.com/moranricardo/proyecto-nuevo/commit/dfc22dd4361f57a90cb653499e023c272ab50018))
* roll to Chrome 145.0.7632.76 ([#14684](https://github.com/moranricardo/proyecto-nuevo/issues/14684)) ([6624d1d](https://github.com/moranricardo/proyecto-nuevo/commit/6624d1dceae3c1ac0778b95e77810dd8c39df7a5))
* roll to Chrome 145.0.7632.77 ([#14703](https://github.com/moranricardo/proyecto-nuevo/issues/14703)) ([b31215e](https://github.com/moranricardo/proyecto-nuevo/commit/b31215eaaa2f48768690600d68b301747696d7bc))
* roll to Chrome 146.0.7680.66 ([#14752](https://github.com/moranricardo/proyecto-nuevo/issues/14752)) ([60ace04](https://github.com/moranricardo/proyecto-nuevo/commit/60ace04425d1ad4e99732298ed51839f09adcb0a))
* roll to Chrome 146.0.7680.72 ([#14764](https://github.com/moranricardo/proyecto-nuevo/issues/14764)) ([177e3ed](https://github.com/moranricardo/proyecto-nuevo/commit/177e3ed44a0066c0252d7429fadd8fb82a81281f))
* roll to Chrome 146.0.7680.76 ([#14777](https://github.com/moranricardo/proyecto-nuevo/issues/14777)) ([0751a83](https://github.com/moranricardo/proyecto-nuevo/commit/0751a83632d224695ae1f655405b2ec838774d33))
* roll to Chrome 146.0.7680.80 ([#14778](https://github.com/moranricardo/proyecto-nuevo/issues/14778)) ([14685a0](https://github.com/moranricardo/proyecto-nuevo/commit/14685a0e090671eb1d1db2dc9e4ec60117b8cfc3))
* roll to Firefox 147.0.4 ([#14697](https://github.com/moranricardo/proyecto-nuevo/issues/14697)) ([eed313f](https://github.com/moranricardo/proyecto-nuevo/commit/eed313fc67d4e3b5c9b9440acb5b3262dac5e679))
* roll to Firefox 148.0.2 ([#14763](https://github.com/moranricardo/proyecto-nuevo/issues/14763)) ([e658f4e](https://github.com/moranricardo/proyecto-nuevo/commit/e658f4eec9656ff2ab97cdcd98f1fb33c8b06304))
* saneamiento completo del workflow y empaquetamiento mjs ([b119b1d](https://github.com/moranricardo/proyecto-nuevo/commit/b119b1d06fa9ee8f846bde1d4b419aa94d88e9dc))
* saneamiento final y autenticación nativa de workflow ([4b003fb](https://github.com/moranricardo/proyecto-nuevo/commit/4b003fb210617698ab389681cf66d13537042266))
* sincronizar package-lock.json con nodemailer ([9d50408](https://github.com/moranricardo/proyecto-nuevo/commit/9d50408b04dee08f07a7b103cb5001cc1d2a1d84))
* Sube package-lock.json para activar el indexado de caché en GitHub ([3a8632a](https://github.com/moranricardo/proyecto-nuevo/commit/3a8632ae1e165336ac55272cb453216a18f4e54d))
* usar npm install en workflow para resolver descalce de lockfile ([53b38be](https://github.com/moranricardo/proyecto-nuevo/commit/53b38be52dcd65cf486c70cbd4ab2e644c32879b))
* **wsl:** check for linux locations first ([#14681](https://github.com/moranricardo/proyecto-nuevo/issues/14681)) ([11f01ef](https://github.com/moranricardo/proyecto-nuevo/commit/11f01efebcb1b0febfdeb5fb1a4d52f0155732df))


### Reverts

* "fix: disable ReadAnythingOmniboxChip by default" ([#14674](https://github.com/moranricardo/proyecto-nuevo/issues/14674)) ([c789392](https://github.com/moranricardo/proyecto-nuevo/commit/c78939253958d89168b4087d6c98d82b1d56cad4))
