<template>
  <div class="banner">
    <h1 class="title">你好，欢迎来到{{ theme.title }}</h1>
    <div class="subtitle">
      <Transition name="fade" mode="out-in">
        <span :key="hitokotoData?.hitokoto" class="text">
          {{ hitokotoData?.hitokoto ? hitokotoData?.hitokoto : theme.description }}
        </span>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getHitokoto } from "@/api/text";

const { theme } = useData();

const hitokotoData = ref(null);
const hitokotoTimeOut = ref(null);

// 获取一言数据
const getHitokotoData = async () => {
  try {
    const result = await getHitokoto();
    const { hitokoto, from, from_who } = result;
    hitokotoData.value = { hitokoto, from, from_who };
  } catch (error) {
    $message.error("一言获取失败");
    console.error("一言获取失败：", error);
  }
};

onMounted(() => {
  hitokotoTimeOut.value = setTimeout(() => {
    getHitokotoData();
  }, 2000);
});

onBeforeUnmount(() => {
  clearTimeout(hitokotoTimeOut.value);
});
</script>

<style lang="scss" scoped>
.banner {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fade-up 0.6s 0.1s backwards;
  transition: height 0.3s;
  .title {
    font-family: "Site Title";
    font-weight: bold;
    font-size: 44px;
  }
  .subtitle {
    font-size: 20px;
    opacity: 0.8;
    animation: fade-up-opacity 0.6s 0.1s backwards;
  }
  @media (max-width: 768px) {
    padding: 0 1rem;
    align-items: flex-start;
    height: 240px;
    .title {
      font-size: 36px;
    }
    .subtitle {
      font-size: 18px;
    }
  }
}
</style>
