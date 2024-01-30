<template>
  <!-- 加载提示 -->
  <Loading />
  <!-- 中控台 -->
  <Control />
  <!-- 导航栏 -->
  <Nav />
  <!-- 主内容 -->
  <main :class="['mian-layout', { loading: store.loadingStatus }]">
    <Home v-if="frontmatter.home" />
    <NotFound v-else-if="page.isNotFound" />
    <Post v-else-if="isPostPage" />
    <Page v-else :type="frontmatter.layout" :showAside="frontmatter.aside" />
  </main>
  <!-- 页脚 -->
  <FooterLink v-show="!store.loadingStatus" :showBar="isPostPage" />
  <Footer v-show="!store.loadingStatus" />
</template>

<script setup>
import { mainStore } from "@/store";
import { useData, useRoute } from "vitepress";
import { onMounted, computed, onBeforeUnmount } from "vue";
import { calculateScroll } from "@/utils/helper";
import Nav from "@/components/Nav.vue";
import Loading from "@/components/Loading.vue";
import Footer from "@/components/Footer.vue";
import FooterLink from "@/components/FooterLink.vue";
import Control from "@/components/Control.vue";
import Home from "@/views/Home.vue";
import Page from "@/views/Page.vue";
import Post from "@/views/Post.vue";
import NotFound from "@/views/NotFound.vue";

const route = useRoute();
const store = mainStore();
const { frontmatter, page, theme } = useData();

// 判断是否为文章页面
const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  return routePath.includes("/posts/");
});

onMounted(() => {
  console.log(theme.value);
  // 滚动监听
  window.addEventListener("scroll", calculateScroll);
  // 右键监听
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    console.log(e, e.target);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", calculateScroll);
});
</script>

<style lang="scss" scoped>
.mian-layout {
  width: 100vw;
  width: 100dvw;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  // 手动实现加载动画
  animation: show 0.5s forwards;
  animation-duration: 0.5s;
  display: block;
  &.loading {
    display: none;
  }
}
</style>
