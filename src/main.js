import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './storesPinia/index'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import UIComponents from './components/UI'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(UIComponents)
app.mount('#app')
