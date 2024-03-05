<!-- 全局播放器 -->
<template>
  <Teleport to="body">
    <div
      v-if="playerShow"
      :class="[
        'player',
        {
          playing: playState,
          hidden: scrollData?.percentage >= 90,
        },
      ]"
      @click="player?.toggle()"
    >
      <div ref="playerDom" class="player-content"></div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { getMusicList } from "@/api/music";
import "aplayer/dist/APlayer.min.css";

const store = mainStore();
const { playerShow, playState, playerData, scrollData } = storeToRefs(store);

// APlayer
const player = ref(null);
const playerDom = ref(null);

// 获取播放列表
const getMusicListData = async () => {
  const musicList = await getMusicList();
  console.log(musicList);
  if (musicList?.length) initAPlayer(musicList);
};

// 获取当前播放歌曲信息
const getMusicData = () => {
  try {
    if (!playerDom.value) return false;
    const songInfo = playerDom.value.querySelector(".aplayer-info");
    // 歌曲信息
    const songName = songInfo.querySelector(".aplayer-title").innerText;
    const songArtist = songInfo.querySelector(".aplayer-author").innerText.replace(" - ", "");
    console.log(songName, songArtist);
    // 更新信息
    playerData.value = {
      name: songName || "未知曲目",
      artist: songArtist || "未知艺术家",
    };
  } catch (error) {
    console.error("获取播放信息出错：", error);
  }
};

// 初始化播放器
const initAPlayer = async (list) => {
  try {
    const module = await import("aplayer");
    const APlayer = module.default;
    player.value = new APlayer({
      container: playerDom.value,
      volume: 1,
      lrcType: 3,
      listFolded: true,
      order: "random",
      audio: list,
    });
    // 播放器事件
    player.value?.on("canplay", () => {
      // 更新信息
      getMusicData();
    });
    player.value?.on("play", () => {
      console.log("开始播放");
      playState.value = true;
    });
    player.value?.on("pause", () => {
      console.log("暂停播放");
      playState.value = false;
    });
    getMusicData();
    // 挂载播放器
    window.$player = player.value;
  } catch (error) {
    console.error("初始化播放器出错：", error);
  }
};

// 监听播放器开启状态
watch(
  () => playerShow.value,
  (val) => {
    if (!val) return false;
    player.value?.destroy();
    getMusicListData();
  },
);

onMounted(() => {
  if (window.innerWidth >= 768) getMusicListData();
});

onBeforeUnmount(() => {
  player.value?.destroy();
});
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 100;
  transition: transform 0.3s;
  cursor: pointer;
  .player-content {
    margin: 0;
    border-radius: 50px;
    overflow: hidden;
    color: var(--main-font-color);
    font-family: "HarmonyOS_Regular", sans-serif;
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    box-shadow: 0 8px 16px -4px var(--main-dark-shadow);
    transition: all 0.3s;
    :deep(.aplayer-body) {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px;
      padding-right: 12px;
      pointer-events: none;
      .aplayer-pic {
        width: 30px;
        height: 30px;
        min-width: 30px;
        border-radius: 50%;
        margin-right: 8px;
        border: 1px solid var(--main-card-border);
        animation: rotate 20s linear infinite;
        animation-play-state: paused;
        z-index: 2;
        .aplayer-button {
          display: none;
        }
      }
      .aplayer-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: auto;
        margin: 0;
        padding: 0;
        border: none;
        .aplayer-music {
          margin: 0;
          padding: 0;
          height: auto;
          display: flex;
          line-height: normal;
          z-index: 2;
          .aplayer-author {
            display: none;
          }
        }
        .aplayer-lrc {
          margin: 0;
          opacity: 0;
          margin-left: 12px;
          width: 0;
          z-index: 2;
          transition:
            width 0.3s,
            opacity 0.3s;
          &::before,
          &::after {
            display: none;
          }
          .aplayer-lrc-contents {
            p {
              text-align: center;
              color: #efefef;
              filter: blur(0.8px);
              transition:
                filter 0.3s,
                opacity 0.3s;
              &.aplayer-lrc-current {
                filter: blur(0);
              }
            }
          }
        }
        .aplayer-controller {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          .aplayer-time {
            display: none;
          }
          .aplayer-bar-wrap {
            margin: 0;
            padding: 0;
            opacity: 0;
            transition: opacity 0.3s;
            .aplayer-bar {
              height: 100%;
              background: transparent;
              .aplayer-loaded {
                display: none;
              }
              .aplayer-played {
                height: 100%;
                background: var(--main-color-white) !important;
                transition: width 0.3s;
              }
            }
          }
        }
      }
      .aplayer-notice,
      .aplayer-miniswitcher {
        display: none;
      }
    }
    :deep(.aplayer-list) {
      display: none;
    }
    &::after {
      content: "播放音乐";
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 14px;
      opacity: 0;
      color: var(--main-card-background);
      background-color: var(--main-color);
      pointer-events: none;
      transition: opacity 0.3s;
      z-index: 3;
    }
    &:hover {
      border-color: var(--main-color);
      box-shadow: 0 8px 16px -4px var(--main-color-bg);
      &::after {
        opacity: 1;
      }
    }
  }
  &.playing {
    .player-content {
      color: #efefef;
      background-color: var(--main-color);
      border: 1px solid var(--main-color);
      :deep(.aplayer-body) {
        .aplayer-pic {
          animation-play-state: running;
        }
        .aplayer-info {
          .aplayer-lrc {
            opacity: 1;
            width: 200px;
          }
          .aplayer-controller {
            .aplayer-bar-wrap {
              opacity: 1;
            }
          }
        }
      }
      &::after {
        opacity: 0;
      }
    }
  }
  &.hidden {
    transform: translateY(100px);
  }
  &:active {
    transform: scale(0.98);
  }
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
