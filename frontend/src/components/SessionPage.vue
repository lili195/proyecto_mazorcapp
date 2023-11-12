<template>
    <img img :src="require('../assets/mazorcapp_banner.png')" alt="Mazorcapp banner">
    <h1>Hola! Bienvenido de nuevo</h1>

    <h2>Con nuestra aplicación puedes: </h2>
    <p>
        <router-link to="/cropNew">Registrar un nuevo Cultivo</router-link>
    </p>
    <p>
        <router-link to="/followGrowth">Seguir crecimiento de tus cultivos</router-link>
    </p>
    <button v-on:click="logout">Cerrar sesión</button>
</template>

<script setup>


const logout = () => {
    localStorage.removeItem('token')
    this.$router.push('/session');
}
</script>