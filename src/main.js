import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// hardhat builds
import ShellToken from "../hardhat/artifacts/contracts/ShellToken.sol/ShellToken.json";

const app = createApp(App)
app.config.globalProperties.$ShellToken = ShellToken
app.config.globalProperties.$shellTokenAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'

app.use(createPinia())
app.use(router)

app.mount('#app')
