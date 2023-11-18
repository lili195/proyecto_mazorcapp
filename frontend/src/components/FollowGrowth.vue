<template>
    <div class="followGrowth">
        <h1>Seguimiento de Crecimiento</h1>
        <p>
            <img :src="require('../assets/corn_phenology.jpg')" alt="Imagen del proceso de maduración del maíz" />
        </p>
    </div>
    <div id="title">
        <h1 id="t">Mis cultivos</h1>
        <div id="contenido">
            <div class="cultivos">
                <div v-for="crop in crops" :key="crop.id_crop" class="crop-item" @click="goToCropInfo(crop.id_crop)">
                    <div class="cultivo-content">
                        <h1>ID: {{ crop.id_crop }}</h1>
                        <p>N° plantas {{ crop.plants_totalNum_crop }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
const router = useRouter();


const id_person = localStorage.getItem('id_person');
const crops = ref([]);

const goToCropInfo = (id_crop) => {
  router.push(`followGrowth/cropsInfo/${id_crop}`);
}

const fetchCrops = async () => {
    try {
        const response = await axios.get('http://localhost:3000/followGrowth', {
            params: {
                id_person: id_person
            }
        });
        let data = response.data
        console.log(data);
        crops.value = data
    } catch (error) {
        console.error(error.response);
        alert('No se pudo obtener la información de los cultivos.');
    }
};

onMounted(() => {
    fetchCrops();
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
  border: 2px solid mediumspringgreen;
}

.cultivo-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
</style>