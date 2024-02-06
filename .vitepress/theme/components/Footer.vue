<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="copyright">
        <span class="time">@ 2019 - {{ thisYear }} By </span>
        <span class="author link" @click="jumpLink(theme.author.link)">
          {{ theme.author.name }}
        </span>
        <span class="icp link" @click="jumpLink('https://beian.miit.gov.cn/')">
          <i class="iconfont icon-safe" />
          {{ theme.icp }}
        </span>
      </div>
      <div class="meta">
        <div class="power link" @click="jumpLink('https://vitepress.dev/')">
          <span class="by">Powered by</span>
          <span class="name">VitePress</span>
        </div>
        <div class="rss link" @click="jumpLink('https://blog.imsyy.top/feed.xml')">
          <i class="iconfont icon-rss" />
          <span class="name">订阅</span>
        </div>
        <div
          class="cc link"
          @click="jumpLink('https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans')"
        >
          <i class="iconfont icon-line" />
          <i class="iconfont icon-by-line" />
          <i class="iconfont icon-nc-line" />
          <i class="iconfont icon-nd-line" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useData } from "vitepress";
import { jumpLink } from "@/utils/helper";

const { theme } = useData();

// 实时年份
const thisYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.main-footer {
  display: flex;
  margin-top: 1rem;
  padding: 1rem 0;
  background-color: var(--main-card-second-background);
  border-top: 1px solid var(--main-card-border);
  overflow: hidden;
  z-index: 1000;
  animation: show 0.3s backwards;
  transition:
    color 0.3s,
    border 0.3s,
    background-color 0.3s;
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    color: var(--main-font-color);
    line-height: 1;
    min-height: 32px;
    .copyright {
      .icp {
        .iconfont {
          font-size: 20px;
          margin-right: 4px;
          opacity: 0.6;
        }
      }
    }
    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      .power {
        margin-right: 4px;
        .by {
          font-weight: normal;
          opacity: 0.8;
          margin-right: 6px;
        }
      }
      .rss {
        margin-right: 4px;
        .iconfont {
          font-weight: normal;
          margin-right: 6px;
        }
      }
      .cc {
        .iconfont {
          margin: 0 2px;
          font-weight: normal;
        }
      }
    }
    .link {
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 8px;
      border-radius: 12px;
      transition:
        color 0.3s,
        background-color 0.3s;
      cursor: pointer;
      .iconfont {
        font-size: 22px;
        transition: color 0.3s;
      }
      &:hover {
        color: var(--main-color);
        background-color: var(--main-color-bg);
        .iconfont {
          color: var(--main-color);
        }
      }
    }
    @media (max-width: 768px) {
      font-size: 14px;
      .meta {
        display: none;
      }
    }
    @media (max-width: 420px) {
      .copyright {
        .icp {
          .iconfont {
            display: none;
          }
        }
      }
    }
  }
}
</style>
