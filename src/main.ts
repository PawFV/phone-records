import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
const app = createApp(App)

app.use(store).use(PrimeVue).use(ToastService)

app.mount('#app')
