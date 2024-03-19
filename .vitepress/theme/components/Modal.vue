<!-- 弹窗组件 -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-if="show" class="modal">
        <div class="modal-mask" @click="maskClick" />
        <div
          :style="{
            maxWidth: typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`,
            maxHeight: typeof maxHeight === 'string' ? maxHeight : `${maxHeight}px`,
            padding: `${padding}px`,
          }"
          class="modal-content s-card"
          @click.stop
        >
          <!-- 标题 -->
          <div v-if="title" class="title">
            <i v-if="titleIcon" :class="`iconfont icon-${titleIcon}`"></i>
            <span class="title-text">{{ title }}</span>
            <!-- 关闭按钮 -->
            <i v-if="showClose" class="iconfont icon-close close" @click="maskClose" />
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  // 是否显示
  show: {
    type: Boolean,
    default: false,
  },
  // 标题
  title: {
    type: String,
    default: "",
  },
  // 标题图标
  titleIcon: {
    type: String,
    default: "",
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true,
  },
  // 最大宽度
  maxWidth: {
    type: [Number, String],
    default: 800,
  },
  // 最大高度
  maxHeight: {
    type: [Number, String],
    default: "80vh",
  },
  // 边距
  padding: {
    type: Number,
    default: 20,
  },
});

// 发射事件
const emit = defineEmits(["mask-click", "mask-close"]);

// 遮罩层事件
const maskClick = () => emit("mask-click");
const maskClose = () => emit("mask-close");
</script>

<style lang="scss" scoped>
.modal {
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
  z-index: 2000;
  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }
  .modal-content {
    position: absolute;
    animation: fade-up 0.5s forwards;
    width: calc(100% - 40px);
    max-height: 80vh;
    overflow: auto;
    .title {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.125rem;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--main-card-border);
      .iconfont {
        font-size: 1.25rem;
        margin-right: 8px;
      }
      .close {
        position: absolute;
        right: 0;
        margin-right: 0;
        font-size: 1rem;
        border-radius: 8px;
        padding: 8px;
        transition: background-color 0.3s;
        cursor: pointer;
        &:hover {
          background-color: var(--main-card-border);
        }
      }
    }
  }
}
</style>
