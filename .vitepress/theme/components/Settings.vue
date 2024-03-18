<!-- 全局设置 -->
<template>
  <div class="settings">
    <div class="set-btn s-card" @click="store.changeShowStatus('showSeetings')">
      <i class="iconfont icon-style"></i>
      <span class="set-text">个性化配置</span>
    </div>
    <!-- 设置面板 -->
    <Transition name="fade" mode="out-in">
      <div v-if="store.showSeetings" class="set-card">
        <div class="set-mask" @click="store.changeShowStatus('showSeetings')" />
        <div class="set-content s-card" @click.stop>
          <div class="title">
            <i class="iconfont icon-style"></i>
            <span class="title-text">个性化配置</span>
          </div>
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
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();
</script>

<style lang="scss" scoped>
.settings {
  cursor: pointer;
  .set-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 42px;
    height: 42px;
    padding: 0;
    border-radius: 25px;
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
  .set-card {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    width: 100dvw;
    height: 100vh;
    height: 100dvh;
    z-index: 100;
    .set-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: var(--main-mask-background);
    }
    .set-content {
      position: absolute;
      animation: fade-up 0.5s forwards;
      width: calc(100% - 40px);
      max-width: 600px;
      max-height: 80vh;
      overflow: hidden;
      padding: 20px;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 18px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--main-card-border);
        .iconfont {
          font-size: 20px;
          margin-right: 8px;
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
              font-size: 15px;
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
    }
  }
}
</style>
