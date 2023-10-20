import Vuelidate from 'vuelidate'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'



createApp(App).use(router).use(Vuelidate).mount('#app')
