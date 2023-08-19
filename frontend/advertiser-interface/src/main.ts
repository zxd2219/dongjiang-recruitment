import { request } from "@dongjiang-recruitment/service-common";
import { createPinia } from "pinia";
import PiniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/style.scss";

const app = createApp(App);

request.config.BASE = import.meta.env.VITE_BASE_URL;

app.use(createPinia().use(PiniaPluginPersist));
app.use(router);

app.mount("#app");
