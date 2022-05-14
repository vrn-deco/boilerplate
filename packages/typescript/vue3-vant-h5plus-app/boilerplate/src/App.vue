<script setup lang="ts">
import config from './config'
import { useAuthStore } from './stores/auth.store'
import { useRouterStore } from './stores/router.store'

useTitle(config.APP.APP_NAME)
const keepAlived = toRef(useRouterStore(), 'keepAlived')

// 如果你需要观察登录态并自动跳转，使用下方的 watch
// 它只负责观察运行期间 isLogin 的变化
// 例如：登录成功 -> 存入 token -> isLogin: true -> 自动跳转到首页
//      接口 401 -> 清掉 token -> isLogin: false -> 自动跳转到登录页
// 你还应该配合路由守卫一起使用
const authStore = useAuthStore()
const router = useRouter()
watch(
  () => authStore.isLogin,
  (isLogin) => (isLogin ? router.push('/') : router.push('/login')),
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <RouterTransition>
      <KeepAlive :include="keepAlived">
        <component :is="Component" :key="$route.fullPath" />
      </KeepAlive>
    </RouterTransition>
  </router-view>
</template>

<style>
#app {
}
</style>
