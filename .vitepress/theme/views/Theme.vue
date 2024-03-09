<template>
  <div class="theme">
    <div class="logo">
      <img
        class="logo-img"
        src="https://pic.efefee.cn/uploads/2024/03/07/65e992f639dd5.webp"
        alt="curve-logo"
      />
      <span class="logo-text">Curve</span>
      <span class="logo-tip">A VitePress Theme</span>
    </div>
    <div class="theme-btn">
      <a href="/pages/categories/主题文档" class="btn">
        <i class="iconfont icon-list" />
        主题文档
      </a>
      <a href="https://github.com/imsyy/vitepress-theme-curve" target="_blank" class="btn">
        <i class="iconfont icon-github" />
        GitHub
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme {
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
    overflow: hidden;
    .logo-img {
      width: 100%;
    }
    .logo-text {
      margin-top: 30px;
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
  .theme-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 2rem 0 4rem;
    .btn {
      margin: 8px;
      padding: 12px 24px;
      border-radius: 12px;
      background-color: var(--main-card-border);
      cursor: pointer;
      .iconfont {
        margin-right: 6px;
        font-size: 20px;
      }
      &:hover {
        color: #fff;
        background-color: var(--main-color);
        .iconfont {
          color: #fff;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .logo {
      width: 100%;
      .logo-text {
        margin-top: 20px;
        font-size: 30px;
      }
      .logo-tip {
        font-size: 20px;
      }
    }
  }
}
</style>
