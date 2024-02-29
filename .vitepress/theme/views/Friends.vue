<!-- 友链鱼塘 -->
<template>
  <div class="friends">
    <!-- 顶图 -->
    <Banner
      type="page"
      title="友链鱼塘"
      desc="最新文章订阅"
      footer="看看小伙伴们都在写些什么"
      image="https://pic.efefee.cn/uploads/2024/02/28/65dedf9747d1d.webp"
    >
      <!-- 鱼塘状态 -->
      <template v-slot:header-slot>
        <div class="status">
          <div class="status-item">
            <span class="name">总数</span>
            <span class="count">{{ friendsStatusData?.friends_num || 0 }}</span>
          </div>
          <div class="status-item">
            <span class="name">活跃</span>
            <span class="count">{{ friendsStatusData?.active_num || 0 }}</span>
          </div>
          <div class="status-item">
            <span class="name">文章</span>
            <span class="count">{{ friendsStatusData?.article_num || 0 }} 篇</span>
          </div>
        </div>
      </template>
      <!-- 更新日期 -->
      <template #footer-slot>
        <span v-if="friendsStatusData?.last_updated_time" class="update">
          更新于 {{ friendsStatusData.last_updated_time }}
        </span>
      </template>
    </Banner>
    <!-- 鱼塘列表 -->
    <div class="friends-list">
      <div class="list-title">
        <span class="left">
          <i class="iconfont icon-fish" />
          鱼塘
        </span>
        <span class="right">以下内容自动生成，未经过审核</span>
      </div>
      <Transition name="fade" mode="out-in">
        <div v-if="friendsLinkData?.length" class="all-list">
          <div
            v-for="(item, index) in friendsLinkData"
            :key="index"
            class="list-item s-card hover"
            @click="jumpLink(item.link)"
          >
            <span class="title">{{ item?.title || "未知文章标题" }}</span>
            <div class="desc">
              <span class="author">{{ item?.author || "未知作者" }}</span>
              <span class="date">
                <i class="iconfont icon-time" />
                {{ item?.updated }}
              </span>
            </div>
            <img :src="item.avatar" alt="avatar" class="avatar" />
          </div>
        </div>
        <div v-else class="loading s-card">正在努力钓鱼中，请稍等...</div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { jumpLink } from "@/utils/helper";
import { getFriendsLink } from "@/api/link";
import Banner from "@/components/Banner.vue";

// 鱼塘数据
const friendsStatusData = ref(null);
const friendsLinkData = ref(null);

// 获取友链朋友圈数据
const getFriendsLinkData = async () => {
  try {
    const result = await getFriendsLink();
    friendsStatusData.value = result.statistical_data;
    friendsLinkData.value = result.article_data;
  } catch (error) {
    $message.error("获取友链朋友圈数据失败，请稍后重试");
  }
};

onMounted(() => {
  getFriendsLinkData();
});
</script>

<style lang="scss" scoped>
.friends {
  .banner-page {
    .status {
      display: flex;
      flex-direction: row;
      margin-bottom: auto;
      .status-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 1rem;
        padding: 10px;
        min-width: 80px;
        border-radius: 16px;
        background-color: var(--main-dark-opacity);
        backdrop-filter: blur(20px);
        .name {
          font-weight: bold;
          margin-bottom: 4px;
        }
        .count {
          font-size: 14px;
          opacity: 0.6;
        }
      }
      @media (max-width: 768px) {
        display: none;
      }
    }
    .update {
      font-size: 14px;
      opacity: 0.6;
    }
  }
  .friends-list {
    margin-top: 2rem;
    .list-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      line-height: 1.6;
      margin-bottom: 1rem;
      margin-left: 4px;
      .left {
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.6rem;
        .iconfont {
          font-size: 1.6rem;
          margin-right: 8px;
        }
      }
      .right {
        font-size: 14px;
        color: var(--main-font-second-color);
      }
    }
    .loading {
      padding: 1.6rem;
    }
    .all-list {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(4, 1fr);
      .list-item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        height: 160px;
        overflow: hidden;
        .avatar {
          position: absolute;
          right: -20px;
          bottom: -20px;
          width: 40%;
          height: auto;
          border-radius: 50%;
          z-index: 0;
          opacity: 0.2;
        }
        .title {
          font-size: 18px;
          line-height: 1.6;
          font-weight: bold;
          transition: color 0.3s;
          display: -webkit-box;
          overflow: hidden;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        .desc {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          .author {
            padding: 6px 10px;
            font-size: 13px;
            font-weight: bold;
            border-radius: 25px;
            background-color: var(--main-card-border);
            transition:
              color 0.3s,
              background-color 0.3s;
            &:hover {
              color: var(--main-card-background);
              background-color: var(--main-color);
            }
          }
          .date {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 12px;
            color: var(--main-font-second-color);
            .iconfont {
              font-size: 15px;
              margin-right: 4px;
              color: var(--main-font-second-color);
            }
          }
        }

        &:hover {
          .title {
            color: var(--main-color);
          }
        }
      }
      @media (max-width: 1200px) {
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
