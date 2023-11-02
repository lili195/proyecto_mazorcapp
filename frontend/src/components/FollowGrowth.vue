<template>
    <div class="followGrowth">
        <h1>Seguimiento de Crecimiento</h1>
        <p>
            <img src="../assets/corn_phenology.jpg" alt="Imagen del proceso de maduración del maíz" />
        </p>
        <input v-model="descripcion" type="text" placeholder="Agregar descripción" />
        <button @click="agregarDescripcion">Guardar datos</button>
        <div>
            <p>
                <router-link to="/session">Volver a Inicio</router-link>
            </p>
        </div>
        <ul>
            <li v-for="(item, index) in descripciones" :key="index">{{ item }}</li>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'FollowGrowth',
    data() {
        return {
            descripcion: '',
            descripciones: [],
        };
    },
    methods: {
        agregarDescripcion() {
            if (this.descripcion) {
                this.descripciones.push(this.descripcion);
                this.descripcion = '';
            }
        },
    },
};
</script>

<style>
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
</style>