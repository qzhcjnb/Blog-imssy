<!-- 右键菜单 -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div
        v-if="rightMenuShow"
        class="right-menu"
        @click="rightMenuShow = false"
        @contextmenu.stop="closeRightMenu"
      >
        <div
          :style="{
            left: rightMenuX + 'px',
            top: rightMenuY + 'px',
          }"
          ref="rightMenuRef"
          class="menu-content s-card hover"
          @contextmenu.stop="closeRightMenu"
        >
          <div class="tools">
            <div class="btn" title="后退" @click="rightMenuFunc('back')">
              <i class="iconfont icon-left"></i>
            </div>
            <div class="btn" title="前进" @click="rightMenuFunc('forward')">
              <i class="iconfont icon-right"></i>
            </div>
            <div class="btn" title="刷新" @click="rightMenuFunc('reload')">
              <i class="iconfont icon-refresh"></i>
            </div>
            <div class="btn" title="返回顶部" @click="smoothScrolling">
              <i class="iconfont icon-arrow-up"></i>
            </div>
          </div>
          <div class="all-menu">
            <div
              v-if="clickedType === 'normal'"
              class="btn"
              @click="router.go(shufflePost(theme.postData))"
            >
              <i class="iconfont icon-shuffle"></i>
              <span class="name">随便逛逛</span>
            </div>
            <div
              v-if="clickedType === 'normal'"
              class="btn"
              @click="router.go('/pages/categories')"
            >
              <i class="iconfont icon-folder"></i>
              <span class="name">全部分类</span>
            </div>
            <div v-if="clickedType === 'normal'" class="btn" @click="router.go('/pages/tags')">
              <i class="iconfont icon-hashtag"></i>
              <span class="name">全部标签</span>
            </div>
            <!-- 链接类型 -->
            <div v-if="clickedType === 'link'" class="btn" @click="rightMenuFunc('open-link')">
              <i class="iconfont icon-window"></i>
              <span class="name">新标签页打开</span>
            </div>
            <div v-if="clickedType === 'link'" class="btn" @click="copyText(clickedTypeData?.href)">
              <i class="iconfont icon-link"></i>
              <span class="name">复制链接地址</span>
            </div>
            <!-- 图片类型 -->
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="copyImage(clickedTypeData?.src)"
            >
              <i class="iconfont icon-image-copy"></i>
              <span class="name">复制此图片</span>
            </div>
            <div
              v-if="clickedType === 'image'"
              class="btn"
              @click="downloadImage(clickedTypeData?.src)"
            >
              <i class="iconfont icon-download"></i>
              <span class="name">下载此图片</span>
            </div>
            <!-- 输入框 -->
            <div
              v-if="clickedType === 'input' && typeof clickedTypeData.value === 'string'"
              class="btn"
              @click="rightMenuFunc('input-paste')"
            >
              <i class="iconfont icon-paste"></i>
              <span class="name">粘贴文本</span>
            </div>
            <!-- 选中文本 -->
            <div
              v-if="clickedType === 'text' || clickedType === 'input'"
              class="btn"
              @click="copyText(clickedTypeData)"
            >
              <i class="iconfont icon-copy"></i>
              <span class="name">复制选中文本</span>
            </div>
          </div>
          <!-- 通用菜单 -->
          <div class="all-menu general">
            <!-- 版权协议 -->
            <div class="btn" @click="router.go('/pages/cc')">
              <i class="iconfont icon-accessible"></i>
              <span class="name">版权协议</span>
            </div>
          </div>
          <div class="all-menu general">
            <!-- 复制地址 -->
            <div class="btn" @click="rightMenuFunc('copy-link')">
              <i class="iconfont icon-copy"></i>
              <span class="name">复制本页地址</span>
            </div>
            <!-- 明暗模式 -->
            <div
              class="btn"
              @click.stop="
                store.themeType === 'auto'
                  ? (store.themeType = 'dark')
                  : store.themeType === 'dark'
                    ? (store.themeType = 'light')
                    : (store.themeType = 'auto')
              "
            >
              <i :class="`iconfont icon-${store.themeType}`"></i>
              <span class="name">
                {{
                  store.themeType === "auto"
                    ? "深色模式"
                    : store.themeType === "dark"
                      ? "浅色模式"
                      : "跟随系统"
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { mainStore } from "@/store";
import { useRouter, useData } from "vitepress";
import { smoothScrolling, shufflePost, copyText, copyImage, downloadImage } from "@/utils/helper";

const { theme } = useData();
const router = useRouter();
const store = mainStore();

// 右键菜单数据
const rightMenuX = ref(0);
const rightMenuY = ref(0);
const clickedType = ref("normal");
const clickedTypeData = ref(null);
const rightMenuRef = ref(null);
const rightMenuShow = ref(false);

// 开启右键菜单
const openRightMenu = (e) => {
  // 检测是否按下了 ctrl
  if (e.ctrlKey) return true;
  e.preventDefault();
  rightMenuShow.value = false;
  // 获取点击类型
  checkClickType(e?.target);
  nextTick().then(() => {
    // 处理菜单位置
    const calculateMenuPosition = () => {
      // 获取菜单的宽度和高度
      const menuWidth = rightMenuRef.value?.offsetWidth;
      const menuHeight = rightMenuRef.value?.offsetHeight;
      // 获取屏幕的宽度和高度
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      // 计算正确的坐标值
      let correctX = e.clientX;
      let correctY = e.clientY;
      // 保留边距
      const marginWidth = 20;
      if (correctX + menuWidth > screenWidth - marginWidth) {
        correctX = screenWidth - menuWidth - marginWidth;
      }
      if (correctY + menuHeight > screenHeight - marginWidth) {
        correctY = screenHeight - menuHeight - marginWidth;
      }
      if (correctX < marginWidth) {
        correctX = marginWidth;
      }
      if (correctY < marginWidth) {
        correctY = marginWidth;
      }
      rightMenuX.value = correctX;
      rightMenuY.value = correctY;
    };
    // 显示菜单
    rightMenuShow.value = true;
    // DOM 更新
    nextTick().then(() => calculateMenuPosition());
  });
};

// 关闭右键菜单
const closeRightMenu = (e) => {
  e?.preventDefault();
  rightMenuShow.value = false;
  rightMenuX.value = 0;
  rightMenuY.value = 0;
  clickedType.value = "normal";
  clickedTypeData.value = null;
};

// 判断点击元素类型
const checkClickType = (target) => {
  if (!target?.tagName) return false;
  // 写入内容
  clickedTypeData.value =
    window.getSelection().toString().length > 0 ? window.getSelection().toString() : target;
  switch (target.tagName) {
    case "A":
      // 链接类型
      clickedType.value = "link";
      break;
    case "IMG":
      // 图片类型
      clickedType.value = "image";
      break;
    case "INPUT":
    case "TEXTAREA":
      // 输入框类型
      clickedType.value = "input";
      break;
    default:
      if (window.getSelection().toString().length > 0) {
        // 已选中的文本
        clickedType.value = "text";
      } else {
        // 普通模式
        clickedType.value = "normal";
      }
      break;
  }
};

// 右键菜单点击事件
const rightMenuFunc = async (type) => {
  try {
    if (!type) return false;
    switch (type) {
      case "back":
        window.history.back();
        break;
      case "forward":
        window.history.forward();
        break;
      case "reload":
        window.location.reload();
        break;
      case "open-link":
        window.open(clickedTypeData.value?.href);
        break;
      case "copy-link":
        const pageLink = theme.value.site + router.route.path;
        if (pageLink) copyText(pageLink);
        break;
      case "input-paste":
        const text = await navigator.clipboard.readText();
        if (clickedTypeData.value && typeof clickedTypeData.value === "object") {
          const inputElement = clickedTypeData.value;
          const start = inputElement.selectionStart;
          const end = inputElement.selectionEnd;
          const value = inputElement.value;
          // 在光标位置插入文本
          const newValue = value.substring(0, start) + text + value.substring(end);
          inputElement.value = newValue;
          // 更新光标位置
          const newCursorPosition = start + text.length;
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }
        break;
      default:
        return false;
    }
  } catch (error) {
    $message.error("右键菜单发生错误，请重试");
    console.error("右键菜单出错：", error);
  }
};

defineExpose({ openRightMenu });
</script>

<style lang="scss" scoped>
.right-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  z-index: 9999;
  transition: opacity 0.2s;
  .menu-content {
    position: absolute;
    width: 180px;
    background-color: var(--main-card-background);
    animation: fade-up 0.2s forwards;
    transition:
      opacity 0.3s,
      border-color 0.3s,
      box-shadow 0.3s,
      background-color 0.3s;
    .tools {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--main-card-border);
      .btn {
        width: 34px;
        height: 34px;
        min-width: 34px;
      }
    }
    .all-menu {
      margin-top: 12px;
      .btn {
        justify-content: flex-start;
        margin-bottom: 6px;
        .iconfont {
          font-size: 20px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      &.general {
        padding-top: 12px;
        border-top: 1px solid var(--main-card-border);
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 8px;
      transition:
        color 0.3s,
        background-color 0.3s;
      .iconfont {
        font-size: 20px;
        transition: color 0.3s;
      }
      .name {
        margin-left: 12px;
      }
      &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
        .iconfont {
          color: var(--main-card-background);
        }
      }
    }
  }
}
</style>
