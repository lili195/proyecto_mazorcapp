<template>
    <v-container class="my-5">
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
                        <v-btn class="custom-button" density="compact" tracking="elevated">
                            <v-icon>mdi-seed</v-icon> Registrar Cultivo
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn style="background-color: #99cc66; color: white;" density="compact" tracking="elevated">
                            <v-icon>mdi-chart-line</v-icon> Seguimiento
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="custom-button" density="compact" tracking="elevated">
                            <v-icon>mdi-file-chart</v-icon> Informes
                        </v-btn>
                    </v-col>
                </v-row>
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1" class="mb-10">
                            <h1 class="mt-5">Cultivo 1</h1>
                            <h3 style="color:grey">Gestiona tus seguimientos
                            </h3>
                            <v-row class="mt-5" align="center" justify="center">
                                <v-col v-for="(tracking, i) in trackings" :key="i" cols="auto">
                                    <v-card class="mx-auto" max-width="344" :tracking="tracking" color="#3CB371">
                                        <v-card-item>
                                            <div>
                                                <div class="text-h6 mb-1">Seguimiento {{ tracking.id }}
                                                </div>
                                            </div>
                                        </v-card-item>
                                        <v-card-actions class="text-center">
                                            <v-btn class="mx-auto" variant="outlined">
                                                Visualizar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-divider class="border-opacity-50" :thickness="6" color="#3CB371"></v-divider>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <h2 style="color:grey">Clima de hoy
                                    </h2>
                                    <v-card class="mx-auto" max-width="368">
                                        <v-card-text class=" py-0">
                                            <v-row align="center" no-gutters>
                                                <v-col class="text-h2" cols="6">
                                                    {{ Math.round(weather.temp) }} &deg;C
                                                </v-col>

                                                <v-col cols="6" class="text-right">
                                                    <v-icon color="#3CB371" icon="mdi-weather-cloudy-clock"
                                                        size="88"></v-icon>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>

                                        <div class="d-flex py-3 justify-space-between">
                                            <v-list-item density="compact" prepend-icon="mdi-weather-windy">
                                                <v-list-item-subtitle> {{ Math.round(weather.wind)
                                                }} km/h</v-list-item-subtitle>
                                            </v-list-item>

                                            <v-list-item density="compact" prepend-icon="mdi-water-outline">
                                                <v-list-item-subtitle>{{ weather.hum
                                                }}</v-list-item-subtitle>
                                            </v-list-item>
                                        </div>

                                        <div class="d-flex py-3 justify-space-between">
                                            <v-list-item density="compact" prepend-icon="mdi-cloud-outline">
                                                <v-list-item-subtitle>{{ weather.clouds
                                                }}</v-list-item-subtitle>
                                            </v-list-item>
                                        </div>
                                    </v-card>
                                    <v-btn class="mt-2" color="#3CB371" dark block tile>Agregar seguimiento</v-btn>
                                    <v-btn class="mt-2" color="#3CB371" dark block tile>Detalles cultivo</v-btn>
                                </v-col>
                                <v-col cols="8" sm="6">
                                    <h2 style="color:grey">Información de cultivo
                                    </h2>
                                    <h4 style="color:grey">Etapa actual del cultivo
                                    </h4>
                                    <v-text-field class="mt-3" outlined dense color="#3CB371" autocomplete="false"
                                        readonly></v-text-field>
                                    <h4 style="color:grey">Estado del suelo
                                    </h4>
                                    <v-text-field class="mt-3" outlined dense color="#3CB371" autocomplete="false"
                                        readonly></v-text-field>
                                    <h4 style="color:grey">Fecha de Seguimiento
                                    </h4>
                                    <v-text-field class="mt-3" outlined dense color="#3CB371" autocomplete="false"
                                        readonly></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-divider class="border-opacity-50" :thickness="6" color="#3CB371"></v-divider>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-btn class="mt-2" color="#3CB371" dark block tile>Registrar eventualidad</v-btn>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-btn class="mt-2" color="#3CB371" dark block tile>Editar datos</v-btn>
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
// import { useRouter } from 'vue-router';
export default {
    name: 'FollowGrowth',
    setup() {
        // const token = localStorage.getItem('token');

        // const checkCredentials = () => {
        //     if (localStorage.length === 0 || !token) {
        //         alert('Token de inicio de sesión no encontrado')
        //         useRouter().push('/');
        //     }
        // }

        // checkCredentials();
    },
    data: () => ({
        step: 1,
        due: null,
        trackings: [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" }
        ],
        weather: {
            city: {
                id: 3666608,
                name: 'Tunja',
                coord: { lat: 5.5227, lon: -73.3645 },
                country: 'CO',
                population: 13521321,
                timezone: -180000,
                sunrise: 3165315631,
                sunset: 17302305
            },
            temp: 10.610000021361,
            hum: '99%',
            wind: 2.926215213,
            clouds: 'Lluvia ligera'
        },
    }),
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
</style>