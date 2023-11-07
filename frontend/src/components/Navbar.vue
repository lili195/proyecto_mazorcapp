<template>
	<v-container>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-row>
                    <v-col cols="12">
                        <div style="text-align: center">
                            <v-img :src="require('../assets/mazorcapp_banner.png')" class="my-3" contain height="50" />
                        </div>
                    </v-col>
                </v-row>
                <v-row justify="center" align="center">
                    <v-col cols="auto">
                        <v-btn to="/" density="compact" variant="text">Inicio</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn to="/cropNew" density="compact" variant="text">Registrar cultivo</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn to="/followGrowth" density="compact" variant="text">Añadir descripción</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
	<img alt="Vue logo" src="../assets/logo.png">
	<h1>MazorcApp</h1>
	<div class="nav">
		<ul>
			<li>
				<router-link to="/session">Inicio</router-link>
			</li>
			<li>
				<router-link to="/cropNew">Registrar cultivo</router-link>
			</li>
			<li>
				<router-link to="/followGrowth">Añadir descripción</router-link>
			</li>
			<li>
				<router-link to="/login">Iniciar sesión</router-link>
			</li>
			<li>
				<router-link to="/register">Registrarse</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'MyNavbar'
}
</script>

<style scoped>
.nav {
	background-color: mediumseagreen;
	color: aliceblue;
}

ul {
	list-style: none;
	padding: 0;
}

li {
	display: inline;
	margin: 0 10px;
}

a {
	text-decoration: none;
	color: aliceblue;
}
</style>