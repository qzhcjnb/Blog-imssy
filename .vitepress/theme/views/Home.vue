<!-- 首页 -->
<template>
  <div class="home">
    <Banner v-if="showHeader" />
    <div class="home-content">
      <div class="posts-content">
        <!-- 分类总览 -->
        <TypeBar :type="showTags ? 'tags' : 'categories'" />
        <!-- 文章列表 -->
        <PostList v-if="showCategories" :listData="theme.categoriesData[showCategories].articles" />
        <PostList v-else-if="showTags" :listData="theme.tagsData[showTags].articles" />
        <PostList v-else :listData="postData" />
      </div>
      <!-- 侧边栏 -->
      <Aside />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useData } from "vitepress";
import Banner from "@/components/Banner.vue";
import PostList from "@/components/List/PostList.vue";
import TypeBar from "@/components/List/TypeBar.vue";
import Aside from "@/components/Aside/index.vue";

const { theme } = useData();
const props = defineProps({
  // 显示首页头部
  showHeader: {
    type: Boolean,
    default: false,
  },
  // 当前页数
  page: {
    type: [null, Number],
    default: null,
  },
  // 显示分类
  showCategories: {
    type: [null, String],
    default: null,
  },
  // 显示标签
  showTags: {
    type: [null, String],
    default: null,
  },
});

// 根据页数计算文章数据
const postData = computed(() => {
  const page = props.page ? props.page - 1 : 0;
  return theme.value.postData?.slice(page * 10, page * 10 + 10);
});
</script>

<style lang="scss" scoped>
.home {
  .home-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    .posts-content {
      width: calc(100% - 300px);
      transition: width 0.3s;
    }
    .main-aside {
      width: 300px;
      padding-left: 1rem;
    }
    @media (max-width: 1200px) {
      .posts-content {
        width: 100%;
      }
      .main-aside {
        display: none;
      }
    }
    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }
  }
}
</style>
