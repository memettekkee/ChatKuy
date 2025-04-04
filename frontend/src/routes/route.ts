import { createRouter, createWebHistory } from "vue-router";
import Home from "../page/Home.vue";
import Login from "../page/Login.vue";
import Register from '../page/Register.vue';
import ChatLayout from "../page/ChatLayout.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChatLayout
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
