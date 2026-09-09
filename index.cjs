const { EventEmitter } = require('events');
const { fetchChanges } = require('./utils/gerrit_client.cjs');

class ToroidalVortex extends EventEmitter {
  constructor(config = {}) {
    super();
    this.cycle = 0;
    this.gerritUrl = config.gerritUrl || 'https://android-review.googlesource.com';
    this.project = config.project || 'platform/frameworks/base';
    this.state = { lastPulseCount: 0 };
  }

  // 1. Pulso Toroidal: Extracción, Transformación y Liberación
  async pulse() {
    this.cycle++;
    console.log(`\n🌀 [Pulso ${this.cycle}] Consultando Gerrit (${this.project})...`);

    try {
      // Entrada de datos real
      const changes = await fetchChanges(this.gerritUrl, this.project);
      const count = Array.isArray(changes) ? changes.length : 0;

      console.log(`📊 [Pulso ${this.cycle}] Cambios detectados: ${count}`);
      this.state.lastPulseCount = count;

      // 2. Punto Cero (Liberación de memoria)
      await this.trimCache();

      return { success: true, count };
    } catch (error) {
      console.error(`❌ [Pulso ${this.cycle}] Error en el flujo:`, error.message);
      await this.trimCache();
      return { success: false, error: error.message };
    }
  }

  // Liberación activa de memoria para Termux
  async trimCache() {
    const memUsage = process.memoryUsage().heapUsed;
    console.log(`🧹 [Punto Cero] Heap en uso: ${(memUsage / 1024 / 1024).toFixed(2)} MB`);

    if (global.gc) {
      global.gc();
      console.log('⚡ Garbage Collection forzado.');
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

// Ejecución directa de prueba
(async () => {
  const vortex = new ToroidalVortex();
  await vortex.pulse();
  console.log('\n✅ Ciclo toroidal completado.');
})();
