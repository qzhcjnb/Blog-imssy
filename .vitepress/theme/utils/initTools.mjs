import { mainStore } from "@/store";
import { jumpRedirect } from "./commonTools.mjs";

// 必要数据
let loadingTimer = null;
let lastPathName = null;

/**
 * 判断是否即将导航到的地址和当前地址是相同页面
 * @return {boolean} 为 true 时表示是相同页面
 */
export const isSamePage = (to) => {
  if (typeof window === "undefined") return false;
  // 获取跳转到的页面路径
  const toURL = new URL(to, window.location.origin);
  const targetPathWithoutHash = toURL.pathname;
  // 获取当前页面的路径
  const currentURL = new URL(window.location.href);
  const currentPathWithoutHash = currentURL.pathname;

  console.log("当前的路径：", currentPathWithoutHash);
  console.log("即将导航到的路径：", targetPathWithoutHash);

  return targetPathWithoutHash === currentPathWithoutHash;
};

// 路由跳转前
export const routeChange = (type, to) => {
  if (typeof window === "undefined") return false;
  console.log("触发", type, to);
  // 跳转前
  if (type === "before") {
    const isSame = isSamePage(to);
    changeLoading({
      status: true,
      close: isSame,
    });
    // 更改上次路径
    lastPathName = new URL(to, window.location.origin).pathname;
  }
  // 跳转后
  else if (type === "after") {
    const isSame = isSamePage(to);
    const pathName = new URL(to, window.location.origin).pathname;
    if (isSame && lastPathName === pathName) {
      console.log("页面未变化");
      return false;
    } else {
      console.log("跳转了");
      changeLoading({
        status: true,
        close: isSame,
      });
    }
    // 更改上次路径
    lastPathName = new URL(to, window.location.origin).pathname;
  }
};

// 切换加载状态
const changeLoading = (option = {}) => {
  // pinia
  const store = mainStore();
  // 获取配置
  const { status = true, close = false } = option;
  // 立即结束
  if (close && !status) {
    store.loadingStatus = false;
    return;
  }
  // 开始加载
  store.loadingStatus = status;
  // 随机延时结束
  loadingTimer = setTimeout(
    () => {
      console.log("加载动画延时结束");
      store.loadingStatus = false;
      // 替换链接
      jumpRedirect(null, true);
      // 清除定时器
      clearTimeout(loadingTimer);
    },
    Math.floor(Math.random() * (800 - 260 + 1)) + 260,
  );
};
