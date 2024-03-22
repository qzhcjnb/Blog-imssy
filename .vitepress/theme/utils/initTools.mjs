import { mainStore } from "@/store";
import { jumpRedirect } from "@/utils/helper";

// 必要数据
let loadingTimer = null;

/**
 * 路由守卫实现
 */
export const routerTools = (type, to, from) => {
  try {
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
          // 更改页面链接
          jumpRedirect();
        },
        Math.floor(Math.random() * (800 - 260 + 1)) + 260,
      );
    }
  } catch (error) {
    console.error("路由守卫出现错误：", error);
  }
};
