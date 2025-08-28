<script setup>
import logo from '/logo.png'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const router = useRouter()
const user = ref(null)
const password = ref(null)
const error = ref(null)

async function login(){
    try{
        const response = await fetch(import.meta.env.VITE_URL_API+'/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:user.value,
                password: password.value
            })
        });

        const data = await response.json()

        if(response.ok){
            Toastify({
            text: "Login realizado com sucesso!",
            close:true,
            duration: 3000,
            gravity: "top",
            position: "right",
            close: true,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)"
            }
          }).showToast()
            localStorage.setItem('token', data.token);
            router.push('/dashboard') 
        }else{
            Toastify({
                text: "Usuário ou senha incorretos!",
                close:true,
                duration: 3000,
                gravity: "top",
                position: "right",
                close: true,
                style: {
                    background: "linear-gradient(to right, #ff0000, #8b0000);"
                }
            }).showToast() 
            user.value = ''
            password.value = ''
        }
    }catch(error){
        Toastify({
              text: "Erro ao realizar login.",
              close:true,
              duration: 3000,
              gravity: "top",
              position: "right",
              close: true,
              style: {
                background: "linear-gradient(to right, #ff0000, #ec5353)"
              }
            }).showToast()
            error.value = 'Erro ao realizar login'
        }
}
</script>

<template>
    <div class="area-login">
        <form @submit.prevent="login" id="form-login"> 
            <img :src="logo" alt="Logo">
            <input type="text" placeholder="Digite o nome de usuário" v-model="user" required>
            <input type="password" placeholder="Digite a sua senha" v-model="password" required>
            
            <p v-if="error" class="error-message">{{ error }}</p>

            <div class="area-btn">
                <button type="submit">Entrar</button>
            </div>
            
        </form>
    </div>
</template>

<style scoped>
    .area-login{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }

    .area-login form{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid var(--cor-secundaria);
        box-shadow: 0 0 20px rgba(0, 150, 255, 0.4);
        width: 400px;
        height: 500px;
        border-radius: 10px;
    }

    .area-login input{
        color: white;
        width: 300px;
        padding: 8px;
        border-radius: 5px;
        border: 1px solid rgb(65, 65, 65);
        margin-top: 10px;
    }

    .area-login form img{
        width: 140px;
    }

    .area-btn{
        margin-top: 100px;
    }

    .area-btn button{
        width: 250px;
        border-radius: 8px;
        background-color: var(--cor-secundaria);
        border: none;
        color: white;
        font-weight: bold;
        font-size: 16px;
        padding: 10px;
        cursor: pointer;
    }

    .area-btn button:hover{
        background-color: var(--cor-secundaria-pressionada);
    }

    .error-message {
        margin-top: 1rem;
        color: #e63946;
        font-weight: 600;
        text-align: center;
    }

@media (max-width: 768px) {
    .login-form {
        background: white;
        padding: 2rem 2.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgb(0 0 0 / 0.1);
        width: 320px;
        display: flex;
        flex-direction: column;
        margin-top: -25%;
    }

}

@media (min-width: 769px) and (max-width: 1024px) {

    
}


@media (min-width: 769px) and (max-width: 1366px) { 

}
</style>