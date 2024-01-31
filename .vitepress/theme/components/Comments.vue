<!-- 评论 -->
<template>
  <div id="main-comment" class="comment">
    <div ref="commentRef" class="comment-content" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vitepress";
import Artalk from "artalk";
import "artalk/dist/Artalk.css";

const artalk = ref(null);
const commentRef = ref(null);
const route = useRoute();

// 初始化 Artalk
const initArtalk = () => {
  artalk.value = Artalk.init({
    el: commentRef.value,
    pageKey: route.path,
    server: "https://artalk.efefee.cn",
    site: "無名小栈",
  });
};

onMounted(() => {
  initArtalk();
});

onUnmounted(() => {
  artalk.value?.destroy();
});
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 2rem;
  .comment-content {
    --at-color-font: var(--main-font-color);
    --at-color-deep: var(--main-font-second-color);
    --at-color-grey: var(--main-font-second-color);
    --at-color-meta: var(--main-font-second-color);
    --at-color-border: var(--main-card-border);
    --at-color-main: var(--main-color);
    --at-color-light: var(--main-color);
    --at-color-bg: var(--main-card-background);
    --at-color-bg-grey: var(--main-card-border);
    --at-color-bg-transl: var(--main-card-second-background);
    :deep(.atk-main-editor) {
      .atk-bottom {
        padding: 0 0 0 8px;
        height: 40px;
        .atk-send-btn{
            height: 40px;
        }
      }
    }
  }
}
</style>
