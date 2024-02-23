<template>
  <!-- 加载提示 -->
  <Loading />
  <!-- 中控台 -->
  <Control />
  <!-- 导航栏 -->
  <Nav />
  <!-- 主内容 -->
  <main :class="['mian-layout', { loading: store.loadingStatus }]">
    <!-- 404 -->
    <NotFound v-if="page.isNotFound" />
    <!-- 首页 -->
    <Home v-if="frontmatter.layout === 'home'" showHeader />
    <!-- 页面 -->
    <template v-else>
      <!-- 文章页面 -->
      <Post v-if="isPostPage" />
      <!-- 普通页面 -->
      <Page
        v-else-if="!page.isNotFound"
        :type="frontmatter.layout"
        :showAside="frontmatter.aside"
        :showComment="frontmatter.comment"
        :showPadding="frontmatter.padding" 
      />
    </template>
  </main>
  <!-- 页脚 -->
  <FooterLink v-show="!store.loadingStatus" :showBar="isPostPage && !page.isNotFound" />
  <Footer v-show="!store.loadingStatus" />
  <!-- 右键菜单 -->
  <RightMenu ref="rightMenuRef" />
  <!-- 全局消息 -->
  <Message />
</template>

<script setup>
import { mainStore } from "@/store";
import { useData, useRoute } from "vitepress";
import { calculateScroll } from "@/utils/helper";
import { ref, onMounted, computed, onBeforeUnmount, watch } from "vue";
import Nav from "@/components/Nav.vue";
import Loading from "@/components/Loading.vue";
import Footer from "@/components/Footer.vue";
import FooterLink from "@/components/FooterLink.vue";
import Control from "@/components/Control.vue";
import RightMenu from "@/components/RightMenu.vue";
import Message from "@/components/Message.vue";
import Home from "@/views/Home.vue";
import Page from "@/views/Page.vue";
import Post from "@/views/Post.vue";
import NotFound from "@/views/NotFound.vue";
import messageSW from "@/utils/messageSW";

const route = useRoute();
const store = mainStore();
const { frontmatter, page, theme } = useData();

// 右键菜单
const rightMenuRef = ref(null);

// 判断是否为文章页面
const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  return routePath.includes("/posts/");
});

// 开启右键菜单
const openRightMenu = (e) => {
  rightMenuRef.value?.openRightMenu(e);
};

// 复制时触发
const copyTip = () => {
  const copiedText = window.getSelection().toString();
  // 检查文本内容是否不为空
  if (copiedText.trim().length > 0 && typeof $message !== "undefined") {
    $message.success("复制成功，在转载时请标注本文地址");
  }
};

// 更改正确主题类别
const changeSiteThemeType = () => {
  // 主题 class
  const themeClasses = {
    dark: "dark",
    light: "light",
    auto: "auto",
  };
  // 必要数据
  const themeType = store.themeType;
  const htmlElement = document.documentElement;
  console.log("当前模式：", themeType);
  // 清除所有可能已经设置的主题相关的class
  Object.values(themeClasses).forEach((themeClass) => {
    htmlElement.classList.remove(themeClass);
  });
  // 添加新的 class
  if (themeType === "auto") {
    // 根据当前操作系统颜色方案更改明暗主题
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const autoThemeClass = systemPrefersDark ? themeClasses.dark : themeClasses.light;
    htmlElement.classList.add(autoThemeClass);
  } else if (themeClasses[themeType]) {
    htmlElement.classList.add(themeClasses[themeType]);
  }
};

// 监听主题类型变化
watch(
  () => store.themeType,
  (val) => {
    changeSiteThemeType();
    if (typeof $message !== "undefined") {
      const text = val === "light" ? "浅色模式" : val === "dark" ? "深色模式" : "跟随系统";
      $message.info("当前主题为" + text, {
        duration: 1500,
      });
    }
  },
);

onMounted(() => {
  console.log(frontmatter.value, page.value, theme.value);
  // 更改主题类别
  changeSiteThemeType();
  // 滚动监听
  window.addEventListener("scroll", calculateScroll);
  // 右键监听
  window.addEventListener("contextmenu", openRightMenu);
  // 复制监听
  window.addEventListener("copy", copyTip);
  // 监听系统颜色
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeSiteThemeType);
  // PWA
  messageSW();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", calculateScroll);
  window.removeEventListener("contextmenu", openRightMenu);
});
</script>

<style lang="scss" scoped>
.mian-layout {
  width: 100vw;
  width: 100dvw;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  // 手动实现加载动画
  animation: show 0.5s forwards;
  animation-duration: 0.5s;
  display: block;
  &.loading {
    display: none;
  }
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
}
</style>
