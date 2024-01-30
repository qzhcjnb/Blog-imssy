<!-- 分类导航条 -->
<template>
  <div class="category-bar s-card">
    <div class="all-category">
      <a href="/" :class="['category-item', { choose: !currentCatName }]">首页</a>
      <a
        v-for="(_, key, index) in theme.categoriesData"
        :key="index"
        :href="`/pages/categories/${key}`"
        :class="['category-item', { choose: currentCatName === key }]"
      >
        {{ key }}
      </a>
    </div>
    <div class="next-category">
      <i class="iconfont icon-arrow-right" />
    </div>
    <a href="/pages/categories" class="more-category">更多</a>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useData, useRoute } from "vitepress";

const { theme } = useData();
const route = useRoute();

// 获取当前路由路径
const currentCatName = computed(() => {
  const routePath = decodeURIComponent(route.path);
  const catName = routePath.split("/").pop();
  return catName;
});
</script>

<style lang="scss" scoped>
.category-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.6rem;
  font-weight: bold;
  animation: fade-up 0.6s 0.3s backwards;
  .all-category {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
    .category-item {
      display: flex;
      align-items: center;
      padding: 0.1rem 0.5rem;
      margin-right: 6px;
      font-weight: bold;
      border-radius: 8px;
      height: 30px;
      cursor: pointer;
      &.choose {
        color: var(--main-card-background);
        background-color: var(--main-color);
      }
      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
      }
    }
  }
  .next-category {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: 12px;
    font-weight: normal;
    .iconfont {
      font-size: 15px;
    }
  }
  .more-category {
    white-space: nowrap;
    margin-right: 4px;
  }
}
</style>
