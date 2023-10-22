<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Registrarme</h2>
    <div class="register">
        <p>
            <label>Por favor rellene los siguientes campos: </label>
        </p>

        <p>
            <label>Cédula</label>
            <input type="text" id="cc" v-model="state.cc" placeholder="Número de Cédula *" />
            <span v-if="v$.cc.$error">
                {{ v$.cc.$errors[0].$message }}
            </span>
        </p>

        <p>
            {{state.error}}
        </p>

        <p>
            <input type="text" id="name" v-model="state.name" placeholder="Primer nombre *" />
            <span v-if="v$.name.$error">
                {{ v$.name.$errors[0].$message }}
            </span>
        </p>

        <p>
            <input type="text" id="number" v-model="state.number" placeholder="Número de teléfono *" />
            <span v-if="v$.number.$error">
                {{ v$.number.$errors[0].$message }}
            </span>
        </p>

        <p>
            <input type="password" id="password" v-model="state.password.password"
                placeholder="Contraseña * (debe tener al menos 6 caracteres)" />
            <span v-if="v$.password.password.$error">
                {{ v$.password.password.$errors[0].$message }}
            </span>
        </p>

        <p>
            <input type="password" id="confirm" v-model="state.password.confirm" placeholder="Confirmar contraseña *" />
            <span v-if="v$.password.confirm.$error">
                {{ v$.password.confirm.$errors[0].$message }}
            </span>
        </p>

        <div>
            <button v-on:click="submitRegister">Guardar datos</button>
        </div>
    </div>

    <div>
        <p>
            <router-link to="/">Volver a Inicio</router-link>
        </p>
    </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength, sameAs, numeric, helpers } from '@vuelidate/validators'
import axios from 'axios';
import { computed, reactive } from 'vue';


export default {
    name: 'RegisterForm',
    setup() {
        const state = reactive({
            cc: '',
            name: '',
            number: '',
            password: {
                password: '',
                confirm: '',
            },

            error: ''
        })

        const minLengthCC = minLength(7)
        const minLengthNum = minLength(10)
        const minLengthPassword = minLength(6)

        const maxLengthCC = maxLength(10)
        const maxLengthNum = maxLength(10)

        const rules = computed(() => {
            return {
                cc: {
                    required: helpers.withMessage('Debe ingresar su cédula', required),
                    minLength:  helpers.withMessage('La cédula debe ser de al menos 7 dígitos', minLengthCC), 
                    numeric: helpers.withMessage('Debe ingresar un número de cédula', numeric),
                    maxLength: helpers.withMessage('Máximo 10 dígitos', maxLengthCC)
                },
                name: { required: helpers.withMessage('Debe ingresar su nombre', required) },
                number: {
                    required: helpers.withMessage('Número no válido', required),
                    minLength: helpers.withMessage('El número debe ser de al menos 10 dígitos', minLengthNum),
                    numeric: helpers.withMessage('Número no válido', numeric),
                    maxLength: helpers.withMessage('Máximo 10 dígitos', maxLengthNum)
                },
                password: {
                    password: {
                        required: helpers.withMessage('Contraseña no válida', required),
                        minLength: helpers.withMessage('La constraseña debe ser de al menos 6 caracteres', minLengthPassword) 
                    },
                    confirm: {
                        required: helpers.withMessage('Las contraseñas no coinciden', required),
                        sameAs: helpers.withMessage('Las contraseñas no coinciden', sameAs(state.password.password)),
                    }
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
        submitRegister() {
            this.v$.$validate()
            if (!this.v$.$error) {
                const userData = {
                    cc: this.state.cc,
                    name: this.state.name,
                    number: this.state.number,
                    password: this.state.password.password,
                };
                console.log(userData)
                axios.post('http://localhost:3000/register', userData)
                    .then(response => {
                        console.log(response.data);
                        alert('Datos guardados con éxito')
                        this.$router.push({ name: 'SessionPage' })
                    }, err => {
                        console.log(err.response)
                        this.state.error = err.response.data.error
                    })
            } else {
                alert('Datos no correctos')
            }
        }
    }
}
</script>

<style>
.register label {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: larger;
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
}

.register input {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: larger;
    width: 400px;
    height: 40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid mediumspringgreen;
}

.register button {
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