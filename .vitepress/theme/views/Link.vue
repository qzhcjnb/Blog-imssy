<!-- 友情链接 -->
<template>
  <div class="link">
    <!-- 顶图 -->
    <div class="banner s-card">
      <div class="top">
        <div class="title">
          <span class="title-small">友情链接</span>
          <span class="title-big">与各位博主无限进步</span>
        </div>
        <div class="menu">
          <div class="menu-item random">
            <i class="iconfont icon-shuffle" />
            <span class="name">随机访问</span>
          </div>
          <div class="menu-item add">
            <i class="iconfont icon-right-round" />
            <span class="name">申请友链</span>
          </div>
        </div>
      </div>
      <div class="link-group">虚位以待</div>
    </div>
    <!-- 推荐 -->
    <div class="link-list">
      <div class="title">
        <h2 class="name">推荐（{{ rec.length }}）</h2>
        <span class="tip">都是大佬，推荐关注</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import linkData from "@/assets/linkData.mjs";

// 友链数据
const { rec, friend } = linkData;
</script>

<style lang="scss" scoped>
.link {
  .banner {
    padding: 2rem;
    .top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      .title {
        display: flex;
        flex-direction: column;
        .title-small {
          color: var(--main-font-second-color);
          font-size: 14px;
        }
        .title-big {
          font-size: 36px;
          font-weight: bold;
          line-height: 1;
          margin-top: 12px;
        }
      }
      .menu {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-start;
        margin-bottom: auto;
        .menu-item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 46px;
          padding: 12px 18px;
          border-radius: 8px;
          background-color: var(--main-card-second-background);
          border: 1px solid var(--main-card-border);
          box-shadow: 0 8px 16px -4px var(--main-border-shadow);
          transition: all 0.3s;
          cursor: pointer;
          .iconfont {
            font-size: 18px;
            margin-right: 8px;
            transition: color 0.3s;
          }
          &.random {
            color: var(--main-color);
            .iconfont {
              color: var(--main-color);
            }
          }
          &.add {
            color: var(--main-card-second-background);
            background-color: var(--main-font-color);
            .iconfont {
              font-size: 22px;
              margin-right: 6px;
              color: var(--main-card-second-background);
            }
          }
          &:last-child {
            margin-left: 20px;
          }
          &:hover {
            color: var(--main-font-color);
            background-color: var(--main-color);
            box-shadow: 0 8px 16px -4px var(--main-color-bg);
            .iconfont {
              color: var(--main-font-color);
            }
          }
        }
      }
    }
  }
  .link-list {
    margin-top: 2rem;
    .title {
      .name {
        border-bottom: none;
        margin-bottom: 4px;
      }
      .tip {
        color: var(--main-font-second-color);
      }
    }
  }
}
</style>
