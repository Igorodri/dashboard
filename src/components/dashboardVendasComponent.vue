<script setup>
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";
import {ref, onMounted} from 'vue'

const vendas = ref([])

async function carregarVendas(){
  try {
    const response = await fetch(import.meta.env.VITE_URL_API+'/select_vendas')
    const data = await response.json()
    vendas.value = data.vendas
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
  }
}

onMounted(() => {
  carregarVendas()
})


</script>

<template>
  <div class="dashboard">

    <sidebarComponent/>

    <main class="main">
      <headerDashboard/>
      
      <div class="btns">
          <button class="btn">➕</button>
        </div>

        <div class="area-table">
          
          <table v-if="vendas.length > 0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Projeto</th>
                  <th>Preço</th>
                  <th>Pago</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(venda, index) in vendas" :key="index">
                  <td>{{ venda.nome_cliente }}</td>
                  <td>{{ venda.descricao }}</td>
                  <td>R$ {{ venda.preco }}</td>
                  <td>{{ venda.paga }}</td>
                  <div class="area-btns">
                    <div class="btn">Pagar</div>
                    <div class="btn">🗑️</div>
                    <div class="btn">🖊️</div>
                  </div>
                  
                </tr>
              </tbody>
          </table>

          <p v-else>Carregando vendas...</p>
        </div>

    </main>
  </div>
</template>

<style>
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
