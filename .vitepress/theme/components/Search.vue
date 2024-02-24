<!-- 全局搜索 -->
<template>
  <Teleport to="body">
    <Transition name="fade" mode="out-in">
      <div v-show="store.searchShow" class="search">
        <div class="search-mask" @click="store.changeShowStatus('searchShow')" />
        <div class="search-content s-card" @click.stop>
          <div class="all-search-content">
            <div class="title">
              <i class="iconfont icon-search" />
              <span class="text">全局搜索</span>
            </div>
            <ais-instant-search
              :search-client="searchClient"
              :search-function="controlSearch"
              :future="{
                preserveSharedStateOnUnmount: true,
              }"
              index-name="imsyy"
            >
              <ais-configure :hits-per-page.camel="8" />
              <ais-search-box placeholder="想要搜点什么" autofocus />
              <ais-hits v-if="hasSearchValue">
                <template v-slot="{ items }">
                  <Transition name="fade" mode="out-in">
                    <div v-if="formatSearchData(items)?.length" class="search-list">
                      <div
                        v-for="(item, index) in formatSearchData(items)"
                        :key="index"
                        class="search-item s-card hover"
                        @click="jumpSearch(item.url)"
                      >
                        <p class="title" v-html="item.title" />
                        <p v-if="item?.anchor" class="anchor" v-html="item.anchor" />
                        <p v-if="item?.content" class="content s-card" v-html="item.content" />
                      </div>
                    </div>
                    <div v-else class="no-result">
                      <i class="iconfont icon-search-empty" />
                      <span class="text">搜索结果为空</span>
                    </div>
                  </Transition>
                </template>
              </ais-hits>
              <ais-pagination v-if="hasSearchValue" />
              <ais-stats>
                <template v-slot="{ processingTimeMS }">
                  <div class="information">
                    <span v-if="hasSearchValue" class="text">
                      本次用时 {{ processingTimeMS }} 毫秒
                    </span>
                  </div>
                  <div class="power" @click="jumpLink('https://www.algolia.com/')">
                    <i class="iconfont icon-algolia" />
                    <span class="name">Algolia</span>
                  </div>
                </template>
              </ais-stats>
            </ais-instant-search>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import { mainStore } from "@/store";
import { useRouter } from "vitepress";
import { jumpLink } from "@/utils/helper";
import algoliasearch from "algoliasearch/lite";

const store = mainStore();
const router = useRouter();

const searchClient = algoliasearch("X5EBEZB53I", "2e0df36271ff9e727de7e27612600e7e");

// 是否具有搜索词
const hasSearchValue = ref(false);

// 控制搜索行为
const controlSearch = (helper) => {
  hasSearchValue.value = helper?.state?.query ? true : false;
  helper.search();
};

// 处理搜索结果
const formatSearchData = (data) => {
  const results = [];
  // 遍历搜索结果
  for (let i = 0; i < data.length; i++) {
    const search = data[i];
    // 若无 anchor
    if (search.anchor === "" || search.anchor === "app") continue;
    // 获取数据
    const url = search?.url;
    const type = search.type === "lvl1" ? "post" : "content";
    const title = search._highlightResult?.hierarchy?.lvl1?.value;
    const anchor = search._highlightResult?.hierarchy?.[search.type]?.value;
    const content = search._highlightResult?.content?.value;
    // 生成搜索数据
    const searchData = { url, type, title, anchor, content };
    results.push(searchData);
  }
  console.log(results);
  return results;
};

// 跳转搜索结果
const jumpSearch = (url) => {
  store.changeSearchShow();
  router.go(url);
};
</script>

<style lang="scss" scoped>
.search {
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
  z-index: 1300;
  .search-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: var(--main-mask-background);
  }
  .search-content {
    position: absolute;
    animation: fade-up 0.5s forwards;
    width: calc(100% - 40px);
    max-width: 800px;
    max-height: 80vh;
    padding: 0;
    overflow: hidden;
    .all-search-content {
      padding: 20px;
      max-height: 80vh;
      overflow: auto;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        height: 28px;
        .iconfont {
          margin-right: 6px;
          font-size: 20px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.ais-InstantSearch {
  margin-top: 20px;
  height: 100%;
  .ais-SearchBox {
    height: 40px;
    width: 100%;
    .ais-SearchBox-input {
      width: 100%;
      outline: none;
      border-radius: 8px;
      font-size: 16px;
      padding: 0.6rem 1rem;
      color: var(--main-font-color);
      border: 1px solid var(--main-card-border);
      background-color: var(--main-card-second-background);
      transition:
        border-color 0.3s,
        box-shadow 0.3s;
      &:focus {
        border-color: var(--main-color);
        box-shadow: 0 8px 16px -4px var(--main-color-bg);
      }
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
    .ais-SearchBox-loadingIndicator,
    .ais-SearchBox-submit,
    .ais-SearchBox-reset {
      display: none;
    }
  }
  .ais-Hits {
    margin-top: 20px;
    min-height: 300px;
    height: 100%;
    .no-result {
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 40px;
        margin-bottom: 12px;
      }
      .text {
        font-size: 18px;
        opacity: 0.6;
      }
    }
    .search-list {
      .search-item {
        margin-bottom: 12px;
        .title {
          display: inline;
          font-size: 16px;
          margin-bottom: 6px;
        }
        .anchor {
          margin-top: 6px;
          color: var(--main-font-second-color);
          font-size: 14px;
          &::before {
            content: "# ";
          }
        }
        .content {
          color: var(--main-font-second-color);
          margin-top: 0.8rem;
          font-size: 12px;
          padding: 8px;
          border-radius: 8px;
        }
        p {
          margin: 0;
          mark {
            background-color: transparent;
            color: var(--main-color);
          }
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .ais-Pagination {
    margin-top: 20px;
    .ais-Pagination-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .ais-Pagination-item {
        margin: 0 4px;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        transition: background-color 0.3s;
        cursor: pointer;
        .ais-Pagination-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          &:hover {
            color: var(--main-font-color);
          }
        }
        &:hover {
          color: var(--main-font-color);
          background-color: var(--main-color);
          .ais-Pagination-link {
            color: var(--main-card-border);
          }
        }
        &.ais-Pagination-item--selected {
          font-weight: bold;
          background-color: var(--main-color);
          .ais-Pagination-link {
            color: var(--main-card-border);
          }
        }
        &.ais-Pagination-item--disabled,
        &.ais-Pagination-item--nextPage,
        &.ais-Pagination-item--lastPage {
          opacity: 0.8;
        }
      }
    }
  }
  .ais-Stats {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    opacity: 0.8;
    font-size: 14px;
    .power {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 16px;
      opacity: 0.6;
      .iconfont {
        margin-right: 4px;
        font-size: 20px;
      }
      .name {
        font-weight: bold;
      }
    }
    @media (max-width: 512px) {
      justify-content: center;
      .information {
        display: none;
      }
    }
  }
}
</style>
