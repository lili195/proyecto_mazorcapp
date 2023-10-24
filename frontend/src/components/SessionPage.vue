<template>
    <h1>Hola! Bienvenido de nuevo</h1>
    <div></div>
    <p>
        <router-link to="/cropNew">Nuevo Cultivo</router-link>
    </p>
</template>
<script>

export default {
    name: 'SessionPage',
    created() {
        //usuario no autorizado
        if (localStorage.getItem('token') === null) {
            this.$router.push('/login');
        }
    }
};
</script>