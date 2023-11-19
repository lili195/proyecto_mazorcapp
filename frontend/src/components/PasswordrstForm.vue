<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Ingresa tu nueva contraseña</h2>

    <div class="passwordReset">
        <p>

            <input type="password" id="password" v-model="state.password"
                placeholder="(Debe tener al menos 6 caracteres)*" />
            <span v-if="v$.password.$error">
                {{ v$.password.$errors[0].$message }}
            </span>
        </p>

        <p>
            <span class="label password" style="margin-right:20px; font-size: large;">Porfavor confirme la
                contraseña</span>
        </p>

        <p>
            <input type="password" id="confirm" v-model="state.confirm" placeholder="Confirmar contraseña *" />
            <span v-if="v$.confirm.$error">
                {{ v$.confirm.$errors[0].$message }}
            </span>
        </p>

        <div>
            <button v-on:click="resetReq">Guardar datos</button>
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { computed, reactive } from 'vue';
import { required, minLength, sameAs, helpers } from '@vuelidate/validators'
//import axios from 'axios';

export default {
    name: 'PasswordrstForm',
    setup() {
        const state = reactive({
            password: '',
            confirm: '',
            error: ''
        })

        const minLengthPassword = minLength(6)

        const rules = computed(() => {
            return {
                password: {
                    required: helpers.withMessage('Contraseña no válida', required),
                    minLength: helpers.withMessage('La constraseña debe ser de al menos 6 caracteres', minLengthPassword)
                },
                confirm: {
                    required: helpers.withMessage('Las contraseñas no coinciden', required),
                    sameAs: helpers.withMessage('Las contraseñas no coinciden', sameAs(state.password)),
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
        async resetReq() {
            this.v$.$validate()
            if (!this.v$.$error) {
                console.log('ok')
            } else {
                alert('No fue posible realizar la operación')
            }
        }
    }
};
</script>
<style>
.passwordReset label {
    font-family: KoHo, sans-serif;
    font-size: larger;
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
}

.passwordReset input {
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

.passwordReset button {
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