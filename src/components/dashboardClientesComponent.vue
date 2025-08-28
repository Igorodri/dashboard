<script setup>
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";
import {ref, onMounted} from 'vue'

const mostrarRegistroCliente = ref(false)

const clientes = ref([])

async function carregarClientes(){
  try {
    const response = await fetch(import.meta.env.VITE_URL_API+'/select_cliente')
    const data = await response.json()
    clientes.value = data.clientes
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
  }
}

onMounted(() => {
  carregarClientes()
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
          
          <table v-if="clientes.length > 0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cliente, index) in clientes" :key="index">
                  <td>{{ cliente.nome_cliente }}</td>
                  <td>{{ cliente.telefone }}</td>
                  <div class="area-btns">
                    <div class="btn">🗑️</div>
                    <div class="btn">🖊️</div>
                  </div>
                  
                </tr>
              </tbody>
          </table>

          <p v-else>Carregando clientes...</p>
        </div>
      
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
  display: flex;
  flex-direction: column;
  flex:1;
}

/* Content */
.area-table {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.btns{
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}

.area-btns{
  display: flex;
  justify-content: start;
}

.btn{
  cursor: pointer;
  font-size: 20px;
  transition: 0.5s;
}

table {
  width: 850px;
  margin-top: 1rem;
  color: var(--cor-principal-texto);
  border-collapse: collapse;
  font-weight: bold;
}

th, td {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 12px;
}

th {
  background-color: var(--cor-fundo-background);
}
</style>
