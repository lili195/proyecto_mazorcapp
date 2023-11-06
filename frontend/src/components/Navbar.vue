<template>
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
				<router-link to="/">Añadir descripción</router-link>
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
import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from "./HomePage.vue";
import RegisterForm from "./RegisterForm.vue";
import LogIn from "./LogIn.vue";
import SessionPage from "./SessionPage.vue"
import CropNew from "./CropNew.vue";

Vue.use(VueRouter);

/*const HomePage = { template: '<div>Inicio</div>'}
const CropNew = { template: '<div>Registrar cultivo</div>'}
const Description = { template: '<div>Añadir descripción</div>'}
const Login = { template: '<div>Iniciar sesión</div>'}
const RegisterForm = { template: '<div>Registrarse</div>'}*/

const routes = [
{
	path: '/',
	component: HomePage,
},
{
	path: '/login',
	component: LogIn,
},
{
	path: '/register',
	component: RegisterForm,
},
{
	path: '/session',
	component: SessionPage,
},
{
	path: '/cropNew',
	component: CropNew,
}
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
});

const app = Vue.createApp({})
app.use(router)

app.mount('#app')

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