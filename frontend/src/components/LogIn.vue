<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Ingresar</h2>
    <div class="login">
        <p>
            <label>Por favor ingrese su número de cédula y su contraseña</label>
        </p>
        <p>
            <span class="label cc" style="margin-right:90px; font-size: large;">Ingrese su número de cédula</span>
        </p>
        <p>
            <input type="text" v-model="state.cc" placeholder="Cédula">
            <span v-if="v$.cc.$error">
                {{ v$.cc.$errors[0].$message }}
            </span>
        </p>

        <p>
            <span class="label cc" style="margin-right:140px; font-size: large;">Ingrese su contraseña</span>
        </p>

        <p>
            <input type="password" v-model="state.password" placeholder="Contraseña">
            <span v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
            </span>
        </p>
        <button v-on:click="login">Iniciar sesión</button>
        <p>
            <span style="color: red; font-size: larger;">{{ state.error }}</span>
        </p>
    </div>
    <p>
        <router-link to="/passwordReset">Olvidó su contraseña?</router-link>
    </p>
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
import useValidate from '@vuelidate/core'
import { computed, reactive } from 'vue';
import { required, minLength, maxLength, numeric, helpers } from '@vuelidate/validators'
import axios from 'axios';

export default {
    name: 'LogIn',
    setup() {
        const state = reactive({
            cc: null,
            password: null,
            error: ''
        })

        const minLengthCC = minLength(7)
        const minLengthPassword = minLength(6)
        const maxLengthCC = maxLength(10)

        const rules = computed(() => {
            return {
                cc: {
                    required: helpers.withMessage('Debe ingresar su cédula', required),
                    minLength: helpers.withMessage('La cédula debe ser de al menos 7 dígitos', minLengthCC),
                    numeric: helpers.withMessage('Debe ingresar dígitos numericos', numeric),
                    maxLength: helpers.withMessage('Máximo 10 dígitos', maxLengthCC)
                },
                password: {
                    required: helpers.withMessage('Debe ingresar su contraseña', required),
                    minLength: helpers.withMessage('La constraseña debe ser de al menos 6 caracteres', minLengthPassword)
                }
            }
        })

        const v$ = useValidate(rules, state)

        return {
            state,
            v$
        }
    },
    methods: {
        async login() {
            this.v$.$validate()
            if (!this.v$.$error) {
                axios.post('http://localhost:3000/login', {
                    cc: this.state.cc,
                    password: this.state.password,
                }).then((response) => {
                        console.log(response.data);
                        localStorage.setItem('token', response.data.token)
                        this.$router.push('/session');
                    }).catch((err) => {
                        console.log(err.response)
                        this.state.error = err.response.data.error
                    })
            } else {
                alert('No fue posible iniciar sesión :(')
            }
        }
    }
}
</script>

<style>
.login label {
    font-family: KoHo, sans-serif;
    font-size: larger;
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
}

.login input {
    font-family: KoHo, sans-serif;
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
    font-family: KoHo, sans-serif;
    font-size: larger;
    width: 320px;
    height: 40px;
    border: 1px solid mediumspringgreen;
    background-color: mediumseagreen;
    cursor: pointer;
}
</style>