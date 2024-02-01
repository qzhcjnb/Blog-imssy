<!-- 中控台 -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in" @before-enter="changeCloseStyle">
      <div v-if="store.controlShow" class="control" @click="store.changeControlShow">
        <!-- 关闭按钮 -->
        <div ref="closeControlRef" class="close-control">
          <i class="iconfont icon-close"></i>
        </div>
        <!-- 背景遮罩 -->
        <div class="control-mask" />
        <!-- 中控台内容 -->
        <div class="control-content" @click.stop>114514</div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { mainStore } from "@/store";

const store = mainStore();

const closeControlRef = ref(null);

// 更正关闭按钮位置
const changeCloseStyle = () => {
  nextTick(() => {
    const controlOpenDom = document.querySelector("#open-control");
    if (controlOpenDom && closeControlRef.value) {
      const { top, left } = controlOpenDom.getBoundingClientRect();
      closeControlRef.value.style.top = `${top}px`;
      closeControlRef.value.style.left = `${left}px`;
      closeControlRef.value.style.opacity = "1";
    }
  });
};
</script>

<style lang="scss" scoped>
.control {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  z-index: 1109;
  .close-control {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    padding: 0;
    opacity: 0;
    transition:
      background-color 0.3s,
      opacity 0.3s;
    border-radius: 50%;
    cursor: pointer;
    .iconfont {
      font-size: 18px;
      line-height: 1;
      transition:
        color 0.3s,
        opacity 0.3s;
    }
    &:hover {
      background-color: var(--main-color);
      .iconfont {
        color: var(--main-card-background);
      }
    }
  }
  .control-content {
    position: absolute;
    animation: show 0.5s forwards;
  }
  .control-mask {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    backdrop-filter: blur(20px);
    background-color: var(--main-mask-background);
  }
}
</style>
