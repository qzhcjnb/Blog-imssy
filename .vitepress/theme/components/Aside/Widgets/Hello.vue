<!-- 侧边栏 - 欢迎 -->
<template>
  <div class="hello s-card">
    <span class="tip" @click="changeHello">{{ helloText }}</span>
    <div class="content">
      <div class="site-logo">
        <Clock />
      </div>
      <span class="site-desc">
        这里有关于<strong>开发</strong>相关的问题和看法，也会有一些<strong>奇技淫巧</strong>的分享，其中大部分内容会侧重于<strong>前端开发</strong>。
        希望你可以在这里找到对你有用的知识和教程。
      </span>
    </div>
    <div class="info">
      <div class="name">
        <span class="author">{{ theme.author.name }}</span>
        <span class="desc">{{ site.description }}</span>
      </div>
      <div class="link">
        <a href="https://github.com/imsyy/" target="_blank" class="social-link">
          <i class="iconfont icon-github"></i>
        </a>
        <a href="mailto:one@imsyy.top" target="_blank" class="social-link">
          <i class="iconfont icon-email"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { ref, onBeforeUnmount } from "vue";
import { getGreetings } from "@/utils/helper";
import Clock from "@/components/Aside/Widgets/Clock.vue";

const { site, theme } = useData();

// 问候数据
const helloClick = ref(0);
const helloTimeOut = ref(null);
const helloText = ref(getGreetings());

// 更改问候语
const changeHello = () => {
  clearTimeout(helloTimeOut.value);
  helloClick.value++;
  if (helloClick.value === 1) {
    helloText.value = "点这里干什么？";
  } else if (helloClick.value === 2) {
    helloText.value = "怎么还点？";
  } else if (helloClick.value === 3) {
    helloText.value = "那你点吧！";
  } else if (helloClick.value === 100) {
    helloText.value = "怎么还在点？？？";
  } else {
    helloText.value = `x ${helloClick.value - 3}`;
  }
  // 恢复默认
  helloTimeOut.value = setTimeout(() => {
    helloText.value = getGreetings();
    helloClick.value = 0;
  }, 3000);
};

onBeforeUnmount(() => {
  clearTimeout(helloTimeOut.value);
});
</script>

<style lang="scss" scoped>
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--main-color);
  color: var(--main-card-background);
  border: none;
  .tip {
    display: inline-block;
    min-width: 140px;
    text-align: center;
    padding: 6px 12px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: bold;
    background-color: var(--main-color-opacity);
    margin-bottom: 12px;
    transition:
      color 0.3s,
      transform 0.3s,
      background-color 0.3s;
    &:hover {
      transform: scale(1.1);
      color: var(--main-font-color);
      background-color: var(--main-card-background);
    }
    &:active {
      transform: scale(1);
    }
  }
  .content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 180px;
    .site-logo {
      position: absolute;
      width: 160px;
      height: 160px;
      transition:
        transform cubic-bezier(0.69, 0.39, 0, 1.21) 0.3s,
        opacity cubic-bezier(0.69, 0.39, 0, 1.21) 0.3s;
      transform-origin: bottom;
    }
    .site-desc {
      display: block;
      height: 100%;
      margin-top: 20px;
      font-size: 1.1rem;
      line-height: 1.5;
      opacity: 0;
      transition: opacity 0.3s;
    }
  }
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    .name {
      display: flex;
      flex-direction: column;
      .author {
        font-weight: bold;
        font-size: 20px;
      }
      .desc {
        font-size: 12px;
        opacity: 0.6;
      }
    }
    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 20px;
      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-left: 12px;
        background-color: var(--main-color-opacity);
        border-radius: 50%;
        .iconfont {
          font-size: 22px;
          color: var(--main-card-background);
        }
        &:first-child {
          margin-left: 0;
        }
        &:hover {
          transform: scale(1.1);
          background-color: var(--main-card-background);
          .iconfont {
            color: var(--main-font-color);
          }
        }
      }
    }
  }
  &:hover {
    .content {
      .site-logo {
        opacity: 0;
        transform: scale(0);
      }
      .site-desc {
        opacity: 1;
      }
    }
  }
}
</style>
