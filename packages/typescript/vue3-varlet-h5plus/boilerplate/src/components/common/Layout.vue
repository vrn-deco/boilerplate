<!--
 * @Author: Cphayim
 * @Description: page layout
-->
<template>
  <div class="layout" :class="{ 'has-tab-bar': showTabBar }">
    <!-- header -->
    <div class="layout__header">
      <var-app-bar :title="title" title-position="center" :elevation="false">
        <template v-if="backArrow" #left>
          <var-button round text color="transparent" text-color="#ffffff" @click="routerBack">
            <var-icon name="chevron-left" :size="24" />
          </var-button>
        </template>
        <template v-else #left>
          <slot name="header-left"></slot>
        </template>

        <template #right>
          <slot name="header-right"></slot>
        </template>
      </var-app-bar>
    </div>

    <!-- main -->
    <div @scroll="handleScroll" class="layout__main" ref="main">
      <slot />
    </div>

    <!-- footer -->
    <div v-if="showTabBar" class="layout__footer">
      <TabBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
type LayoutProps = {
  title: string
  backArrow?: boolean
  showTabBar?: boolean
}
const props = defineProps<LayoutProps>()

const router = useRouter()
const routerBack = () => router.back()

const main = ref<Element>()
const scrollTop = ref(0)
// store scrollTop
const handleScroll = useDebounceFn((e) => {
  scrollTop.value = e.target.scrollTop
  console.log(scrollTop)
}, 100)
// restore scrollTop
onActivated(() => {
  if (!main.value) return
  main.value.scrollTop = scrollTop.value
})
</script>

<style scoped>
.layout {
  --layout-header-height: calc(var(--app-bar-height) + var(--safe-area-inset-top));
  --layout-footer-height: 64px;
  --layout-main-height: calc(100vh - var(--layout-header-height));
  --layout-main-background-color: #f5f5f5;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}

.layout.has-tab-bar {
  --layout-main-height: calc(100vh - var(--layout-header-height) - var(--layout-footer-height));
}

.layout__header {
  padding-top: var(--safe-area-inset-top);
  background-color: var(--app-bar-color);
}
.layout__main {
  /* only main scroll */
  overflow: scroll;
  height: var(--layout-main-height);
  padding-bottom: var(--safe-area-inset-bottom);
  background-color: var(--layout-main-background-color);
}

.layout__footer {
  height: var(--layout-footer-height);
}
</style>
