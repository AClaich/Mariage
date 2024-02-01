import './assets/main.css';

import { createApp } from 'vue';
// import { createStore } from 'vuex';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
// import store from './store';
import { createPinia } from 'pinia';

const app = createApp(App)

app.use(router)
app.use(Antd);
app.use(createPinia());

app.mount('#app')
