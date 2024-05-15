<template>
  <div ref="commentRef" id="comment-dom" :class="['comment-content', 'artalk', { fill }]" />
</template>

<script setup>
import { jumpRedirect } from "@/utils/commonTools";
import { themeConfig } from "@/assets/themeConfig.mjs";
import Artalk from "artalk";
import "artalk/dist/Artalk.css";

const route = useRoute();
const props = defineProps({
  // 填充评论区
  fill: {
    type: [Boolean, String],
    default: false,
  },
});
const { comment } = themeConfig;

// 评论数据
const artalk = ref(null);
const commentRef = ref(null);

// 初始化 Artalk
const initArtalk = () => {
  try {
    artalk.value = Artalk.init({
      el: commentRef.value || "#comment-dom",
      locale: "auto",
      pageKey: route.path,
      site: comment.artalk.site,
      server: comment.artalk.server,
    });
    // Event
    artalk.value?.on("created", () => {
      // 若有数据填充
      if (props.fill) fillComments(props.fill);
    });
    artalk.value?.on("list-loaded", () => {
      console.log("评论已加载完毕");
      jumpRedirect(null, true);
    });
    artalk.value?.on("comment-updated", () => {
      console.log("评论已更新完毕");
      jumpRedirect(null, true);
    });
    if (typeof $comment === "undefined" && typeof window !== "undefined") {
      window.$comment = artalk.value;
    }
    return artalk.value;
  } catch (error) {
    console.error("初始化评论出错：", error);
  }
};

// 填充评论区
const fillComments = (data) => {
  console.log("填充评论：", data);
  // 获取评论元素
  const commentDom = document.querySelector("#comment-dom.fill");
  if (!commentDom) return false;
  // 获取输入框
  const commentInput = commentDom.querySelector("textarea");
  // 写入内容
  commentInput.value = data + "\n\n";
  commentInput.focus();
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

onMounted(() => {
  nextTick().then(() => {
    initArtalk();
  });
});

onUnmounted(() => {
  artalk.value?.destroy();
});
</script>

<style lang="scss">
.artalk,
.atk-layer-wrap,
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
}
</style>

<style lang="scss" scoped>
.comment-content {
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
        .atk-header {
          .atk-badge {
            color: var(--at-color-bg);
            background-color: var(--at-color-main) !important;
          }
        }
        .atk-content {
          user-select: text;
          img {
            width: auto;
            max-width: 240px;
          }
          code {
            margin: 4px;
            vertical-align: inherit;
            border-radius: 6px;
            font-family: "Fira Code", var(--main-font-family), monospace;
          }
          pre {
            code {
              border-radius: 8px;
            }
          }
          blockquote {
            border-left: 8px solid var(--main-card-border);
            background-color: var(--main-card-second-background);
            border-radius: 4px 8px 8px 4px;
          }
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .atk-height-limit {
      .atk-height-limit-btn {
        height: 46px;
        width: calc(100% - 20px);
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
}
</style>
