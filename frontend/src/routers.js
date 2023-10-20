import HomePage from "./components/HomePage.vue";
import RegisterForm from "./components/RegisterForm.vue";
import LogIn from "./components/LogIn.vue";
import SessionPage from "./components/SessionPage"
import CropNew from "./components/CropNew.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/'
    },
    {
        name: 'LogIn',
        component: LogIn,
        path: '/login'
    },
    {
        name: 'RegisterForm',
        component: RegisterForm,
        path: '/register'
    },
    {
        name: 'SessionPage',
        component: SessionPage,
        path: '/session'
    },
    {
        name: 'CropNew',
        component: CropNew,
        path: '/cropNew'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
