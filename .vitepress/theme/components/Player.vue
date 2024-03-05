<!-- 全局播放器 -->
<template>
  <Teleport to="body">
    <div class="player">
      <div ref="playerDom" class="player-content"></div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMusicList } from "@/api/music";
import "APlayer/dist/APlayer.min.css";

// APlayer
const player = ref(null);
const playerDom = ref(null);

// 获取播放列表
const getMusicListData = async () => {
  const musicList = await getMusicList();
  console.log(musicList);
  if (musicList?.length) initAPlayer(musicList);
};

// 初始化播放器
const initAPlayer = (list) => {
  import("APlayer").then((module) => {
    const APlayer = module.default;
    player.value = new APlayer({
      container: playerDom.value,
      volume: 1,
      lrcType: 3,
      listFolded: true,
      audio: list,
    });
    // 播放器事件
    player.value?.on("play", () => {
      console.log("开始播放");
    });
  });
};

onMounted(() => {
  getMusicListData();
});
</script>

<style lang="scss" scoped>
.player {
  display: none;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
}
</style>
