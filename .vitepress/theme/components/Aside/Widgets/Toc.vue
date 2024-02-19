<!-- 侧边栏 - 目录 -->
<template>
  <div v-if="tocData && tocData?.length" class="toc s-card">
    <div class="toc-title">
      <i class="iconfont icon-toc" />
      <span class="name">目录</span>
    </div>
    <div class="toc-list" :style="{ '--height': activeTocHeight + 'px' }">
      <span
        v-for="(item, index) in tocData"
        :key="index"
        :id="'toc-' + item.id"
        :class="[
          'toc-item',
          item.type,
          { active: item.id === activeHeader || (index === 0 && !activeHeader) },
        ]"
        @click="scrollToHeader(item.id)"
      >
        {{ item.text }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { throttle } from "@/utils/helper";
import { mainStore } from "@/store";

const store = mainStore();

const tocData = ref(null);
const postDom = ref(null);
const activeHeader = ref(null);
const activeTocHeight = ref(4);

// 生成目录数据
const generateDirData = () => {
  postDom.value = document.getElementById("post-article");
  if (!postDom.value) return false;
  // 所有标题
  const headers = postDom.value.querySelectorAll("h2, h3");
  // 构造目录数据
  const nestedData = [];
  headers.forEach((header) => {
    const headerObj = {
      id: header.id,
      type: header.tagName,
      text: header.textContent?.replace(/\u200B/g, "").trim(),
    };
    // 放入标题内容
    nestedData.push(headerObj);
  });
  tocData.value = nestedData;
};

// 高亮对应目录项
const activeTocItem = throttle(
  () => {
    if (!tocData.value) return false;
    // 所有标题
    const headers = postDom.value.querySelectorAll("h2, h3");
    // 容错高度
    const bufferheight = 120;
    // 遍历所有标题
    for (let header of headers) {
      const rect = header.getBoundingClientRect();
      // 检查标题是否在视口中
      if (rect.top - bufferheight <= 0 && rect.bottom + bufferheight >= 0) {
        // 高亮对应标题
        activeHeader.value = header.id;
        // 计算目录滚动位置
        const activeTocItem = document.getElementById("toc-" + header.id);
        activeTocHeight.value = activeTocItem?.offsetTop || 4;
      }
    }
  },
  100,
  true,
);

// 滚动标题至指定位置
const scrollToHeader = (id) => {
  try {
    const headerDom = document.getElementById(id);
    if (!headerDom || !postDom.value) return false;
    const headerTop = headerDom.offsetTop;
    const scrollHeight = headerTop + postDom.value.offsetTop - 80;
    window.scroll({ top: scrollHeight, behavior: "smooth" });
  } catch (error) {
    console.error("目录滚动失败：", error);
  }
};

// 监听滚动数值
watch(
  () => store.scrollData.percentage,
  (val) => {
    if (val === 0) {
      console.log("回到顶部");
      const headers = postDom.value.querySelectorAll("h2, h3");
      if (!headers) return false;
      activeTocHeight.value = 4;
      activeHeader.value = headers[0].id;
    }
  },
);

onMounted(() => {
  generateDirData();
  // 滚动监听
  window.addEventListener("scroll", activeTocItem);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", activeTocItem);
});
</script>

<style lang="scss" scoped>
.toc {
  .toc-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    .iconfont {
      margin-right: 8px;
      font-size: 12px;
      opacity: 0.6;
    }
    .name {
      font-weight: bold;
    }
  }
  .toc-list {
    position: relative;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8px;
    .toc-item {
      margin: 4px 0;
      padding: 6px 12px;
      border-radius: 8px;
      opacity: 0.6;
      transition:
        color 0.3s,
        opacity 0.3s,
        font-size 0.3s,
        background-color 0.3s;
      cursor: pointer;
      &.H2 {
        font-weight: bold;
      }
      &.H3 {
        font-size: 14px;
        margin-left: 20px;
      }
      &.active {
        opacity: 1;
        color: var(--main-color);
        background-color: var(--main-color-bg);
        &.H2 {
          font-size: 18px;
        }
        &.H3 {
          font-size: 16px;
        }
      }
      &:hover {
        opacity: 1;
        color: var(--main-color);
        background-color: var(--main-color-bg);
      }
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 4px;
      height: 94%;
      background-color: var(--main-card-border);
      border-radius: 8px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: var(--height);
      width: 4px;
      height: 20px;
      margin: 8px 0;
      background-color: var(--main-color);
      border-radius: 8px;
      transition: top 0.3s;
    }
  }
}
</style>
