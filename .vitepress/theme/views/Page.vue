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
  animation: fade-up 0.6s 0.1s backwards;
}
</style>
