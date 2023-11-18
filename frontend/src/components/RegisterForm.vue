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
                        <router-link to="/">
                            <v-btn class="custom-button" density="compact" variant="text">Inicio</v-btn>
                        </router-link>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="custom-button" density="compact" variant="text">Acerca</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="custom-button" density="compact" variant="text">Soporte</v-btn>
                    </v-col>
                </v-row>
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item>
                            <v-row>
                                <v-col cols="12" sm="6" class="rounded-br-xl custom-color">
                                    <div style="text-align: center;padding: 180px 0;">
                                        <v-card-text class="white--text">
                                            <h1 class="text-center" style="color: white;">¿Ya estás registrado?</h1>
                                            <h3 class="text-center" style="color: whitesmoke;"><br>Ingresa a tu cuenta para
                                                poder gestionar tus cultivos de mazorca</h3>
                                        </v-card-text>
                                        <div class="text-center">
                                            <router-link to="/login">
                                                <v-btn style="color:white" variant="outlined">Ingresar</v-btn>
                                            </router-link>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-card-text class="mt-12">
                                        <h1 class="text-center">Registra tu cuenta</h1>
                                        <h3 class="text-center" style="color:grey"><br>Registra tus datos para comenzar
                                            una nueva experiencia</h3>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8">
                                                <v-text-field label="Cédula" outlined dense color="#3CB371"
                                                    autocomplete="false" class="mt-8"></v-text-field>
                                                <v-text-field label="Primer nombre" outlined dense color="#3CB371"
                                                    autocomplete="false"></v-text-field>
                                                <v-text-field label="Celular" outlined dense color="#3CB371"
                                                    autocomplete="false"></v-text-field>
                                                <v-text-field label="Contraseña" outlined dense color="#3CB371"
                                                    autocomplete="false" v-model="password"
                                                    :type="showPassword ? 'text' : 'password'"
                                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                    @click:append="togglePasswordVisibility"></v-text-field>
                                                <v-text-field label="Confirmar contraseña" outlined dense color="#3CB371"
                                                    autocomplete="false" v-model="confirm"
                                                    :type="showPassword ? 'text' : 'password'"
                                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                    @click:append="togglePasswordVisibility"></v-text-field>
                                                <v-btn v-on:click="register" color="#3CB371" dark block
                                                    tile>Registrarse</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, minLength, maxLength, sameAs, numeric, helpers } from '@vuelidate/validators'
import axios from 'axios';
import { computed, reactive } from 'vue';
//import { useRouter } from 'vue-router';

export default {
    name: 'RegisterForm',

    setup() {
        const state = reactive({
            cc: '',
            name: '',
            number: '',
            password: {
                password: '',
                confirm: '',
            },

			error: ''
		})

		const minLengthCC = minLength(7)
		const minLengthNum = minLength(10)
		const minLengthPassword = minLength(6)

		const maxLengthCC = maxLength(10)
		const maxLengthNum = maxLength(10)
		
		const rules = computed(() => {
			return {
				cc: {
					required: helpers.withMessage('Debe ingresar su cédula', required),
					minLength: helpers.withMessage('La cédula debe ser de al menos 7 dígitos', minLengthCC),
					numeric: helpers.withMessage('Debe ingresar dígitos numéricos', numeric),
					maxLength: helpers.withMessage('Máximo 10 dígitos', maxLengthCC)
				},
				name: { required: helpers.withMessage('Debe ingresar su nombre', required) },
				number: {
					required: helpers.withMessage('Número no válido', required),
					minLength: helpers.withMessage('El número debe ser de al menos 10 dígitos', minLengthNum),
					numeric: helpers.withMessage('Número no válido', numeric),
					maxLength: helpers.withMessage('Máximo 10 dígitos', maxLengthNum)
				},
				password: {
					password: {
						required: helpers.withMessage('Contraseña no válida', required),
						minLength: helpers.withMessage('La constraseña debe ser de al menos 6 caracteres', minLengthPassword)
					},
					confirm: {
						required: helpers.withMessage('Las contraseñas no coinciden', required),
						sameAs: helpers.withMessage('Las contraseñas no coinciden', sameAs(state.password.password)),
					}
				}
			}
		})

		const v$ = useValidate(rules, state)

        return {
            state,
            v$
        }
    },
    methods: {
        submitRegister() {
            this.v$.$validate()
            if (!this.v$.$error) {
                const userData = {
                    cc: this.state.cc,
                    name: this.state.name,
                    number: this.state.number,
                    password: this.state.password.password,
                };
                axios.post('http://localhost:3000/register', userData)
                    .then(response => {
                        console.log(response.data);
                        alert('Datos guardados con éxito')
                        this.$router.push({ name: 'LogIn' })
                    }, err => {
                        console.log(err.response)
                        this.state.error = err.response.data.error
                    })
            } else {
                alert('Datos no correctos')
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
    data() {
        return {
            password: '',
            showPassword: false,
            step: 1,
        };
    },
    props: {
        source: String,
    },
}
</script>

<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}

.custom-color {
    background-color: #3CB371;
    /* Cambia el color a tu preferencia */
    /* Otras propiedades de estilo si es necesario */
}

.custom-button {
    color: black;
    /* Cambia el color del texto a negro o el color deseado */
    text-decoration: none;
    /* Evita el subrayado del texto */
}

/* Estilo para los botones cuando se seleccionan */
.custom-button:hover {
    color: none;
    /* Cambia el color del texto al seleccionar el botón */
}
</style>