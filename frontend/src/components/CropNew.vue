<template>
	<h1>Registrar nuevo cultivo</h1>
	<div class="crop-register">
		<p>
			<label>Por favor rellene los siguientes campos:</label>
		</p>
		<input type="date" v-model="state.date" placeholder="Fecha de siembra del cultivo */">
		<input type="text" v-model="state.location" placeholder="Ubicación del cultivo */">
		<input type="number" v-model="state.area" placeholder="Área total del cultivo */">
		<input type="number" v-model="state.plants_num" placeholder="Número de plantas a cultivar */">
		<input type="number" v-model="state.plants_m2" placeholder="Número de plantas por metro cuadrado */">

		<div>
            <button v-on:click="submitCrop">Guardar datos</button>
        </div>
        <div>
		<p>
			<router-link to="/">Volver a Inicio</router-link>
		</p>
	</div>
	</div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minLength, numeric, helpers } from '@vuelidate/validators'
import axios from 'axios';
import { computed, reactive } from 'vue';

export default {
	name: 'CropNewForm',
	setup() {
		const state = reactive({
			date: '',
			location: '',
			area: '',
			plants_num: '',
			plants_m2: ''
		})

		const rules = computed(() => {
            return {
                date: {
                    required: helpers.withMessage('Fecha inválida', required),
                    minLength: minLength(10), numeric
                },
                location: {
					required: helpers.withMessage('Localidad requerida', required)
				},
                area: {
                    required: helpers.withMessage('Por favor indique el área de su cultivo (metros cuadrados)', required),
                    minLength: minLength(5)
                },
                plants_num: {
                    required: helpers.withMessage('Número de plantas no válido', required),
                    minLength: minLength(3)
                },
				plants_m2: {
                    required: helpers.withMessage('Número de plantas por m2 no válido', required),
                    minLength: minLength(1)
                },
            }
        })

		const v$ = useValidate(rules, state)

		return {
            state,
            v$
        }
	},
	methods: {
        submitCrop() {
            this.v$.$validate()
            if (!this.v$.$error) {
                const userCrop = {
					date: this.state.date,
					location: this.state.location,
					area: this.state.area,
					plants_num: this.state.plants_num,
					plants_m2: this.state.plants_m2,
                };
                console.log(userCrop)
                axios.post('http://localhost:3000/register', userCrop)
                    .then(response => {
                        console.log('Cultivo registrado con éxito', response.data);
                        alert('Datos guardados con éxito')
                        this.$router.push({ name: 'LogIn' })
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                alert('Datos no correctos')
            }
        }
    }
}
</script>

<style>
.crop-register label {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: larger;
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
}

.crop-register input {
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

.crop-register button {
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