<!-- 文章列表 -->
<template>
  <div class="post-lists">
    <div
      v-for="(item, index) in listData"
      :key="index"
      :class="['post-item', 's-card', { cover: item.cover }]"
      @click="router.go(item.regularPath)"
    >
      <div class="post-content">
        <div v-if="item?.categories" class="post-category">
          <span v-for="cat in item?.categories" :key="cat" class="cat-name">
            <i class="iconfont icon-folder" />
            {{ cat }}
          </span>
        </div>
        <span class="post-title">{{ item.title }}</span>
        <span v-if="item?.description" class="post-desc">
          {{ item.description }}
        </span>
        <div class="post-meta">
          <div v-if="item?.tags" class="post-tags">
            <span
              v-for="tags in item?.tags"
              :key="tags"
              class="tags-name"
              @click.stop="router.go(`/pages/tags/${tags}`)"
            >
              <i class="iconfont icon-hashtag" />
              {{ tags }}
            </span>
          </div>
          <span class="post-time">{{ formatTimestamp(item?.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vitepress";
import { formatTimestamp } from "@/utils/helper";

const router = useRouter();

const props = defineProps({
  // 列表数据
  listData: {
    type: [Array, String],
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.post-lists {
  .post-item {
    padding: 1.6rem 2rem;
    margin-bottom: 1rem;
    animation: fade-up 0.6s 0.4s backwards;
    cursor: pointer;
    .post-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      .post-category {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        opacity: 0.6;
        font-size: 14px;
        .cat-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          .iconfont {
            opacity: 0.8;
            margin-right: 6px;
          }
        }
      }
      .post-title {
        display: inline-block;
        font-size: 20px;
        line-height: 30px;
        font-weight: bold;
        margin: 0.8rem 0;
        transition: color 0.3s;
        display: -webkit-box;
        overflow: hidden;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .post-desc {
        margin-top: -0.4rem;
        margin-bottom: 0.8rem;
        opacity: 0.8;
        line-height: 30px;
        display: -webkit-box;
        overflow: hidden;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .post-meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .post-tags {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          opacity: 0.8;
          .tags-name {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: 8px;
            transition: color 0.3s;
            .iconfont {
              font-weight: normal;
              opacity: 0.6;
              margin-right: 6px;
              transition: color 0.3s;
            }
            &:hover {
              color: var(--main-color);
              .iconfont {
                color: var(--main-color);
              }
            }
          }
        }
        .post-time {
          opacity: 0.6;
          font-size: 13px;
          white-space: nowrap;
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      .post-content {
        .post-title {
          color: var(--main-color);
        }
      }
    }
  }
}
</style>
