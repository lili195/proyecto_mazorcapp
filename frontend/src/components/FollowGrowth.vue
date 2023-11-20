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
                        <v-btn class="custom-button" density="compact" crop="elevated">
                            <v-icon>mdi-seed</v-icon> Registrar Cultivo
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn style="background-color: #99cc66; color: white;" density="compact" crop="elevated">
                            <v-icon>mdi-chart-line</v-icon> Seguimiento
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="custom-button" density="compact" crop="elevated">
                            <v-icon>mdi-file-chart</v-icon> Informes
                        </v-btn>
                    </v-col>
                </v-row>
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1" class="mb-10">
                            <h1 class="mt-5">Mis cultivos</h1>
                            <h3 style="color:grey">Mantén tus cultivos al día
                            </h3>
                            <v-row class="mt-5" align="center" justify="center">
                                <v-col v-for="(crop, i) in crops" :key="i" cols="auto">
                                    <v-card class="mx-auto" max-width="344" :crop="crop" color="#3CB371">
                                        <v-card-item>
                                            <div>
                                                <div class="text-h6 mb-1">
                                                    {{ crop.name }}
                                                </div>
                                                <div class="text-overline">
                                                    {{ crop.date }}
                                                </div>
                                            </div>
                                        </v-card-item>
                                        <v-card-actions class="text-center">
                                            <v-btn class="mx-auto" variant="outlined">
                                                Ver Seguimientos
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
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
        crops: [
            { name: "Cultivo 1", date: "19/11/2023" },
            { name: "Cultivo 2", date: "19/11/2023" },
            { name: "Cultivo 3", date: "19/11/2023" },
            { name: "Cultivo 4", date: "19/11/2023" }
        ]
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