import { createApp } from "vue";
import App from "./App.vue";
// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
import { router } from './router/index.js';
// 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";
const app = createApp(App);
app.use(router);
app.use(NutUI).mount("#app");