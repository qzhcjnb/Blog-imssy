import { h } from "vue";
import { createPinia } from "pinia";
import { routerTools } from "@/utils/initTools.mjs";
// import Theme from "vitepress/theme";

// 根组件
import App from "@/App.vue";
// 全局样式
import "@/style/main.scss";

// pinia
const pinia = createPinia();

/** @type {import('vitepress').Theme} */
export default {
  // extends: Theme,
  Layout: () => {
    return h(App);
  },
  enhanceApp({ app, router, siteData }) {
    // 挂载
    app.use(pinia);
    // 路由守卫
    router.onBeforeRouteChange = (to, from) => {
      routerTools("before", to, from);
    };
    router.onAfterRouteChanged = () => {
      routerTools("after");
    };
  },
};
