<template>
  <div class="theme">
    <div class="logo">
      <img src="https://pic.efefee.cn/uploads/2024/03/07/65e992f639dd5.webp" alt="curve-logo" />
      <span class="logo-text">Curve</span>
      <span class="logo-tip">A VitePress Theme</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.theme {
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
    .logo-text {
      margin-top: 20px;
      font-size: 50px;
      font-weight: bold;
    }
    .logo-tip {
      margin-top: 8px;
      font-size: 24px;
      opacity: 0.6;
      color: var(--main-font-second-color);
    }
  }
}
</style>
