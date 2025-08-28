<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

function sair(){
  localStorage.removeItem("token")
  router.push('/') 
}

</script>

<template>
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="profile">
        <div class="avatar">👤</div>
        <h3>Igor Mascarenhas</h3>
      </div>
      <nav>
        <RouterLink to="/dashboard" class="sidebarnav"><a>🏠 Home</a></RouterLink> 
        <RouterLink to="/vendas" class="sidebarnav"><a>🛒 Vendas</a></RouterLink> 
        <RouterLink to="/cobrancas" class="sidebarnav"><a>📦 Cobranças</a></RouterLink>
        <RouterLink to="/clientes" class="sidebarnav"><a>🙋‍♂️ Clientes</a></RouterLink>
        <a @click="sair()" class="sidebarnav">📤 Sair</a>
      </nav>
    </aside>
</template>

<style scoped>
    /* Sidebar */
    .sidebar {
    width: 240px;
    background-color: var(--cor-fundo-background);
    color: var(--cor-principal-texto);
    display: flex;
    flex-direction: column;
    padding: 20px;
    }
    .sidebar .profile {
    text-align: center;
    margin-bottom: 40px;
    background-color: var(--cor-fundo-background);
    }

    .sidebar .profile h3{
        background-color: var(--cor-fundo-background);
    }

    .sidebar .avatar {
    background-color: #2d3b60;
    width: 80px;
    height: 80px;
    margin: auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    }
    .sidebar h3 {
    margin-top: 10px;
    }
    .sidebar p {
    font-size: 13px;
    }
    .sidebar nav {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
    background-color: var(--cor-fundo-background);
    }
    .sidebar nav a {
    text-decoration: none;
    color: #cbd5e1;
    padding: 10px;
    border-radius: 6px;
    transition: 0.3s;
    cursor: pointer;
    }

    .sidebarnav:hover,
    .sidebarnav:hover a {
    background: #334155;
    color: var(--cor-principal-texto);
    }

</style>