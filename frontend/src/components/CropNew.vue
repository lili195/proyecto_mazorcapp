<template>
	<h1>Mazorcapp</h1>
	<div>
		<p>
			<router-link to="/">Volver a Inicio</router-link>
		</p>
	</div>
	<img :src="require('../assets/logo.png')" alt="Mazorcapp logo">
	<h2>Registrar nuevo cultivo</h2>

	<div class="register">
		<p>
			<label><b>Por favor rellene los siguientes campos:</b></label>
		</p>

		<form>
			<div>
				<div>
					<label>
						Permita que rastreemos su ubicación para el cultivo que desea registrar antes de continuar.
					</label>
				</div>
				<br>
				<!-- <button @click="getLocation()">Obtener mi ubicación</button> -->

				<!-- <div>
					Latitud: {{ markerLat }} , Longitud: {{ markerLng }}
				</div> -->
				<div class="flexbox-container">
					<div ref="mapContainer" style="width: 500px; height: 500px;"></div>
				</div>
			</div>

			<p>
				<label>Fecha de siembra del cultivo</label>
				<input type="date" v-model="state.start_date" placeholder="Fecha de siembra del cultivo">
				<span v-if="v$.start_date.$error">
					{{ v$.start_date.$errors[0].$message }}
				</span>
			</p>

			<p>
				<label>Área total del cultivo (metros cuadrados)</label>
				<input type="number" v-model="state.area" placeholder="Área total del cultivo">
				<span v-if="v$.area.$error">
					{{ v$.area.$errors[0].$message }}
				</span>
			</p>

			<p>
				<label>Número de plantas a cultivar</label>
				<input type="number" v-model="state.plants_num" placeholder="Número de plantas a cultivar">
				<span v-if="v$.plants_num.$error">
					{{ v$.plants_num.$errors[0].$message }}
				</span>
			</p>

			<p>
				<label>Número de plantas por metro cuadrado</label>
				<input type="number" v-model="state.plants_m2" placeholder="Número de plantas por metro cuadrado">
				<span v-if="v$.plants_m2.$error">
					{{ v$.plants_m2.$errors[0].$message }}
				</span>
			</p>

		</form>

		<div>
			<button v-on:click="submitCrop">Guardar datos</button>
		</div>
	</div>
</template>
  
<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from '@vuelidate/validators'
import L from "leaflet";
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
const token = localStorage.getItem('token');

const checkCredentials = () => {
	if (localStorage.length === 0 || !token) {
		alert('Token de inicio de sesión no encontrado')
		router.push('/');
	}
}

checkCredentials();

const state = reactive({
	start_date: '',
	longitude: '',
	latitude: '',
	area: '',
	plants_num: '',
	plants_m2: ''
})

const rules = computed(() => {
	return {
		start_date: {
			required: helpers.withMessage('Porfavor elija una fecha de inicio de siembra', required),
		},
		area: {
			required: helpers.withMessage('Por favor indique el área de su cultivo (metros cuadrados)', required),
			minLength: minLength(1)
		},
		plants_num: {
			required: helpers.withMessage('Número de plantas no válido', required),
			minLength: minLength(1)
		},
		plants_m2: {
			required: helpers.withMessage('Número de plantas por m2 no válido', required),
			minLength: minLength(1)
		},
	}
})

const v$ = useVuelidate(rules,state)



onMounted(() => {
	map.value = L.map(mapContainer.value).setView([5.533333, -73.367222], 13);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
	}).addTo(map.value);

	// Obtener la ubicación del usuario
	getLocation();
});

const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition((position) => {
			lat.value = position.coords.latitude;
			lng.value = position.coords.longitude;
			map.value.setView([lat.value, lng.value], 13);

			L.marker([lat.value, lng.value], { draggable: true })
				.addTo(map.value)
				.on("dragend", (event) => {
					// Recuperar la longitud y latitud del marcador
					lng.value = event.target.getLatLng().lat;
					lat.value = event.target.getLatLng().lng;

					// Mostrar la longitud y latitud en la consola
					console.log(`Latitud: ${lat.value}, Longitud: ${lng.value}`);
				});
		});
	}
}

function submitCrop() {
	if (!lat.value || !lng.value) {
		alert('El registro requiere que su ubicación sea especificada en el mapa')
	} else {
		v$.value.$validate()
		if (!v$.value.$error) {
			const userCrop = {
				id_person: localStorage.getItem('id_person'),
				start_date: state.start_date,
				longitude: lng.value,
				latitude: lat.value,
				area: state.area,
				plants_num: state.plants_num,
				plants_m2: state.plants_m2,
			};

			try {
				axios.post('http://localhost:3000/cropNew', userCrop, {
					headers: {
						'Authorization': token,
					}
				})
					.then(response => {
						console.log('Cultivo registrado con éxito', response.data);
						alert('Datos guardados con éxito')
						router.push('/session');
					})
					.catch(error => {
						console.error(error);
					});
			} catch (error) {
				alert('Error inesperado')
			}

		} else {
			alert('Datos no correctos')
		}
	}
}

</script>
  
<style scoped>
.crop-register label {
	font-family: KoHo, sans-serif;
	font-size: larger;
	width: 400px;
	height: 20px;
	display: block;
	margin-bottom: 5px;
	margin-right: auto;
	margin-left: auto;
}

.crop-register input {
	font-family: KoHo, sans-serif;
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
	font-family: KoHo, sans-serif;
	font-size: larger;
	width: 320px;
	height: 40px;
	border: 1px solid mediumspringgreen;
	background-color: mediumseagreen;
	cursor: pointer;
}

.flexbox-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
