<template>
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>Recuperar mi contraseña</h2>
    <div class="checkNum">
        <p>
            <label>Por favor confirme su número de teléfono</label>
        </p>

        <p>
            <b> Le será enviado un mensaje con un conjunto de 4 <br> 
                números para iniciar el proceso de restablecimineto de su contraseña </b>
        </p>

        <p>
            <input type="text" v-model="state.num" placeholder="Teléfono">
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
import axios from 'axios';

export default {
    name: 'CheckNumber',
    setup() {
        const state = reactive({
            num: null,
            error: ''
        })

        const minLengthNum = minLength(10)
        const maxLengthNum = maxLength(10)

        const rules = computed(() => {
            return {
                num: {
                    required: helpers.withMessage('Debe ingresar su teléfono', required),
                    minLength: helpers.withMessage('El telefono debe ser de 10 dígitos', minLengthNum),
                    numeric: helpers.withMessage('Debe ingresar digitos numericos', numeric),
                    maxLength: helpers.withMessage('Máximo 10 dígitos', maxLengthNum)
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
                axios.post('http://localhost:3000/checkNum', {
                    num: this.state.num,
                }).then((response) => {
                        console.log(response.data);
                        this.$router.push('/resetToken');
                    }).catch((err) => {
                        console.log(err.response)
                        this.state.error = err.response.data.error
                    })
            } else {
                alert('No fue posible realizar la operación')
            }
        }
    }
};
</script>

<style>
.checkNum label {
    font-family: KoHo, sans-serif;
    font-size: larger;
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
}

.checkNum input {
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

.checkNum button {
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