<!-- 普通页面 -->
<template>
  <div :class="['page', { 'show-padding': showPadding, 'has-aside': showAside }]">
    <div class="page-content">
      <!-- 页面内容 -->
      <Content id="page-content" />
      <!-- 评论 -->
      <Comments v-if="showComment" />
    </div>
    <Aside v-if="showAside" />
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import Aside from "@/components/Aside/index.vue";
import Comments from "@/components/Comments.vue";

const { page } = useData();
const props = defineProps({
  // 显示侧边栏
  showAside: {
    type: Boolean,
    default: true,
  },
  // 显示边距
  showPadding: {
    type: Boolean,
    default: true,
  },
  // 显示评论
  showComment: {
    type: Boolean,
    default: false,
  },
});

console.log(page.value);
</script>

<style lang="scss" scoped>
@import "../style/post.scss";
.page {
  width: 100%;
  display: flex;
  flex-direction: row;
  animation: fade-up 0.6s 0.1s backwards;
  .page-content {
    width: 100%;
    transition: width 0.3s;
    .comment {
      :deep(.comment-content) {
        .atk-list {
          .atk-list-header {
            margin-bottom: 8px;
          }
          .atk-list-comments-wrap {
            > .atk-comment-wrap {
              padding: 0.8rem;
              margin-bottom: 1rem;
              border-bottom: none;
              border-radius: 16px;
              background-color: var(--main-card-background);
              border: 1px solid var(--main-card-border);
              box-shadow: 0 8px 16px -4px var(--main-border-shadow);
            }
          }
        }
      }
    }
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
  &.show-padding {
    .page-content {
      padding: 0 1.5rem;
      @media (max-width: 768px) {
        padding: 0 1rem;
      }
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
}
</style>
