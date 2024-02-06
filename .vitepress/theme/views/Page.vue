<!-- 普通页面 -->
<template>
  <div :class="['page', { 'has-aside': showAside }]">
    <Content class="page-content" />
    <Aside v-if="showAside" />
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import Aside from "@/components/Aside/index.vue";

const { page } = useData();
const props = defineProps({
  // 显示侧边栏
  showAside: {
    type: Boolean,
    default: true,
  },
});

console.log(page.value);
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  display: flex;
  flex-direction: row;
  animation: fade-up 0.6s 0.1s backwards;
  .page-content {
    width: 100%;
    transition: width 0.3s;
  }
  &.has-aside {
    animation: fade-up 0.6s 0.3s backwards;
    .page-content {
      width: calc(100% - 300px);
    }
    .main-aside {
      width: 300px;
      padding-left: 1rem;
    }
  }
  @media (max-width: 1200px) {
    .page-content {
      width: 100% !important;
    }
    .main-aside {
      display: none;
    }
  }
  @media (max-width: 768px) {
    padding: 0 20px;
  }
}
</style>
