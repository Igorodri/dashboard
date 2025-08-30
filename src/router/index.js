import {createWebHistory,createRouter} from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Venda from '@/views/Venda.vue'
import Clientes from '@/views/Clientes.vue'

const routes = [
    {path: '/', name: 'login',component: Login},
    {path: '/dashboard', name: 'dashboard',component: Dashboard},
    {path: '/vendas', name: 'vendas', component: Venda},
    {path: '/clientes', name: 'clientes', component: Clientes}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  const rotasPrivadas = ['dashboard'];

  if (rotasPrivadas.includes(to.name) && !token) {

    return next({ name: 'login' });
  }

  next();
});

export default router