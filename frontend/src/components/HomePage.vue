<template>
    <p>
        <img alt="Title Img" src="../assets/tittleImg.png">
    </p>
    <div>
        <p>
            <router-link to="/login">Iniciar sesión</router-link>
        </p>

        <p>
            <router-link to="/register">Registro</router-link>
        </p>
        <p>
            <router-link to="/cropNew">Registrar cultivo</router-link>
        </p>
        <p>
            <router-link to="/followGrowth">Seguir crecimiento</router-link>
        </p>

    </div>
</template>
<script>

export default {
    name: 'HomePage'
};
</script>