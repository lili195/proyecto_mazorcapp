<template>
	<v-container>
		<v-row align="center" justify="center">
			<v-col cols="12" sm="10">
				<v-row>
					<v-col cols="12">
						<div style="text-align: center">
							<v-img :src="require('../assets/mazorcapp_banner.png')" class="my-3" contain height="50" />
						</div>
					</v-col>
				</v-row>
				<v-row align="center" justify="center">
					<v-col cols="auto">
						<v-btn style="background-color: #99cc66; color: white;" density="compact" variant="elevated">
							<v-icon>mdi-seed</v-icon> Registrar Cultivo
						</v-btn>
					</v-col>
					<v-col cols="auto">
						<v-btn class="custom-button" density="compact" variant="elevated">
							<v-icon>mdi-chart-line</v-icon> Seguimiento
						</v-btn>
					</v-col>
					<v-col cols="auto">
						<v-btn class="custom-button" density="compact" variant="elevated">
							<v-icon>mdi-file-chart</v-icon> Informes
						</v-btn>
					</v-col>
				</v-row>
				<v-card class="elevation-6 mt-10">
					<v-window v-model="step">
						<v-window-item :value="1">
							<v-row>
								<v-col cols="12" sm="6">
									<v-card-text class="mt-12">
										<h1 class="text-center">Registra tu cultivo</h1>
										<br>
										<h3 style="color:grey">Ingresa los datos de tu cultivo
										</h3>
										<v-form ref="formRef" id="form" @submit.prevent="submitCrop">
											<v-text-field class="mt-10" label="Fecha de siembra" prepend-icon="date_range"
												type="date" v-model="state.start_date" outlined dense color="#3CB371"
												:rules="startDateRules"></v-text-field>
											<v-text-field label="Identificador del cultivo" outlined dense color="#3CB371"
												autocomplete="false" v-model="state.id_crop"
												:rules="idCropRules"></v-text-field>
											<v-text-field label="Área total del cultivo (m2)" outlined dense color="#3CB371"
												autocomplete="false" v-model="state.area" :rules="areaRules"></v-text-field>
											<v-select label="Cantidad de plantas por m2" outlined dense color="#3CB371"
												:items="['2', '3', '4']" v-model="state.plants_m2"
												:rules="plantsM2Rules"></v-select>
											<!-- <v-text-field label="Cantidad de plantas a cultivar" outlined dense
												color="#3CB371" autocomplete="false" v-model="state.plants_num" readonly
												:rules="plantsNumRules"></v-text-field> -->

											<v-row>
												<v-col>
													<v-btn v-on:click="updateTotalPlants" color="#3CB371">Obtener
													total de plantas</v-btn>
	
												</v-col>
												<v-col>
													<v-chip>{{ state.plants_num }}</v-chip>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="6">
													<h4 style="color:grey">Latitud
													</h4>
													<v-text-field class="mt-3" outlined dense color="#3CB371"
														autocomplete="false" readonly>{{ lat }}</v-text-field>
												</v-col>
												<v-col cols="12" sm="6">
													<h4 style="color:grey">Longitud
													</h4>
													<v-text-field class="mt-3" outlined dense color="#3CB371"
														autocomplete="false" readonly>{{ lng }}</v-text-field>
												</v-col>
											</v-row>
											<v-btn v-on:click="submitCrop" color="#3CB371" dark block tile>Guardar
												cultivo</v-btn>
										</v-form>
									</v-card-text>
								</v-col>
								<v-col cols="12" sm="6">
									<v-card-text class="mt-12">
										<v-row align="center" justify="center">
											<div class="flexbox-container">
												<div ref="mapContainer" style="width: 410px; height: 410px;"></div>
											</div>
										</v-row>
									</v-card-text>
								</v-col>
							</v-row>
						</v-window-item>
					</v-window>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from '@vuelidate/validators'
import L from "leaflet";
import axios from 'axios';
import { useRouter } from 'vue-router';
const step = ref(1);
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
	id_crop: '',
	start_date: '',
	longitude: '',
	latitude: '',
	area: '',
	plants_num: '',
	plants_m2: 0
})

const rules = computed(() => {
	return {
		id_crop: {
			required: helpers.withMessage('Porfavor ingrese un identificador', required),
		},
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

const v$ = useVuelidate(rules, state)



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

function updateTotalPlants() {
	state.plants_num = parseInt(state.area) * parseInt(state.plants_m2);
	if (isNaN(state.plants_num)) {
		state.plants_num = 0;
	}
}

function submitCrop() {
	if (!lat.value || !lng.value) {
		alert('El registro requiere que su ubicación sea especificada en el mapa')
	} else {
		v$.value.$validate()
		if (!v$.value.$error) {
			const userCrop = {
				id_crop: state.id_crop,
				start_date: state.start_date,
				longitude: lng.value,
				latitude: lat.value,
				area: state.area,
				plants_num: state.plants_num,
				plants_m2: state.plants_m2,
			};
			try {
				const config = {
					headers: {
						'Authorization': token,
						'Content-Type': 'application/json'
					}
				};
				axios.post('http://localhost:3000/cropNew', userCrop, config)
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
