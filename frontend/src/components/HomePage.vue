<template>
    <p>
        <img img :src="require('../assets/mazorcapp_banner.png')" alt="Mazorcapp banner">
    </p>
    <div>
        <p>
            <router-link to="/login">Iniciar sesión</router-link>
        </p>

        <p>
            <router-link to="/register">Registro</router-link>
        </p>

    </div>
</template>
<script>

export default {
    name: 'HomePage'
};
</script>