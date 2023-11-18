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
                                        <v-form>
                                            <v-text-field class="mt-10" label="Fecha de siembra" prepend-icon="date_range"
                                                type="date" v-model="due" outlined dense color="#3CB371"></v-text-field>
                                            <v-text-field label="Área total del cultivo (m2)" outlined dense color="#3CB371"
                                                autocomplete="false" v-model="cropArea"
                                                :rules="cropAreaRules"></v-text-field>
                                            <v-select label="Cantidad de plantas por m2" outlined dense color="#3CB371"
                                                :items="['2', '3', '4']" v-model="plantsPerSquareMeter"></v-select>
                                            <v-text-field label="Cantidad de plantas a cultivar" outlined dense
                                                color="#3CB371" autocomplete="false" v-model="totalPlants"
                                                readonly></v-text-field>
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
                                            <v-btn color="#3CB371" dark block tile>Guardar cultivo</v-btn>
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
                                        <div class="text-center">
                                            <v-btn class="mt-8" color="#3CB371" dark block tile variant="tonal"
                                                @click="getLocation()">Obtener
                                                ubicación</v-btn>
                                        </div>
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

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import { useRouter } from 'vue-router';
export default {
    name: 'FollowGrowth',
    setup() {
        const token = localStorage.getItem('token');

        const checkCredentials = () => {
            if (localStorage.length === 0 || !token) {
                alert('Token de inicio de sesión no encontrado')
                useRouter().push('/');
            }
        }

        checkCredentials();

        const lat = ref(0)
        const lng = ref(0)
        const map = ref()
        const mapContainer = ref()

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
                        .on("draged", (event) => {
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
        };
    },
    data: () => ({
        step: 1,
        due: null,
        cropArea: 0,
        plantsPerSquareMeter: '2',
        totalPlants: 0,
        cropAreaRules: [
            v => {
                if (!v) {
                    return 'Ingrese el área';
                }
                return true;
            },
            v => {
                if (!/^\d+$/.test(v)) {
                    return 'Ingrese dígitos numéricos';
                }
                return true;
            }
        ]
    }),
    watch: {
        cropArea: 'updateTotalPlants',
        plantsPerSquareMeter: 'updateTotalPlants',
    },
    methods: {
        updateTotalPlants() {
            // Convierte los valores a números y realiza la multiplicación
            this.totalPlants = parseInt(this.cropArea) * parseInt(this.plantsPerSquareMeter);
            if (isNaN(this.totalPlants)) {
                this.totalPlants = 0;
            }
        },
    },
    propos: {
        source: String
    },
}
</script>

<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}

.custom-color {
    background-color: #3CB371;
    /* Cambia el color a tu preferencia */
    /* Otras propiedades de estilo si es necesario */
}

.custom-button {
    color: white;
    /* Cambia el color del texto a negro o el color deseado */
    text-decoration: none;
    /* Evita el subrayado del texto */
    background-color: #3CB371;
}

/* Estilo para los botones cuando se seleccionan */
.custom-button:hover {
    color: none;
    /* Cambia el color del texto al seleccionar el botón */
}

.flexbox-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>