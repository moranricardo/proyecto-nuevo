# proyecto-nuevo

Motor de eventos liviano basado en una arquitectura **ToroidalVortex**, optimizado para el procesamiento de datos en tiempo real bajo una estructura de monorepo modular.

## Estructura del Proyecto

El repositorio está configurado mediante **npm workspaces** para administrar paquetes internos de forma centralizada:

```text
proyecto-nuevo/
├── packages/          # Módulos y submódulos del monorepo
├── index.cjs          # Orquestador principal
├── package.json       # Configuración de dependencias y workspaces
└── .prettierrc.cjs    # Estandarización de formato de código
```

## Características

* **Consumo ultra bajo:** ~2.33 MB de uso de memoria Heap.
* **Ciclo Punto Cero:** Rutina interna de liberación de caché y recolección de basura.
* **Monorepo Nativo:** Soporte integrado para múltiples paquetes bajo packages/*.
* **Arquitectura limpia:** Totalmente desacoplado de integraciones legadas.

## Instalación y Uso

Instala las dependencias globales del monorepo:

```bash
npm install
```

Ejecuta el orquestador principal:

```bash
node index.cjs
```
