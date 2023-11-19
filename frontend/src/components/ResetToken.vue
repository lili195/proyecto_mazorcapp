<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Recuperar mi contraseña</h2>
    <div class="resetToken">
        <p>
            <label>Por favor ingrese el código de 4 dígitos enviado a su teléfono</label>
        </p>

        <p>
            <input type="text" v-model="state.num">
            <span v-if="v$.num.$error">
                {{ v$.num.$errors[0].$message }}
            </span>
        </p>

        <p>
            <span style="color: red; font-size: larger;">{{ state.error }}</span>
        </p>

        <button v-on:click="resetReq">Restablecer Contraseña</button>
    </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { computed, reactive } from 'vue';
import { required, minLength, maxLength, numeric, helpers } from '@vuelidate/validators'
//import axios from 'axios';

export default {
    name: 'ResetToken',
    setup() {
        const state = reactive({
            num: null,
            error: ''
        })

        const minLengthNum = minLength(4)
        const maxLengthNum = maxLength(4)

        const rules = computed(() => {
            return {
                num: {
                    required: helpers.withMessage('Debe ingresar el código', required),
                    minLength: helpers.withMessage('El código debe ser de 4 dígitos', minLengthNum),
                    numeric: helpers.withMessage('Debe ingresar digitos numéricos', numeric),
                    maxLength: helpers.withMessage('Máximo 4 dígitos', maxLengthNum)
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
.resetToken label {
    font-family: KoHo, sans-serif;
    font-size: larger;
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
}

.resetToken input {
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

.resetToken button {
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