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
                <v-row justify="center" align="center">
                    <v-col cols="auto">
                        <router-link to="/">
                            <v-btn class="custom-button" density="compact" variant="text">Inicio</v-btn>
                        </router-link>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="custom-button" density="compact" variant="text">Acerca</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="custom-button" density="compact" variant="text">Soporte</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <router-link to="/login">
                            <v-btn style="background-color: #3CB371; color: white" density="compact"
                                variant="text">Ingresar</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
                <v-row class="mt-10">
                    <v-carousel show-arrows="hover" progress="#3CB371" hide-delimiters>
                        <v-carousel-item
                            src="https://images.unsplash.com/photo-1567547921486-f280c2f53b5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            cover></v-carousel-item>

                        <v-carousel-item
                            src="https://bonnieplants.com/cdn/shop/articles/BONNIE-PLANTS_corn-iStock-857670630-2400px_1ce4b5df-20b7-433c-acde-8703235c66be.jpg?v=1642542000"
                            cover></v-carousel-item>

                        <v-carousel-item
                            src="https://media.post.rvohealth.io/wp-content/uploads/2020/08/1200x628_FACEBOOK_is-corn-a-vegetable-1200x628.jpg"
                            cover></v-carousel-item>
                    </v-carousel>
                </v-row>
                <v-row class="mt-10">
                    <v-col class="text-center">
                        <h1>¿Cómo podemos ayudarte?</h1>
                    </v-col>
                    <v-divider class="border-opacity-50" :thickness="6" color="#3CB371"></v-divider>
                </v-row>
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-card-text class="mt-3">
                                        <v-img :src="require('../assets/crop_management.png')" class="my-3" contain
                                            height="50" />
                                        <h1 class="text-center">Gestión de cultivos</h1>
                                        <br>
                                        <h4 style="color:grey">Proporciona información detallada sobre los cultivos, permite
                                            seguir su crecimiento y registra datos climáticos y del suelo, ayudando a los
                                            agricultores a tomar decisiones informadas y optimizar sus operaciones
                                        </h4>
                                    </v-card-text>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-card-text class="mt-3">
                                        <v-img :src="require('../assets/crop_report.png')" class="my-3" contain
                                            height="50" />
                                        <h1 class="text-center">Análisis y Reportes</h1>
                                        <br>
                                        <h4 style="color:grey">Generación de informes detallados sobre el progreso de los
                                            cultivos, rendimientos de cultivos y datos climáticos.
                                        </h4>
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


export default {
    name: 'HomePage',
    data: () => ({
        step: 1,
    })
};
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
    color: black;
    /* Cambia el color del texto a negro o el color deseado */
    text-decoration: none;
    /* Evita el subrayado del texto */
}

/* Estilo para los botones cuando se seleccionan */
.custom-button:hover {
    color: none;
    /* Cambia el color del texto al seleccionar el botón */
}
</style>