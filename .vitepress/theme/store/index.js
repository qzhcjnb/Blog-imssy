import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      // 主题类别
      themeType: "auto",
      // 加载状态
      loadingStatus: true,
      // 滚动高度
      scrollData: {
        // 滚动高度
        height: 0,
        // 滚动百分比
        percentage: 0,
        // 滚动方向
        direction: "down",
      },
      // 中控台显示
      controlShow: false,
    };
  },
  getters: {},
  actions: {
    // 切换中控台显示
    changeControlShow() {
      this.controlShow = !this.controlShow;
      // 阻止滚动
      document.body.style.overflow = this.controlShow ? "hidden" : "";
    },
  },
  // 数据持久化
  persist: [
    {
      key: "siteData",
      paths: ["themeType"],
    },
  ],
});
