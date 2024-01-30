import { mainStore } from "@/store";

// 必要数据
let loadingTimer = null;

/**
 * 路由守卫实现
 */
export const routerTools = (type, to, from) => {
  // pinia
  const store = mainStore();
  // beforeEach
  if (type === "before") {
    console.log("加载开始", to);
    clearTimeout(loadingTimer);
    store.loadingStatus = true;
  }
  // afterEach
  else {
    console.log("加载结束", loadingTimer);
    store.loadingStatus = true;
    loadingTimer = setTimeout(
      () => {
        console.log("加载动画延时结束");
        store.loadingStatus = false;
      },
      Math.floor(Math.random() * (800 - 260 + 1)) + 260,
    );
  }
};
