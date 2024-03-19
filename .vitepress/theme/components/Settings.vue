<!-- 全局设置 -->
<template>
  <div class="settings">
    <div class="set-btn s-card" @click="store.changeShowStatus('showSeetings')">
      <i class="iconfont icon-style"></i>
      <span class="set-text">个性化配置</span>
    </div>
    <!-- 设置面板 -->
    <Modal
      :show="store.showSeetings"
      title="个性化配置"
      titleIcon="style"
      @mask-click="store.changeShowStatus('showSeetings')"
      @mask-close="store.changeShowStatus('showSeetings')"
    >
      <div class="set-list">
        <div class="set-item">
          <span class="set-label">全站字体</span>
          <div class="set-options">
            <span
              :class="['options', { choose: store.fontFamily === 'hmos' }]"
              @click="store.fontFamily = 'hmos'"
            >
              HarmonyOS Sans
            </span>
            <span
              :class="['options', { choose: store.fontFamily === 'lxgw' }]"
              @click="store.fontFamily = 'lxgw'"
            >
              霞鹜文楷
            </span>
          </div>
        </div>
        <div class="set-item">
          <span class="set-label">全站字体大小</span>
          <div class="set-options">
            <span class="options" @click="store.changeFontSize(false)"> - </span>
            <span class="num">{{ store.fontSize }}</span>
            <span class="options" @click="store.changeFontSize(true)"> + </span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();
</script>

<style lang="scss" scoped>
.settings {
  .set-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border-radius: 25px;
    box-shadow: 0 6px 10px -4px var(--main-dark-shadow);
    .iconfont {
      font-size: 22px;
      margin-left: 10px;
      transition: color 0.3s;
    }
    .set-text {
      margin-left: 10px;
      display: inline-flex;
      opacity: 0;
      font-size: 14px;
      line-height: 1;
      overflow: hidden;
      white-space: nowrap;
      transition: opacity 0.3s;
    }
    &:hover {
      width: 140px;
      color: var(--main-card-background);
      background-color: var(--main-color);
      .iconfont {
        color: var(--main-card-background);
      }
      .set-text {
        opacity: 1;
      }
    }
  }
}
.set-list {
  .set-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .set-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      border-radius: 8px;
      .options {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9375rem;
        border-radius: 8px;
        margin: 4px 8px;
        padding: 6px 8px;
        min-width: 30px;
        background-color: var(--main-card-border);
        transition:
          color 0.3s,
          background-color 0.3s;
        &.choose,
        &:hover {
          color: var(--main-card-background);
          background-color: var(--main-color);
          box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        }
        &:last-child {
          margin-right: 0;
        }
      }
      .num {
        margin: 0 4px;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
