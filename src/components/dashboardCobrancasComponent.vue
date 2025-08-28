<script setup>
import sidebarComponent from "./sidebarComponent.vue";
import headerDashboard from "./headerDashboard.vue";


</script>

<template>
  <div class="dashboard">

    <sidebarComponent/>

    <main class="main">
      <headerDashboard/>
      
      <section class="cards">

      </section>

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
