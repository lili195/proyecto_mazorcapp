<template>
    <div>
        <h1>Seguimiento de {{ id_crop }}</h1>
    </div>

</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const token = localStorage.getItem('token');
import { ref } from 'vue';
const crops = ref([]);
//const cropId = parseInt(router.currentRoute.value.params.id);

const checkCredentials = () => {
    if (localStorage.length === 0 || !token) {
        alert('Token de inicio de sesión no encontrado')
        router.push('/');
    }
}

checkCredentials();

const getCrops = async () => {
    try {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.get('http://localhost:3000/followGrowth/cropsInfo/:id_crop}', config);
        let data = response.data
        console.log(data);
        crops.value = data
    } catch (error) {
        console.error(error.response);
        alert('No se pudo obtener la información de los cultivos.');
    }
};

onMounted(() => {
    getCrops();
});
</script>