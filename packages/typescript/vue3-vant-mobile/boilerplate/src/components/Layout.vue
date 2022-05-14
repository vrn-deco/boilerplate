<!--
 * @Author: Cphayim
 * @Description: page layout
-->
<script setup lang="ts">
import TabBar from './TabBar.vue'

type LayoutProps = {
  title: string // 头部标题
  backArrow?: boolean // 头部显示返回箭头
  hideHeader?: boolean // 隐藏头部
  showTabBar?: boolean // 显示 tabBar
}
const props = defineProps<LayoutProps>()

const slots = useSlots()
const hasHeader = computed(() => !props.hideHeader)
const hasFooter = computed(() => !!slots.footer)

const router = useRouter()
const handleBack = () => router.back()

const main = ref<Element>()
const scrollTop = ref(0)
// store scrollTop
const handleScroll = useDebounceFn((e) => {
  scrollTop.value = e.target.scrollTop
}, 100)
// restore scrollTop
onActivated(() => {
  if (!main.value) return
  main.value.scrollTop = scrollTop.value
})
</script>

<template>
  <div class="layout" :class="{ 'has-tab-bar': showTabBar }">
    <!-- header -->
    <div v-if="hasHeader" class="layout__header">
      <van-nav-bar :title="title" fixed placeholder safe-area-inset-top>
        <template v-if="backArrow" #left>
          <van-icon name="arrow-left" size="18" @click="handleBack" />
        </template>
        <template v-else #left>
          <slot name="header-left"></slot>
        </template>

        <template #right>
          <slot name="header-right"></slot>
        </template>
      </van-nav-bar>
    </div>

    <!-- main -->
    <div
      ref="main"
      class="layout__main"
      :class="{ 'shim-top': !hasHeader, 'shim-bottom': !hasFooter }"
      @scroll="handleScroll"
    >
      <slot />
    </div>

    <!-- footer -->
    <div v-if="hasFooter" class="layout__footer">
      <slot name="footer" />
    </div>

    <!-- tabBar: can't coexist with footer -->
    <div v-if="showTabBar && !hasFooter" class="layout__tabbar__wrap">
      <TabBar />
    </div>
  </div>
</template>

<style scoped>
.layout {
  --layout-background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--layout-background-color);
}

.layout__header {
  flex: 0 0 auto;
}
.layout__main {
  flex: 1;
  /* only main scroll */
  overflow-x: hidden;
  overflow-y: auto;
}

.layout__footer {
  flex: 0 0 auto;
  padding-bottom: var(--safe-area-inset-bottom);
}

.layout__tabbar__wrap {
  flex: 0 0 auto;
}

.shim-top {
  padding-top: var(--safe-area-inset-top);
}
.shim-bottom {
  padding-bottom: var(--safe-area-inset-bottom);
}
</style>
