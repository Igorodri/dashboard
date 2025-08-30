<script setup>
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";
import RegistroClienteComponent from "./RegistroClienteComponent.vue";
import {ref, onMounted} from 'vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

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

async function excluirCliente(id_cliente){
  try {
    const response = await fetch(import.meta.env.VITE_URL_API+`/delete_cliente/${id_cliente}`, {
      method: "DELETE"
    });
    const data = await response.json();

    if(response.ok){
        Toastify({
            text: "Cliente deletado com sucesso!",
            close:true,
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast()
      await carregarClientes(); 
    } else {
        Toastify({
          text: "Não foi possível deletar o Cliente",
          close:true,
          duration: 3000,
          gravity: "top",
          position: "right",
          close: true,
          style: {
              background: "linear-gradient(to right, #ff0000, #8b0000);"
          }
      }).showToast() 
    }
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
}


function abrirRegistroCliente(){
  mostrarRegistroCliente.value = true
}

function fecharRegistroCliente(){
  mostrarRegistroCliente.value = false
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
        <button class="btn" @click="abrirRegistroCliente">➕</button>
      </div>

      <teleport to="body">
        <div v-if="mostrarRegistroCliente" class="modalOverlay" @click.self="fecharRegistroCliente">
          <div class="modalContent">
            <RegistroClienteComponent @clienteAdicionado="carregarClientes"  />
          </div>
        </div>
      </teleport>

      <div class="area-table">
        <table v-if="clientes.length > 0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id_cliente">
              <td>{{ cliente.nome_cliente }}</td>
              <td>{{ cliente.telefone }}</td>
              <div class="area-btns">
                <div class="btn" @click="excluirCliente(cliente.id_cliente)">🗑️</div>
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

.modalOverlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh; 
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.modalContent {
  background: var(--cor-fundo);
  display: flex;
  flex-direction: row;
  max-width:1200px;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
}
</style>
