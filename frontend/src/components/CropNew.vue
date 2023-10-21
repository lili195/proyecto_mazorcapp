<template>
	<h1>MazorcApp</h1>
	<div>
		<p>
			<router-link to="/">Volver a Inicio</router-link>
		</p>
	</div>
	<img alt="Vue logo" src="../assets/logo.png">
	<h2>Registrar nuevo cultivo</h2>
	<div class="register">
		<p>
			<label>Por favor rellene los siguientes campos:</label>
		</p>
		
		<form>
			<label>Fecha de siembra del cultivo</label>
			<input type="date" v-model="crop.start_date" placeholder="Fecha de siembra del cultivo">
			
			<!--<input type="text" v-model="crop.location" placeholder="Ubicación del cultivo">-->
			<label>Ubicación del cultivo</label>
			<div id="mapContainer"></div>
			
			<label>Área total del cultivo (metros cuadrados)</label>
			<input type="number" v-model="crop.area" placeholder="Área total del cultivo">
			<label>Número de plantas a cultivar</label>
			<input type="number" v-model="crop.plants_num" placeholder="Número de plantas a cultivar">
			<label>Número de plantas por metro cuadrado</label>
			<input type="number" v-model="crop.plants_m2" placeholder="Número de plantas por metro cuadrado">
		</form>
		
		<div>
			<button v-on:click="submitCrop">Guardar datos</button>
		</div>
	</div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minLength, numeric, helpers } from '@vuelidate/validators'
import axios from 'axios';
import { computed, reactive } from 'vue';
import L from 'leaflet';

// Coordenadas de Sogamoso en OSM = [5,7148307, -72,9279328]

export default {
	name: 'CropNewForm',
	data() {
		return {
			map: null,
			latlng: [5,7148307, -72,9279328],
			crop: {
				start_date: '',
				longitude: '',
				latitude: '',
				altitude: '',
				area: '',
				plants_num: '',
				plants_m2: ''
			}
		};
	},
	mounted() {
		this.startLeafletGraph() 
	},
	setup() {
		const state = reactive({
			start_date: '',
			longitude: '',
			latitude: '',
			altitude: '',
			area: '',
			plants_num: '',
			plants_m2: ''
		})
		
		const rules = computed(() => {
			return {
				start_date: {
					required: helpers.withMessage('Fecha inválida', required),
					minLength: minLength(10), numeric
				},
				longitude: {
					required: helpers.withMessage('Localidad requerida', required)
				},
				latitude: {
					required: helpers.withMessage('Localidad requerida', required)
				},
				altitude: {
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
		startLeaftletGraph() {
			// Inicialización del mapa
			this.cropMap = L.map('mapContainer', {
				center: [5,7148307, -72,9279328],
				zoom: 2
			});
			
			// Añadir capa de tiles (OSM)
			// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}{x}{y}.png', {
			// 	maxZoom: 19,
			// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			// }).addTo(this.cropMap);
			L.tileLayer('https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png', {
				minZoom: 9,
				maxZoom: 18,
				attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & ODbL, &copy; <a href="https://www.opensnowmap.org/iframes/data.html">www.opensnowmap.org</a> <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
			}).addTo(this.cropMap);
			
			// Añadir evento para detección de click en el mapa
			this.cropMap.on('click', this.onMapClick);
			
			// Detección de evento de uso de rueda del mouse
			this.cropMap.on('wheelScroll', (event) => {
				const point = this.cropMap.getEventContainerPoint(event);
				
				if(!this.latlng) {
					alert('El cultivo requiere que su ubicación sea especificada en el mapa')
				} else {
					// Actualizar latitud y longitud del cultivo
					new L.marker(point).addTo(this.cropMap);
				}
			})
		},
		onMapClick(e) {
			this.state.latitude = e.latlng.lat;
			this.state.longitude = e.latlng.lng;
		},
		submitCrop() {
			if(!this.latlng) {
				alert('El cultivo requiere que su ubicación sea especificada en el mapa')
			} else {
				this.v$.$validate()
				if (!this.v$.$error) {
					const userCrop = {
						start_date: this.state.start_date,
						longitude: this.state.longitude,
						latitude: this.state.latitude,
						altitude: this.state.altitude,
						area: this.state.area,
						plants_num: this.state.plants_num,
						plants_m2: this.state.plants_m2,
					};
					console.log('Hizo click en: Latitud: ${lat}; Longitud: ${lng}');
					console.log(userCrop)
					axios.post('http://localhost:3000/cropNew', userCrop)
					.then(response => {
						console.log('Cultivo registrado con éxito', response.data);
						alert('Datos guardados con éxito')
						this.$router.push({ name: 'CropNew' })
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

#map {
	width: 800px;
	height: 600px;
}
</style>