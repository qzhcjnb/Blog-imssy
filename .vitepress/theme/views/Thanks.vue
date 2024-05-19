<template>
  <!-- 致谢名单 -->
  <div class="thanks">
    <!-- 打赏名单 -->
    <div class="all-reward s-card">
      <div class="title">
        <span class="tip">致谢</span>
        <span class="title-name">打赏名单</span>
        <span class="desc">
          感谢各位大佬的打赏，因为你们，让我感受到开发项目的价值，很高兴这些项目能够帮助到你们。你们的打赏会让我在这条路上走得更远。
        </span>
      </div>
      <div class="reward-list">
        <div v-for="(item, index) in rewardData.reverse()" :key="index" class="reward-item s-card">
          <span class="name">{{ item.name }}</span>
          <div class="data">
            <span :class="['money', { big: Number(item.money) > 10 }]">￥{{ item.money }}</span>
            <span class="date">{{ formatDate(item.date) }}</span>
          </div>
          <span class="message">{{ item.message }}</span>
        </div>
      </div>
      <!-- 打赏按钮 -->
      <RewardBtn :showJump="false" />
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "@/utils/timeTools";
import rewardData from "@/assets/rewardData";
</script>

<style lang="scss" scoped>
.thanks {
  .all-reward {
    padding: 2rem;
    .title {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      .tip {
        font-size: 14px;
        opacity: 0.6;
        margin-bottom: 4px;
      }
      .title-name {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .desc {
        color: var(--main-font-second-color);
      }
    }
    .reward {
      position: absolute;
      right: 2rem;
      top: 2rem;
      margin: 0;
    }
    .reward-list {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(5, 1fr);
      .reward-item {
        position: relative;
        overflow: hidden;
        .name {
          font-size: 18px;
          font-weight: bold;
        }
        .data {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .money {
            background-color: var(--main-font-color);
            color: var(--main-card-background);
            border-radius: 8px;
            padding: 2px 6px;
            font-size: 14px;
            &.big {
              background-color: var(--main-color);
            }
          }
          .date {
            font-size: 12px;
            opacity: 0.6;
            margin-top: auto;
          }
        }
        .message {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          position: absolute;
          padding: 0.8rem;
          display: block;
          opacity: 0;
          background-color: var(--main-card-background);
          transition: opacity 0.3s;
        }
        &:hover {
          .message {
            opacity: 1;
          }
        }
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
