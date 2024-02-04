<!-- 评论 -->
<template>
  <div id="main-comment" class="comment">
    <div class="title">
      <span class="name">
        <i class="iconfont icon-chat"></i>
        评论
      </span>
      <span class="tool" @click="anonymousComments"> 匿名评论 </span>
    </div>
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

// 匿名评论
const anonymousComments = () => {
  const arkDom = document.querySelector(".atk-header");
  if (!arkDom) return false;
  const name = arkDom.querySelector("input[name='nick']");
  const email = arkDom.querySelector("input[name='email']");
  const link = arkDom.querySelector("input[name='link']");
  // 填写信息
  name.value = "不愿透露名称的网友";
  email.value = "anonymous@example.com";
  link.value = "https://example.com";
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
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 3rem 0 1rem 0;
    padding: 0 6px;
    .name {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      .iconfont {
        font-size: 26px;
        font-weight: normal;
        margin-right: 8px;
      }
    }
    .tool {
      opacity: 0.6;
      font-size: 14px;
      cursor: pointer;
    }
  }
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
        .atk-send-btn {
          height: 40px;
        }
      }
    }
    :deep(.atk-list) {
      .atk-list-comments-wrap {
        > .atk-comment-wrap {
          border-bottom: 1px dashed var(--main-card-border);
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
