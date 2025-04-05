import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import Home from "../page/Home.vue";
import Login from "../page/Login.vue";
import Register from '../page/Register.vue';
import ChatLayout from "../page/ChatLayout.vue";
// bikin satu lagi komponen klo di routenya gaaada 

const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token = localStorage.getItem('token');
    
    if (to.meta.requiresAuth && !token) {
      next('/login');
    } else {
      next();
    }
  }

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
        component: ChatLayout,
        meta: {
            requiresAuth: true // Mark this route as requiring authentication
        }
    },
    // {
    //     // 404 route - must be the last route
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: NotFound
    //   }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Add navigation guard
router.beforeEach(requireAuth)

export default router
