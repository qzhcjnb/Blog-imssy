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
      // 播放器数据
      playState: false,
      playerShow: true,
      playerData: {
        name: "未知曲目",
        artist: "未知艺术家",
      },
      // 移动端菜单显示
      mobileMenuShow: false,
      // 使用自定义右键菜单
      useRightMenu: true,
      // 背景模糊
      backgroundBlur: false,
    };
  },
  getters: {},
  actions: {
    // 切换应用状态
    changeShowStatus(value, blur = true) {
      this[value] = !this[value];
      // 阻止滚动
      document.body.style.overflow = this[value] ? "hidden" : "";
      // 全局模糊
      const globalApp = document.getElementById("app");
      this[value] && this.backgroundBlur && blur
        ? globalApp.classList.add("blur")
        : globalApp.classList.remove("blur");
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
