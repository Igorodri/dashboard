<script setup>
import { ref, watch } from "vue";
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const emit = defineEmits(["vendaEditado"])

const props = defineProps({
  cliente: { type: Object, required: true } 
})

const nome = ref("");
const telefone = ref("");

watch(() => props.venda, (novo) => {
  if (novo) {
    nome.value = novo.nome_cliente
    telefone.value = novo.telefone
  }
}, { immediate: true })

async function editarVenda() {
  try {
    const response = await fetch(import.meta.env.VITE_URL_API+`/edit_venda/${props.venda.id_venda}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        nome_cliente: nome.value,
        telefone_cliente: telefone.value
      })
    })

    const data = await response.json();

    if (response.ok) {
      Toastify({
        text: "Venda editada com sucesso!",
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
      }).showToast()

      emit("vendaEditada") 
    } else {
      Toastify({
        text: "Não foi possível editar a venda",
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
        style: {
          background: "linear-gradient(to right, #ff0000, #8b0000)"
        }
      }).showToast()
    }
  } catch (error) {
    console.error("Erro ao editar venda:", error);
  }
}
</script>

<template>
  <section class="modalRegistrarCliente">
    <form class="form" @submit.prevent="editarCliente">
      <div class="form-group">
        <h3>Editar Venda</h3>   
        <label for="nome">Nome do Cliente</label>
            <select name="" id="">
                <option value=""></option>
            </select>
            </div>

            <div class="form-group">
            <label for="telefone">Descrição da Venda</label>
            <textarea id="descricao" placeholder="Digite a descrição da venda"></textarea>
            </div>

            <div class="form-group">
            <label for="">Preço da Venda</label>
            <input type="number" placeholder="Digite o valor da venda">
            </div>

      <button type="submit" class="btn-save">Editar Venda</button>
    </form>
  </section>
</template>

<style scoped>

.modalRegistrarClient{
    display: flex;
    justify-content: center;
    width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

h3{
    font-size: 24px;
    color: var(--cor-principal-texto);
    font-weight:bold;
    margin: 10px 0px 10px 0px;
}

label {
  font-size: 14px;
  color: #9ca3af;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #111827;
  color: white;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.btn-save {
  background: #2563eb;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.btn-save:hover {
  background: #1d4ed8;
}
</style>