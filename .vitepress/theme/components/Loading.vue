<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-if="loadingStatus" class="loading" @click="loadingStatus = false">
        <img :src="theme.logo" class="logo" alt="loading-logo" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";

const store = mainStore();
const { theme } = useData();
const { loadingStatus } = storeToRefs(store);
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--main-card-background);
  z-index: 9999;
  .logo {
    width: 100px;
    height: 100px;
    animation: loading 2s infinite;
  }
}
</style>
