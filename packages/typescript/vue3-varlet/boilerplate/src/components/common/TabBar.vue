<template>
  <var-tabs
    v-model:active="active"
    item-direction="vertical"
    fixed-bottom
    :indicator-size="0"
    class="tab-bars"
  >
    <var-tab
      v-for="option in tabBarOptions"
      :key="option.routerPath"
      :name="option.routerPath"
      @click="handleNavigate(option)"
    >
      <var-icon :name="option.icon" />
      <div>{{ option.title }}</div>
    </var-tab>
  </var-tabs>
</template>

<script setup lang="ts">
import { useRouterStore, TabBarOption } from '@/stores/router.store'

const router = useRouter()
const route = useRoute()

const routerStore = useRouterStore()
const tabBarOptions = toRef(routerStore, 'tabBarOptions')

const active = ref(route.path)

function handleNavigate(option: TabBarOption) {
  router.replace(option.routerPath)
}
</script>

<style scoped></style>
