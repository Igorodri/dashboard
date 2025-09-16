<script setup>
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";
import {ref, onMounted} from 'vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const economias = ref(0);
const valorAdicionar = ref('');
const valorRemover = ref('');

async function carregarEconomias() {
  try {
    const response = await fetch(import.meta.env.VITE_URL_API + '/select_economias')
    const data = await response.json()
    economias.value = data.economias
  } catch (error) {
    console.error('Erro ao buscar economias:', error)
  }
}

async function adicionarValor(e) {
  e.preventDefault();
  try {
    await fetch(import.meta.env.VITE_URL_API + '/add_economia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor: Number(valorAdicionar.value) })
    })
    Toastify({ text: "Valor adicionado!", backgroundColor: "green" }).showToast();
    valorAdicionar.value = '';
    carregarEconomias();
  } catch (error) {
    console.error(error);
  }
}

async function removerValor(e) {
  e.preventDefault();
  try {
    await fetch(import.meta.env.VITE_URL_API + '/remove_economia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor: Number(valorRemover.value) })
    })
    Toastify({ text: "Valor removido!", backgroundColor: "red" }).showToast();
    valorRemover.value = '';
    carregarEconomias();
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  carregarEconomias()
})

</script>

<template>
  <div class="dashboard">
    <sidebarComponent/>
    <main class="main">
      <headerDashboard/>

      <section class="area-boxs">

        <div class="card">
          <h4>Total de dinheiro</h4>
          <p class="value">R${{ economias }}</p>
        </div>

      </section>

      <section class="area-crud">

        <div class="card">
          <form @submit="adicionarValor">
            <h4>Adicionar valor</h4>
            <input type="number" step="0.01" v-model="valorAdicionar" placeholder="Digite o valor que deseja adicionar">
            <button type="submit">Adicionar</button>
          </form>

        </div>

        <div class="card">
          <form @submit="removerValor">
            <h4>Remover valor</h4>
            <input type="number" step="0.01"  v-model="valorRemover" placeholder="Digite o valor que deseja remover">
            <button type="submit">Remover</button>
          </form>
        </div>

      </section>




    </main>
  </div>
</template>


<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  position: absolute;
  width: 100%;
}

/* Main */
.main {
  display: flex;
  flex-direction: column;
  flex:1;
}

/* Content */
.card{
  width: 350px;
  margin: 50px;
}

.card form{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.card input{
  margin: 5px 0px 5px 0px;
  padding: 4px;
  border-radius: 5px;
  width: 90%;
  color: white;
}

.card button{
  width: 90%;
  padding: 4px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.area-boxs, .area-crud{
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn{
  cursor: pointer;
  font-size: 20px;
  transition: 0.5s;
}



</style>
