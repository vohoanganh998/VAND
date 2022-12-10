import { createApp } from 'vue'
import App from './layouts/App.vue'
import router from "./router.js";
import { store } from "./store";
    
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

const app = createApp(App);

app.use(router);
app.use(store)
app.mount("#app");
