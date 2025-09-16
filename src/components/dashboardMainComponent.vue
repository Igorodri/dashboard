<script setup>
import { ref, onMounted } from "vue";
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";

const metrics = ref({
  faturamento: 0,
  clientes: 0,
  vendas_nao_pagas: 0,
  vendas: 0,
  vendas_pagas:0
});

const economias = ref(0)
onMounted(async () => {
  try {
    const res = await fetch(import.meta.env.VITE_URL_API+'/count');
    metrics.value = await res.json();
  } catch (err) {
    console.error("Erro ao buscar métricas", err);
  }

    try {
    const response = await fetch(import.meta.env.VITE_URL_API + '/select_economias')
    const data = await response.json()
    economias.value = data.economias
  } catch (error) {
    console.error('Erro ao buscar economias:', error)
  }
});

</script>

<template>
  <div class="dashboard">

    <sidebarComponent/>

    <main class="main">
      <headerDashboard/>
      <!-- Cards -->

      <h2>Venda de Sites💻</h2>

      <section class="cards">
        <div class="card">
          <h4>Faturamento total</h4>
          <p class="value">R${{ metrics.faturamento }}</p>
        </div>
        <div class="card">
          <h4>Clientes</h4>
          <p class="value">{{ metrics.clientes }}</p>
        </div>
        <div class="card">
          <h4>Total de Vendas</h4>
          <p class="value">{{ metrics.vendas}}</p>
        </div>
        <div class="card">
          <h4>Vendas pagas</h4>
          <p class="value">{{ metrics.vendas_pagas}}</p>
        </div>
        <div class="card">
          <h4>Vendas não Pagas</h4>
          <p class="value">{{ metrics.vendas_nao_pagas }}</p>
        </div>
      </section>

      <h2>Financeiro Pessoal💵</h2>

      <section class="cards">
        
        <div class="card">
          <h4>Dinheiro Economizado</h4>
          <p class="value">R${{ economias }}</p>
        </div>
        
      </section>

    </main>
  </div>
</template>

<style >
.dashboard {
  display: flex;
  height: 100vh;
  position: absolute;
  width: 100%;
}

/* Main */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main h2{
  margin-top: 20px;
  margin-left: 30px;
  color: white;
  font-size: 30px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}
.card {
  background-color: var(--cor-fundo-background);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0000000d;
  text-align: center;
  color: var(--cor-principal-texto);
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
