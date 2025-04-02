import { createApp } from 'vue'
import './style.css'
import App from './page/Home.vue'
import router from './routes/route'

createApp(App).use(router).mount('#app')
