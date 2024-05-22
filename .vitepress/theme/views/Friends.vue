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
        <div class="status" @click="friendsStatusShow = true">
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
          <div class="rule" @click="changeRule">
            <span :class="['rule-name', { choose: showRule === 'updated' }]">按更新时间</span>
            <span :class="['rule-name', { choose: showRule === 'created' }]">按发布时间</span>
          </div>
        </span>
        <span class="right">以下内容自动生成，未经过审核</span>
      </div>
      <Transition name="fade" mode="out-in">
        <div v-if="friendsLinkData?.length" class="all-list">
          <a
            v-for="(item, index) in friendsLinkData.slice(0, showNum)"
            :key="index"
            :href="item.link"
            class="list-item s-card hover"
            target="_blank"
          >
            <span class="title">{{ item?.title || "未知文章标题" }}</span>
            <div class="desc">
              <a :href="getAuthorUrl(item.link)" class="author" target="_blank">
                {{ item?.author || "未知作者" }}
              </a>
              <span class="date">
                <i class="iconfont icon-time" />
                {{ item?.updated }}
              </span>
            </div>
            <img :src="item.avatar" alt="avatar" class="avatar" />
          </a>
        </div>
        <div v-else class="loading s-card">正在努力钓鱼中，请稍等...</div>
      </Transition>
      <Transition name="fade" mode="out-in">
        <div
          v-if="friendsLinkData?.length && showNum <= friendsLinkData?.length"
          class="loading-more s-card hover"
          @click="showNum += 20"
        >
          <span class="icon">∞</span>
        </div>
        <span v-else class="not-more"> 共 {{ friendsLinkData?.length }} 篇，最多显示 500 篇 </span>
      </Transition>
    </div>
    <!-- 友链详细状态 -->
    <Modal
      :show="friendsStatusShow"
      title="鱼塘状态"
      titleIcon="fish"
      @mask-click="friendsStatusShow = false"
      @modal-close="friendsStatusShow = false"
    >
      <div class="status-modal">
        <span class="title">友链状态</span>
        <div class="total">
          <div class="total-item s-card">
            <span class="name">友链总数</span>
            <span class="count">{{ friendsStatusData?.total_friend_num || 0 }}</span>
          </div>
          <div class="total-item s-card">
            <span class="name">失联的友链</span>
            <span class="count">{{ friendsStatusData?.total_lost_num || 0 }}</span>
          </div>
          <div class="total-item s-card">
            <span class="name">正常的友链</span>
            <span class="count">{{ friendsStatusData?.total_not_lost_num || 0 }}</span>
          </div>
        </div>
        <span class="title">失联的友链</span>
        <span class="total-tip">
          互加友链时间较短；未检测到文章；贵站未加 RSS 或 RSS
          抓取异常；贵站两个月没有更新文章；贵站无法访问等
        </span>
        <div class="loss-link">
          <a
            v-for="(item, key, index) in friendsStatusData?.lost_friends"
            :key="index"
            :href="item"
            class="loss-link-item s-card hover"
            target="_blank"
          >
            <span class="name">{{ key }}</span>
            <span class="link">{{ item }}</span>
          </a>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { debounce } from "@/utils/helper";
import { getCircleOfFriends, getFriendsStatus } from "@/api";

// 鱼塘数据
const friendsLinkData = ref(null);
const friendsStatusData = ref(null);
const friendsStatusShow = ref(false);

// 显示数量
const showNum = ref(20);

// 显示顺序
const showRule = ref("updated");

// 获取友链朋友圈数据
const getCircleOfFriendsData = async () => {
  try {
    const status = await getFriendsStatus();
    const result = await getCircleOfFriends(showRule.value);
    friendsStatusData.value = {
      ...status,
      ...result.statistical_data,
    };
    friendsLinkData.value = result.article_data;
  } catch (error) {
    $message.error("获取友链朋友圈数据失败，请稍后重试");
  }
};

// 切换排序
const changeRule = debounce(() => {
  showRule.value = showRule.value === "updated" ? "created" : "updated";
  friendsLinkData.value = null;
  getCircleOfFriendsData();
}, 300);

// 获取作者博客
const getAuthorUrl = (link) => {
  try {
    const url = new URL(link);
    // 提取主页链接
    const homepageLink = `${url.protocol}//${url.hostname}/`;
    return homepageLink;
  } catch (error) {
    $message.error("跳转作者博客失败，请稍后重试");
    return null;
  }
};

onMounted(() => {
  getCircleOfFriendsData();
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
        .rule {
          display: flex;
          font-size: 14px;
          font-weight: normal;
          margin-left: 1rem;
          margin-top: 2px;
          .rule-name {
            cursor: pointer;
            &.choose {
              color: var(--main-color);
              font-weight: bold;
            }
            &:first-child {
              &::after {
                content: "/";
                margin: 0 12px;
                opacity: 0.4;
                color: var(--main-font-color);
              }
            }
          }
        }
      }
      .right {
        font-size: 14px;
        color: var(--main-font-second-color);
      }
      @media (max-width: 576px) {
        .left {
          width: 100%;
          .rule {
            margin-left: auto;
          }
        }
        .right {
          display: none;
        }
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
        transition: border 0.3s;
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
  .loading-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    max-width: 800px;
    margin: 20px auto;
    padding: 6px 0;
    font-weight: bold;
    font-size: 14px;
    &:hover {
      width: 60%;
      color: var(--main-card-background);
      background-color: var(--main-color);
    }
  }
  .not-more {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    font-size: 14px;
    opacity: 0.6;
    color: var(--main-font-second-color);
  }
}
// 弹窗样式
.status-modal {
  .title {
    display: block;
    width: 100%;
    margin: 1rem 0;
    font-size: 16px;
    font-weight: bold;
    border-left: 4px solid var(--main-color);
    border-radius: 4px 8px 8px 4px;
    background-color: var(--main-border-shadow);
    padding: 6px 0 6px 12px;
    &:first-child {
      margin-top: 0;
    }
  }
  .total {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr;
    .total-item {
      display: flex;
      flex-direction: column;
      .name {
        margin-bottom: 12px;
        opacity: 0.6;
      }
      .count {
        font-size: 22px;
        font-weight: bold;
      }
    }
  }
  .total-tip {
    font-size: 15px;
    margin-top: -4px;
    margin-bottom: 1rem;
    display: block;
    color: var(--main-font-second-color);
    border-left: 4px solid var(--main-card-border);
    border-radius: 4px;
    padding: 8px 8px 8px 12px;
    background-color: var(--main-card-second-background);
  }
  .loss-link {
    display: flex;
    flex-direction: column;
    .loss-link-item {
      margin-bottom: 1rem;
      .name {
        margin-right: 1rem;
        font-weight: bold;
      }
      .link {
        opacity: 0.6;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
