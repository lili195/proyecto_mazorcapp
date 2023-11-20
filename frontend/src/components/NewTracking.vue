<template>
    <h1 class="text-center">Registra un nuevo seguimiento</h1>
    <v-form>
        <v-row>
            <v-text-field label="Nombre de Seguimiento" outlined dense color="#3CB371" autocomplete="false" class="mt-16"
                v-model="id_tracking"></v-text-field>
            <v-col cols="12">
                <v-text-field label="Fecha" v-model="fecha" type="date"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-select label="Etapa del cultivo" v-model="etapa" :items="etapas"></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-select label="Estado del suelo" v-model="suelo" :items="suelos"></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn color="#3CB371" @click="submitTracking">Guardar</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
  
<script>
import { useRouter } from 'vue-router';
const router = useRouter();
const token = localStorage.getItem('token');

const checkCredentials = () => {
    if (localStorage.length === 0 || !token) {
        alert('Token de inicio de sesión no encontrado')
        router.push('/');
    }
}

checkCredentials();

const etapas = [
    "Siembra",
    "Germinación",
    "Desarrollo",
    "Floración",
];

const suelos = [
    "Seco",
    "Húmedo",
    "Inundado",
]
export default {
    data() {
        return {
            etapas,
            suelos,
            id_tracking: '',
            fecha: new Date(),
            etapa: etapas[0],
            suelo: suelos[0],
        };
    },
    methods: {
        submitTracking() {
            console.log(this.id_tracking,this.fecha, this.etapa, this.suelo)
        },
    },
};
</script>
  
