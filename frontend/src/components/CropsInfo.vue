<template>
    <v-container>
        <v-row class="followGrowth">
            <v-col>
                <img img :src="require('../assets/mazorcapp_banner.png')" alt="Mazorcapp banner">
            </v-col>
        </v-row>

        <v-row id="title">
            <v-col>
                <h1 id="t">Información</h1>
            </v-col>
            <v-col>
                <v-btn @click="edit">Editar</v-btn>
            </v-col>
        </v-row>

        <v-row id="contenido">
            <v-col>
                <v-row class="cultivos">
                    <v-col v-for="crop in crops" :key="crop.id_crop" @click="goToEditCrop(crop.id_crop)">
                        <v-card class="crop-item">
                            <v-card-text>
                                <h1>ID: {{ crop.id_crop }}</h1>
                                <p>N° plantas {{ crop.plants_totalNum_crop }}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
//import axios from 'axios';
//import { ref } from 'vue';
const router = useRouter();
const token = localStorage.getItem('token');
//const crops = ref([]);

const checkCredentials = () => {
    if (localStorage.length === 0 || !token) {
        alert('Token de inicio de sesión no encontrado')
        router.push('/');
    }
}

checkCredentials();

const goToEditCrop = (id_crop) => {
    router.push(`/followGrowth/cropsInfo/editCrop/${id_crop}`);
}

const getCrops = async () => {
    // try {
    //     // const config = {
    //     //     headers: {
    //     //         'Authorization': token,
    //     //         'Content-Type': 'application/json'
    //     //     }
    //     // };
    //     // const response = await axios.get('http://localhost:3000//followGrowth/cropsInfo/:id_crop}', config);
    //     // let data = response.data
    //     // console.log(data);
    //     // crops.value = data
    // } catch (error) {
    //     console.error(error.response);
    //     alert('No se pudo obtener la información de los cultivos.');
    // }
};

onMounted(() => {
    getCrops();
});
</script>

<style scoped>
.followGrowth label {
    font-family: KoHo, sans-serif;
    font-size: larger;
    width: 400px;
    height: 20px;
    display: block;
    margin-bottom: 5px;
    margin-right: auto;
    margin-left: auto;
}

.followGrowth button {
    color: aliceblue;
    font-family: KoHo, sans-serif;
    font-size: larger;
    width: 320px;
    height: 40px;
    border: 1px solid mediumspringgreen;
    background-color: mediumseagreen;
    cursor: pointer;
}

.followGrowth input {
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

#contenido {
    margin: 1%;
    margin-bottom: 0;
    background-color: whitesmoke;
    height: 45vh;
    width: 98%;
    border-radius: 3%;
    border-bottom: 0%;
    overflow-y: auto;
}

.cultivo-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}

.cultivos {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.crop-item {
    width: 30%;
    margin: 1%;
    padding: 2vw;
    background-color: whitesmoke;
    text-align: center;
    border-radius: 1vw;
    margin-right: 7vw;
    margin-left: 6vw;
    height: 10vh;
    font-size: 100%;
    cursor: pointer;
}

.crop-item:hover {
    transform: scale(1.1);
}

.buttons {
    background-color: #fee1cc;
    margin: 1%;
    margin-top: 0;
    width: 98%;
    display: flex;
    justify-content: space-around;
    border-bottom-left-radius: 3%;
    border-bottom-right-radius: 3%;
    height: 15%;
}
</style>