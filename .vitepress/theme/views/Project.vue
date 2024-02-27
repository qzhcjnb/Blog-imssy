<template>
  <div class="project">
    <Banner
      type="page"
      title="我的项目"
      desc="源于热爱开发优秀的作品"
      footer="写 BUG 小能手"
      image="https://pic.efefee.cn/uploads/2024/02/27/65dd8dae6043c.webp"
    >
      <template #footer-slot>
        <div class="to-github" @click="jumpLink('https://github.com/imsyy/')">
          <i class="iconfont icon-github"></i>
          <span>前往 Github</span>
        </div>
      </template>
    </Banner>
  </div>
</template>

<script setup>
import { jumpLink } from "@/utils/helper";
import Banner from "@/components/Banner.vue";
</script>

<style lang="scss" scoped>
.project {
  .banner-page {
    .to-github {
      height: 40px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      color: #fff;
      background-color: var(--main-dark-opacity);
      backdrop-filter: blur(20px);
      transition: background-color 0.3s;
      .iconfont {
        margin-right: 8px;
      }
      &:hover {
        background-color: var(--main-color);
      }
    }
  }
}
</style>
