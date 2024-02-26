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
          <div class="menu-item add" @click="smoothScrolling('#友情链接申请')">
            <i class="iconfont icon-right-round" />
            <span class="name">申请友链</span>
          </div>
        </div>
      </div>
      <div class="link-group">虚位以待</div>
    </div>
    <!-- 友链数据 -->
    <div v-for="(type, index) in linkData" :key="index" class="link-list">
      <div class="title">
        <h2 class="name">
          {{ type?.typeName || "未知分组" }}（{{ type?.typeList?.length || 0 }}）
        </h2>
        <span class="tip">{{ type?.typeDesc || "分组暂无简介" }}</span>
      </div>
      <div class="all-list" v-if="type?.typeList">
        <div
          class="link-card s-card hover normal"
          v-for="(link, index) in type.typeList"
          :key="index"
          @click="jumpLink(link.url)"
        >
          <div class="cover">
            <img :src="link.avatar" class="cover-img" alt="cover" />
          </div>
          <div class="data">
            <span class="name">{{ link.name }}</span>
            <span class="desc">{{ link.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { jumpLink, smoothScrolling } from "@/utils/helper";
import linkData from "@/assets/linkData.mjs";
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
      margin-left: 6px;
      margin-bottom: 1.6rem;
      .name {
        border-bottom: none;
        margin-bottom: 4px;
      }
      .tip {
        color: var(--main-font-second-color);
      }
    }
    .all-list {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(5, 1fr);
      .link-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        .cover {
          width: 60px;
          height: 60px;
          min-width: 60px;
          margin-right: 20px;
          border-radius: 50%;
          overflow: hidden;
          transition: all 0.6s;
          .cover-img {
            width: 100%;
            height: 100%;
          }
        }
        .data {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .name {
            font-weight: bold;
            font-size: 18px;
          }
          .desc {
            font-size: 15px;
            margin-top: 4px;
            line-height: 1.2;
            color: var(--main-font-second-color);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            transition:
              color 0.3s,
              opacity 0.3s;
          }
        }
        &:hover {
          color: var(--main-card-background);
          background-color: var(--main-color);
          border-color: var(--main-color);
          box-shadow: 0 8px 16px -4px var(--main-color-bg);
          .cover {
            margin-right: 6px;
            min-width: 0;
            opacity: 0;
            width: 0;
            height: 0;
          }
          .data {
            .desc {
              opacity: 0.7;
              color: var(--main-card-background);
            }
          }
        }
      }
    }
  }
}
</style>
