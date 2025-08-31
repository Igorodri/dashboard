<script setup>
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";
import RegistroVendaComponent from "./RegistroVendaComponent.vue";
import {ref, onMounted} from 'vue'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const mostrarRegistroVenda = ref(false)
const vendas = ref([])

async function carregarVendas(){
  try {
    const response = await fetch(import.meta.env.VITE_URL_API+'/select_vendas')
    const data = await response.json()
        console.log(data)
    vendas.value = data.vendas
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
  }
}

async function pagarVenda(id_venda){
  try {
    const response = await fetch(import.meta.env.VITE_URL_API+`/pagar/${id_venda}`, {
      method: "POST"
    });
    const data = await response.json();

    if(response.ok){
        Toastify({
            text: "Venda paga com sucesso!",
            close:true,
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast()
      await carregarVendas() 
    } else {
        Toastify({
          text: "Não foi possível pagar a venda",
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

async function cancelarPagamentoVenda(id_venda){
  try {
    const response = await fetch(import.meta.env.VITE_URL_API+`/cancelarpagamento/${id_venda}`, {
      method: "POST"
    });
    const data = await response.json();

    if(response.ok){
        Toastify({
            text: "Venda cancelada com sucesso!",
            close:true,
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
        }).showToast()
      await carregarVendas() 
    } else {
        Toastify({
          text: "Não foi possível cancelada a venda",
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


function abrirRegistroVenda(){
  mostrarRegistroVenda.value = true
}

function fecharRegistroVenda(){
  mostrarRegistroVenda.value = false
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
          <button class="btn" @click="abrirRegistroVenda">➕</button>
        </div>

        <teleport to="body">
        <div v-if="mostrarRegistroVenda" class="modalOverlay" @click.self="fecharRegistroVenda">
          <div class="modalContent">
            <RegistroVendaComponent @clienteAdicionado="carregarVendas"  />
          </div>
        </div>
      </teleport>

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
                  <tr v-for="venda in vendas" :key="venda.id_venda">
                    <td>{{ venda.nome_cliente }}</td>
                    <td>{{ venda.descricao }}</td>
                    <td>R$ {{ venda.preco }}</td>
                    <td>{{ venda.paga }}</td>
                    <div class="area-btns">
                      <div v-if="venda.paga == 'Não'" class="btn" @click="pagarVenda(venda.id_venda)">Pagar</div>
                      <div v-else class="btn" @click="cancelarPagamentoVenda(venda.id_venda)">Cancelar</div>
                      
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
