import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const name = t("中{}文", t("文本") ? true : false);

createApp(App).mount("#app");
