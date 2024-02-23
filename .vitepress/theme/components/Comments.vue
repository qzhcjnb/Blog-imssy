<!-- 评论 -->
<template>
  <div ref="mainCommentRef" id="main-comment" class="comment">
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
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vitepress";
import Artalk from "artalk";
import "artalk/dist/Artalk.css";

const route = useRoute();

const artalk = ref(null);
const commentRef = ref(null);
const mainCommentRef = ref(null);

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

// 滚动至评论
const scrollToComments = () => {
  if (!mainCommentRef.value) return false;
  const elementRect = mainCommentRef.value.getBoundingClientRect();
  const elementTop = elementRect.top + window.scrollY;
  window.scrollBy({ top: elementTop - 80, behavior: "smooth" });
};

// 监听页面切换
watch(
  () => route.path,
  (val) => {
    nextTick().then(() => {
      artalk.value?.update({ pageKey: val });
      artalk.value?.reload();
    });
  },
);

defineExpose({ scrollToComments });

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
    --at-color-gradient: linear-gradient(180deg, transparent, var(--main-card-background));
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
      .atk-list-header {
        .atk-dropdown {
          .atk-dropdown-item {
            margin: 0;
            padding: 0;
            margin-top: 8px;
            line-height: normal;
            text-align: center;
            letter-spacing: normal;
            &:first-child {
              margin-top: 0;
            }
            &::before {
              display: none;
            }
            span {
              transition: color 0.3s;
            }
          }
        }
      }
      .atk-list-comments-wrap {
        > .atk-comment-wrap {
          border-bottom: 1px dashed var(--main-card-border);
          .atk-content {
            img {
              width: auto;
              max-width: 240px;
            }
            pre {
              code {
                border-radius: 8px;
              }
            }
            &.atk-height-limit {
              .atk-height-limit-btn {
                height: 46px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 12px 0;
                border-radius: 16px;
                transition:
                  color 0.3s,
                  background-color 0.3s;
                &:hover {
                  color: var(--main-card-background);
                  background-color: var(--main-color);
                }
              }
              &::after {
                height: 100px;
              }
            }
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>
