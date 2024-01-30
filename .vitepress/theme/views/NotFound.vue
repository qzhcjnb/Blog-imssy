<template>
  <div class="not-found">
    <h1 class="title">404</h1>
    <span class="title-tip">Page not found</span>
    <a href="/" class="to-home">回到主页</a>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  animation: fade-up 0.6s 0.1s backwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
  .title {
    font-size: 8rem;
    margin: 2rem 0;
    line-height: 1;
  }
  .title-tip {
    font-size: 2rem;
    opacity: 0.6;
  }
  .to-home {
    margin-top: 2rem;
    padding: 12px 26px;
    font-size: 20px;
    background-color: var(--main-card-border);
    border-radius: 12px;
    &:hover {
      color: var(--main-card-background);
      background-color: var(--main-color);
    }
  }
}
</style>
