<script setup lang="ts">
import { useRouterStore } from '@/stores/router.store'

const routerStore = useRouterStore()
const tabBarOptions = toRef(routerStore, 'tabBarOptions')
</script>

<template>
  <van-tabbar route fixed placeholder safe-area-inset-bottom>
    <van-tabbar-item
      v-for="option in tabBarOptions"
      :key="option.routerPath"
      :to="option.routerPath"
      :icon="option.icon"
      replace
    >
      {{ option.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
