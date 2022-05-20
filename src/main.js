import { createApp } from 'vue'
import './styles/index.css'
import 'uno.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'


const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(autoAnimatePlugin)

app.mount('#app')
