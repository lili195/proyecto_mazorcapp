<template>
	<h1>Mazorcapp</h1>
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
			<input type="date" v-model="state.start_date" placeholder="Fecha de siembra del cultivo">

			<label>Ubicación del cultivo</label>
			<button @click="getLocation()">Obtener mi ubicación</button>
			{{ lat }} , {{ lng }}
			<div ref="mapContainer" style="width: 500px; height: 500px"></div>
			<label>Área total del cultivo (metros cuadrados)</label>
			<input type="number" v-model="state.area" placeholder="Área total del cultivo">
			<label>Número de plantas a cultivar</label>
			<input type="number" v-model="state.plants_num" placeholder="Número de plantas a cultivar">
			<label>Número de plantas por metro cuadrado</label>
			<input type="number" v-model="state.plants_m2" placeholder="Número de plantas por metro cuadrado">
		</form>

		<div>
			<button v-on:click="submitCrop">Guardar datos</button>
		</div>
	</div>
</template>
  
<script>
import { onMounted, ref, computed, reactive } from "vue";
import useValidate from '@vuelidate/core'
import { required, minLength, numeric, helpers } from '@vuelidate/validators'
import L from "leaflet";
import axios from 'axios';

export default {
	name: "CropNew",
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

		const lat = ref(0);
		const lng = ref(0);
		const map = ref();
		const mapContainer = ref();

		onMounted(() => {
			map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
				attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
			}).addTo(map.value);

			// Obtener la ubicación del usuario
			getLocation();
		});

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.watchPosition((position) => {
					lat.value = position.coords.latitude;
					lng.value = position.coords.longitude;
					map.value.setView([lat.value, lng.value], 13);

					L.marker([lat.value, lng.value], { draggable: true })
						.addTo(map.value)
						.on("dragend", (event) => {
							console.log(event);
						});
				});
			}
		}

		return {
			lat,
			lng,
			map,
			mapContainer,
			getLocation,
			state,
			v$
		};
	},

	methods: {
		submitCrop() {
			if (!this.latlng) {
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
};
</script>
  
<style></style>
  
  