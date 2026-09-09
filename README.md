# Puppeteer Fork: Vórtice 818

> **🚀 Dashboard Técnico de Optimización**
> *Gestión de recursos avanzada para entornos móviles (Termux) y servidores.*

---

### 💡 Pilares de Optimización

* **🧠 Gestión de Memoria:** Uso de `trimcache` para operar de forma eficiente en dispositivos móviles y de recursos limitados.
* **⏱️ Módulo de Espera:** Algoritmo *Custom Wait* que optimiza los ciclos de CPU y reduce el consumo energético.

> **Core: Flujo Toroidal (Vórtice 818)**
> Motor principal para el ciclo de rotación de datos, scraping intensivo y auditoría en Gerrit.

---

## 🌀 El Toroide Adiamantado (Evolución 818)

El proyecto opera bajo una **Geometría Toroidal**:

* **Flujo Auto-Sustentado:** Los datos procesados sirven como combustible para la siguiente fase de extracción y análisis.
* **Vórtice de Datos:** Bucle de retroalimentación donde el análisis de sentimiento previo calibra los filtros del nuevo ciclo.
* **Punto Cero (0/0):** Liberación asíncrona de memoria (`TrimCache`) previa al siguiente pulso toroidal.

---

## 🛠️ Instalación y Uso rápido en Termux

```bash
# 1. Instalar dependencias del sistema y navegador
pkg update && pkg install nodejs chromium git -y

# 2. Actualizar el repositorio
git pull origin main

# 3. Instalar dependencias del monorepo
npm install

# 4. Ejecutar el orquestador principal
node index.cjs
```

---

## 📦 Arquitectura del Monorepo

Estructurado bajo un modelo de paquetes integrados gestionados mediante **Release Please**:

* `.` (Raíz / Orquestador general)
* `packages/puppeteer`
* `packages/puppeteer-core`
* `packages/ng-schematics`
* `packages/browsers`

---

## 📄 Licencia

Este proyecto se distribuye bajo los términos de la **Apache License 2.0**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
