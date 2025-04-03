import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/route'
import PrimeVue from 'primevue/config'
import AnimateOnScroll from 'primevue/animateonscroll'
// import 'animate.css/animate.min.css'

const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.directive('animateonscroll', AnimateOnScroll)
app.mount('#app')


// createApp(App).use(router).mount('#app')
