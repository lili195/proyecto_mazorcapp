<template>
    <div>
        <h1>Seguimiento de Crecimiento</h1>
        <input v-model="descripcion" type="text" placeholder="Agregar descripción" />
        <button @click="agregarDescripcion">Agregar</button>
        <ul>
            <li v-for="(item, index) in descripciones" :key="index">{{ item }}</li>
        </ul>
    </div>
</template>
  
<script>
export default {
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
  