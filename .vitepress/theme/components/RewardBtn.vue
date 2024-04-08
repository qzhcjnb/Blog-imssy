<!-- 打赏按钮 -->
<template>
  <div v-if="rewardData.enable" class="reward">
    <div class="reward-btn">
      <i class="iconfont icon-reward" />
      <span class="text">赞赏博主</span>
    </div>
    <div class="reward-card s-card">
      <span class="thank">感谢您赐予我前进的力量</span>
      <div class="qr">
        <div v-if="rewardData?.wechat" class="qr-img">
          <img v-if="rewardData?.wechat" :src="rewardData.wechat" alt="微信" />
          <span class="tip">
            <i class="iconfont icon-wechat-pay" />
            微信
          </span>
        </div>
        <div v-if="rewardData?.alipay" class="qr-img">
          <img v-if="rewardData?.alipay" :src="rewardData.alipay" alt="支付宝" />
          <span class="tip">
            <i class="iconfont icon-alipay" />
            支付宝
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { theme } = useData();
const { rewardData } = theme.value;
</script>

<style lang="scss" scoped>
.reward {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  user-select: none;
  cursor: pointer;
  .reward-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 120px;
    border-radius: 8px;
    color: #fff;
    background-color: var(--main-color-red);
    .iconfont {
      color: #fff;
      font-weight: normal;
      margin-right: 6px;
    }
  }
  .reward-card {
    position: absolute;
    bottom: 60px;
    opacity: 0;
    transform: translateY(20px);
    visibility: hidden;
    padding: 1rem;
    .thank {
      display: inline-flex;
      justify-content: center;
      margin-bottom: 1rem;
      width: 100%;
      color: var(--main-color-red);
      font-weight: bold;
    }
    .qr {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
      .qr-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 160px;
          height: 160px;
          border-radius: 16px;
          overflow: hidden;
        }
        .tip {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 0.8rem;
          .iconfont {
            margin-right: 6px;
            font-size: 18px;
          }
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: -20px;
      left: 0;
      width: 100%;
      height: 40px;
    }
  }
  &:hover {
    .reward-card {
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    }
  }
}
</style>
