import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { createPinia } from "pinia";
import PiniaPluginPersist from "pinia-plugin-persist";
import VueECharts from "vue-echarts";
import App from "./App.vue";
import router from "./router";
// import "./styles/style.scss";

const pinia = createPinia();
pinia.use(PiniaPluginPersist);

createApp(App)
  .use(router)
  .use(pinia)
  .component("v-chart", VueECharts)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
