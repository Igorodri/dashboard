<script setup>
import { ref, onMounted } from "vue";
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";

const metrics = ref({
  clientes: 0,
  cobrancas: 0,
  vendas: 0
});

onMounted(async () => {
  try {
    const res = await fetch(import.meta.env.VITE_URL_API+'/count');
    metrics.value = await res.json();
  } catch (err) {
    console.error("Erro ao buscar métricas", err);
  }
});

</script>

<template>
  <div class="dashboard">

    <sidebarComponent/>

    <main class="main">
      <headerDashboard/>
      <!-- Cards -->
      <section class="cards">
        <div class="card dark">
          <h4>Faturamento total</h4>
          <p class="value">R$ 2000</p>
        </div>
        <div class="card">
          <h4>Clientes</h4>
          <p class="value">{{ metrics.clientes }}</p>
        </div>
        <div class="card">
          <h4>Cobranças</h4>
          <p class="value">{{ metrics.cobrancas }}</p>
        </div>
        <div class="card">
          <h4>Total de Vendas</h4>
          <p class="value">{{ metrics.vendas}}</p>
        </div>
      </section>

      <section class="table_vendas">
        <table>
            
        </table>
      </section>

    </main>
  </div>
</template>

<style>
.dashboard {
  display: flex;
  height: 100vh;
}

/* Main */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}
.card {
  background: #1f2a44;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0000000d;
  text-align: center;
   color: white;
}

.card h4 {
  font-size: 14px;
  color: #6b7280;
}
.card .value {
  font-size: 22px;
  font-weight: bold;
  margin-top: 8px;
}

/* Content */
.content {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 20px;
  padding: 20px;
}
</style>
