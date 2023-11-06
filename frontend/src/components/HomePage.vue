<template>
	<Navbar />
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
		
	</div>
</template>

<script>
import Navbar from './Navbar.vue';
export default {
	name: 'HomePage',
	components() {
		Navbar
	},
};
</script>