import { request } from "@dongjiang-recruitment/service-common";
import uniPersist from "pinia-plugin-persist-uni";
import { createSSRApp } from "vue";
import App from "./App.vue";

import "./style.scss";

const pinia = createPinia();
pinia.use(uniPersist);

request.config.BASE = import.meta.env.VITE_BASE_URL;

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
