<template>
  <div class="link-list">
    <div v-for="(type, index) in listData" :key="index" class="link-type-list">
      <div class="title">
        <h2 class="name">
          <span class="name-text">{{ type?.typeName || "未知分组" }}</span>
          <span v-if="showCount" class="name-count">（{{ type?.typeList?.length || 0 }}）</span>
        </h2>
        <span class="tip">{{ type?.typeDesc || "分组暂无简介" }}</span>
      </div>
      <div class="all-link" v-if="type?.typeList">
        <div
          class="link-card s-card hover normal"
          v-for="(link, index) in type.typeList"
          :key="index"
          @click="jumpLink(link.url)"
        >
          <div class="cover">
            <img :src="link.avatar || link.ico" class="cover-img" alt="cover" />
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
import { jumpLink } from "@/utils/helper";

const props = defineProps({
  // 列表数据
  listData: {
    type: [Array, String],
    default: () => [],
  },
  // 显示数量
  showCount: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.link-list {
  .link-type-list {
    margin-top: 2rem;
    .title {
      margin-left: 6px;
      margin-bottom: 1.6rem;
      .name {
        border-bottom: none;
        margin-bottom: 4px;
        .name-count {
          color: var(--main-font-second-color);
        }
      }
      .tip {
        color: var(--main-font-second-color);
      }
    }
    .all-link {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(6, 1fr);
      .link-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 90px;
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
          height: 100%;
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
          box-shadow: 0 0 16px 6px var(--main-color-bg);
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
      @media (max-width: 1400px) {
        grid-template-columns: repeat(5, 1fr);
      }
      @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media (max-width: 992px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
