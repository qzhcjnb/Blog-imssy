<!-- 懒加载 -->
<template>
  <slot v-if="load"></slot>
  <div v-else ref="box" :style="{ height: h, width: w }">加载中</div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  w: {
    type: String,
    default: "100%",
  },
  h: {
    type: String,
    default: "100%",
  },
});

// IntersectionObserver
let observer = null;

// 是否加载
const load = ref(false);
// 加载元素
const box = ref(null);

// 初始化 IntersectionObserver
const initLazyIntersectionObserver = (fn) => {
  const observer = new IntersectionObserver((entrys) => entrys.forEach((entry) => fn(entry)), {
    rootMargin: "0px",
    threshold: 0,
  });
  return observer;
};

onMounted(() => {
  observer = initLazyIntersectionObserver((entry) => {
    if (entry.isIntersecting) {
      // 当内容可见
      load.value = true;
      observer.unobserve(box.value.$el);
      observer = null;
    }
  });
  observer.observe(box.value.$el); // 观察
});

onBeforeUnmount(() => observer && observer.unobserve(box.value.$el)); // 不观察了
</script>
