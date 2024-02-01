<!-- 全局消息 -->
<template>
  <Teleport to="body">
    <Transition name="fadeDown" mode="out-in">
      <div v-if="messageShow" :class="['message', messageType]" @click="messageShow = false">
        <div class="message-content">
          <span class="text">{{ messageContent || "默认消息内容" }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// 消息数据
const messageShow = ref(false);
const messageContent = ref(null);
const messageType = ref("success");
const messageTimeOut = ref(null);

// 消息处理
const showMessage = (text, type) => {
  messageShow.value = false;
  clearTimeout(messageTimeOut.value);
  nextTick().then(() => {
    messageShow.value = true;
    messageContent.value = text;
    messageType.value = type;
    // 自动关闭消息
    messageTimeOut.value = setTimeout(() => {
      messageShow.value = false;
    }, 3000);
  });
};

// 弹出消息
const message = {
  // 信息
  info: (text) => {
    showMessage(text, "info");
  },
  // 成功
  success: (text) => {
    showMessage(text, "success");
  },
  // 警告
  warning: (text) => {
    showMessage(text, "warning");
  },
  // 错误
  error: (text) => {
    showMessage(text, "error");
  },
};

onMounted(() => {
  // 挂载全局
  window.$message = message;
});
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  width: 100vw;
  background-color: var(--main-color);
  z-index: 3000;
  .message-content {
    font-size: 18px;
    font-weight: bold;
    color: var(--main-card-background);
  }
  &.success {
    background-color: var(--main-success-color);
  }
  &.warning {
    background-color: var(--main-warning-color);
  }
  &.error {
    background-color: var(--main-error-color);
  }
  &.info {
    background-color: var(--main-info-color);
  }
}
</style>
