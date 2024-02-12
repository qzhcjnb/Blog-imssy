<!-- 分类导航条 -->
<template>
  <div v-if="type === 'categories'" class="type-bar s-card hover">
    <div class="all-type">
      <a href="/" :class="['type-item', { choose: !currentCatName }]">首页</a>
      <a
        v-for="(_, key, index) in theme.categoriesData"
        :key="index"
        :href="`/pages/categories/${key}`"
        :class="['type-item', { choose: currentCatName === key }]"
      >
        {{ key }}
      </a>
    </div>
    <div class="next-category">
      <i class="iconfont icon-arrow-right" />
    </div>
    <a href="/pages/categories" class="more-category">更多</a>
  </div>
  <div v-else-if="type === 'tags'" class="type-bar s-card hover">
    <div class="all-type">
      <a
        v-for="(item, key, index) in theme.tagsData"
        :key="index"
        :href="`/pages/tags/${key}`"
        :class="['type-item', { choose: currentCatName === key }]"
      >
        {{ key }}
        <span class="num">{{ item.count }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useData, useRoute } from "vitepress";

const { theme } = useData();
const props = defineProps({
  // 显示类别
  type: {
    type: String,
    default: "categories",
  },
});
const route = useRoute();

// 获取当前路由路径
const currentCatName = computed(() => {
  const routePath = decodeURIComponent(route.path);
  const catName = routePath.split("/").pop();
  return catName;
});
</script>

<style lang="scss" scoped>
.type-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.6rem;
  font-weight: bold;
  animation: fade-up 0.6s 0.3s backwards;
  .all-type {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
    overflow: hidden;
    .type-item {
      display: flex;
      align-items: center;
      padding: 0.1rem 0.5rem;
      margin-right: 6px;
      font-weight: bold;
      border-radius: 8px;
      white-space: nowrap;
      height: 30px;
      cursor: pointer;
      .num {
        margin-left: 4px;
        font-weight: normal;
        padding: 2px 6px;
        font-size: 12px;
        color: var(--main-font-color);
        background-color: var(--main-card-border);
        border-radius: 8px;
      }
      &.choose {
        color: var(--main-card-background);
        background-color: var(--main-color);
        .num {
          color: var(--main-color);
        }
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
