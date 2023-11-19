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
                        <v-btn density="compact" variant="text">Inicio</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn density="compact" variant="text">Acerca</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn density="compact" variant="text">Soporte</v-btn>
                    </v-col>
                </v-row>
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-card-text class="mt-12">
                                        <h1 class="text-center">Ingresa a tu cuenta</h1>
                                        <br>
                                        <h3 style="color:grey">Ingresa a tu cuenta para gestionar tus cultivos
                                        </h3>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8">
                                                <v-text-field label="Cédula" outlined dense color="#3CB371"
                                                    autocomplete="false" class="mt-16" v-model="state.cc"></v-text-field>
                                                <span v-if="v$.cc.$error">
                                                    {{ v$.cc.$errors[0].$message }}
                                                </span>
                                                <v-text-field label="Contraseña" outlined dense color="#3CB371"
                                                    autocomplete="false" v-model="state.password"
                                                    :type="showPassword ? 'text' : 'password'"
                                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                    @click:append="togglePasswordVisibility"></v-text-field>
                                                <!-- <v-row>
                                                    <v-col cols="12" sm="7">
                                                        <v-checkbox label="Recuérdame" class="mt-n1"
                                                            color="#3CB371"></v-checkbox>
                                                    </v-col>
                                                    <v-col cols="12" sm="5">
                                                        <span style="color: green;">Recuperar contraseña</span>
                                                    </v-col>
                                                </v-row> -->
                                                <v-btn v-on:click="login" color="#3CB371" dark block tile>Ingresar</v-btn>
                                                <p>
                                                    <span style="color: red; font-size: larger;">{{ state.error }}</span>
                                                </p>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-col>
                                <v-col cols="12" sm="6" class="custom-color rounded-bl-xl">
                                    <div style="text-align: center; padding: 180px 0;">
                                        <v-card-text>
                                            <h1 class="text-center" style="color: white;">¿Aún no tienes una cuenta?</h1>
                                            <h3 class="text-center" style="color: whitesmoke;"><br>Crea una cuenta para
                                                poder
                                                gestionar tus cultivos de mazorca y tener un gran experiencia</h3>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn style="color:white" variant="outlined"
                                                @click="step++">Registrarse</v-btn>
                                        </div>
                                    </div>
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
import { computed, reactive } from 'vue';
import { required, minLength, maxLength, numeric, helpers } from '@vuelidate/validators'
import axios from 'axios';

export default {
    name: 'LogIn',
    setup() {
        const state = reactive({
            cc: null,
            password: null,
            error: ''
        })

        const minLengthCC = minLength(7)
        const minLengthPassword = minLength(6)
        const maxLengthCC = maxLength(10)

        const rules = computed(() => {
            return {
                cc: {
                    required: helpers.withMessage('Debe ingresar su cédula', required),
                    minLength: helpers.withMessage('La cédula debe ser de al menos 7 dígitos', minLengthCC),
                    numeric: helpers.withMessage('Debe ingresar dígitos numericos', numeric),
                    maxLength: helpers.withMessage('Máximo 10 dígitos', maxLengthCC)
                },
                password: {
                    required: helpers.withMessage('Debe ingresar su contraseña', required),
                    minLength: helpers.withMessage('La constraseña debe ser de al menos 6 caracteres', minLengthPassword)
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
        async login() {
            this.v$.$validate()
            if (!this.v$.$error) {
                axios.post('http://localhost:3000/login', {
                    cc: this.state.cc,
                    password: this.state.password,
                }).then((response) => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('id_person', response.data.id_person)
                    this.$router.push('/session');
                }).catch((err) => {
                    console.log(err.response)
                    this.state.error = err.response.data.error
                })
            } else {
                alert('No fue posible iniciar sesión :(')
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
            step: 1
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
</style>