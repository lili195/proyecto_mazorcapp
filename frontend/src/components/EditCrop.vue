<template>
    <div style="text-align: center">
        <v-img :src="require('../assets/mazorcapp_banner.png')" class="my-3" contain height="50" />
    </div>
    <h1 class="text-center">Editar datos de mi cultivo</h1>
    <h2 style="color:grey">Puedes modificar todo menos la ubicación de tu cultivo
    </h2>
    <br>
    <div>
        <v-container>
            <v-form v-model="valid">
                <v-text-field class="mt-10" label="Fecha de siembra" prepend-icon="date_range" type="date"
                    v-model="crop.start_date" outlined dense color="#3CB371"
                    :rules="[v => !!v || 'Por favor elija una fecha']"></v-text-field>
                <v-text-field label="Identificador del cultivo" outlined dense color="#3CB371" autocomplete="false"
                    v-model="crop.id_crop" :rules="[v => !!v || 'Por favor ingrese un identificador']"></v-text-field>
                <p>
                    <span style="color: red; font-size: larger;">{{ crop.error }}</span>
                </p>
                <v-text-field label="Área total del cultivo (m2)" outlined dense color="#3CB371" autocomplete="false"
                    v-model="crop.area" :rules="[v => !!v || 'Por favor ingrese el area de cultivo']"></v-text-field>
                <v-select label="Cantidad de plantas por m2" outlined dense color="#3CB371" :items="['2', '3', '4']"
                    v-model="crop.plants_m2" :rules="plantsM2Rules"></v-select>
                <v-select label="Estado de cultivo" outlined dense color="#3CB371" :items="['A', 'F']"
                    v-model="crop.state" :rules="plantsM2Rules"></v-select>
                <v-row>
                    <v-col>
                        <v-btn v-on:click="updateTotalPlants" color="#3CB371">Obtener
                            total de plantas</v-btn>

                    </v-col>
                    <v-col>
                        <v-chip>{{ crop.plants_num }}</v-chip>
                    </v-col>
                </v-row>
                <v-btn color="#3CB371" @click="updateCrop">
                    Actualizar cultivo
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>
  
<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const id_crop = router.currentRoute.value.params.id_crop;

const valid = ref(true);

const crop = ref({
    id_crop: '',
    state: '',
    start_date: '',
    area: 0,
    plants_num: 0,
    plants_m2: 0,
});

const updateCrop = () => {
    // Validar el formulario
    if (!valid.value) {
        alert('Datos no correctos ');
    }
    // Actualizar el cultivo
    console.log(crop.value);
    const updateCrop = {
        id_crop: crop.value.id_crop,
        state: crop.value.state,
        start_date: crop.value.start_date,
        area: crop.value.area,
        plants_num: crop.value.plants_num,
        plants_m2: crop.value.plants_m2
    }
    axios.put(`http://localhost:3000/followGrowth/cropsInfo/editCrop/${id_crop}`, updateCrop)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            // Mostrar un error
            console.log(error);
        });
};

const updateTotalPlants = () => {
    crop.value.plants_num = parseInt(crop.value.area) * parseInt(crop.value.plants_m2);
    if (isNaN(crop.value.plants_num)) {
        crop.value.plants_num = 0;
    }
};
</script>

  