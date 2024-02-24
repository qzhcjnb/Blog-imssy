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
      // 搜索框显示
      searchShow: false,
      // 使用自定义右键菜单
      useRightMenu: true,
    };
  },
  getters: {},
  actions: {
    // 切换应用状态
    changeShowStatus(value) {
      this[value] = !this[value];
      // 阻止滚动
      document.body.style.overflow = this[value] ? "hidden" : "";
      // 全局模糊
      const globalApp = document.getElementById("app");
      this[value] ? globalApp.classList.add("blur") : globalApp.classList.remove("blur");
    },
  },
  // 数据持久化
  persist: [
    {
      key: "siteData",
      paths: ["themeType", "useRightMenu"],
    },
  ],
});
