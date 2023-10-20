<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Ingresar</h2>
    <div class="login">
        <p>
            <label>Por favor ingrese su número de cédula y su contraseña</label>
        </p>

        <p>
            <input type="text" v-model="loginForm.cc" placeholder="Cédula">
        </p>

        <p>
            <input type="password" v-model="loginForm.password" placeholder="Contraseña">
        </p>
        <button v-on:click="login">Iniciar sesión</button>
    </div>
    <p>
        <router-link to="/register">Aún no tiene una cuenta?</router-link>
    </p>

    <div class="back">
        <p>
            <router-link to="/">Volver a Inicio</router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogIn',
    data() {
        return {
            loginForm: {
                cc: null,
                password: null
            }
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    cc: this.loginForm.cc,
                    password: this.loginForm.password,
                });

                const token = response.data.token;
                localStorage.setItem('token', token);

                // Redirect to the home page
                this.$router.push('/');
            } catch (error) {
                console.error('Error en el inicio de sesión:', error);
                alert('Error en el inicio de sesión');
            }
        }
    }
}
</script>

<style>
.login input {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: larger;
    width: 300px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid mediumspringgreen;
}

.login button {
    color: aliceblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: larger;
    width: 320px;
    height: 40px;
    border: 1px solid mediumspringgreen;
    background-color: mediumseagreen;
    cursor: pointer;
}
</style>