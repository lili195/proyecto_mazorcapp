<template>
    <div class="followGrowth">
        <h1>Seguimiento de Crecimiento</h1>
        <p>
            <img :src="require('../assets/corn_phenology.jpg')" alt="Imagen del proceso de maduración del maíz" />
        </p>

    </div>
</template>
  
<script setup>



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
</style>