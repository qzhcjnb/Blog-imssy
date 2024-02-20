// PWA
const messageSW = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        // 当更新发现时
        registration.addEventListener("updatefound", () => {
          // 获得新的Service Worker
          const newWorker = registration.installing;
          // 监听新的Service Worker状态变化
          newWorker.addEventListener("statechange", () => {
            switch (newWorker.state) {
              case "installing":
                console.info("Service worker 正在安装");
                break;
              case "installed":
                console.info("Service worker 已安装待激活");
                break;
              case "activating":
                console.info("Service worker 正在激活");
                $message.info("站点资源正在更新，请不要关闭页面", 8000);
                break;
              case "activated":
                console.info("Service worker 已激活。");
                $message.warning("站点资源有更新，请刷新以应用更新", 8000);
                break;
              case "redundant":
                console.info("Service worker 缓存失效");
                $message.error("站点缓存已失效，请刷新页面或稍后再试");
                break;
            }
          });
        });
      } catch (error) {
        console.error(`Service worker 注册失败：${error}`);
      }
    });
  }
};

export default messageSW;
