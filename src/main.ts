import { createApp } from 'vue'
import App from './App.vue'
import router  from './router';
import store from './store/index'
import VueLoading from "vue-loading-overlay"
const app = createApp(App);
app.use(store);

app.use(router);
app.use(VueLoading);
app.mount('#app')
