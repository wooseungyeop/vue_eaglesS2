import './assets/css/Lee-css.css'
import './assets/css/reset.css'
import './assets/css/font.css'
import './assets/js/video.js'
import './assets/css/mainmenu-popup.css'
import './assets/css/payment.css'
import router from './router';
// import './components/mainMenu/MainMenu_PopUp-List/MainMenu_PopUp-List.vue'
// import './components/mainMenu/MainMenu_PopUp-Overlay/MainMenu_PopUp-Overlay.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
