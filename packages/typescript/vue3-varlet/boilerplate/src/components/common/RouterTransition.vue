<!--
 * @Author: Cphayim
 * @Description: router transition
 * 添加路由过渡动画
 * 注意你需要在路由配置添加 meta.depth
 * 当从较小的 depth 前往较大的 depth 时（进入子页面），将使用进入动画
 * 当从较大的 depth 前往较小的 depth 时（返回父页面），将使用退出动画
 * 同级 depth 或一方未定义 depth 不使用动画
 -->
<template>
  <transition :name="transitionName">
    <slot />
  </transition>
</template>

<script setup lang="ts">
import { RouteLocationNormalized } from 'vue-router'

enum Direction {
  Left = 'left',
  Right = 'right',
  None = 'none',
}

const direction = ref(Direction.None)
const transitionName = computed(() => `slide-${direction.value}`)

function setDirection(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const toDepth = to.meta.depth as number | undefined
  const fromDepth = from.meta.depth as number | undefined
  if (toDepth === fromDepth || toDepth === void 0 || fromDepth === void 0) {
    direction.value = Direction.None
  } else if (toDepth > fromDepth) {
    direction.value = Direction.Left
  } else {
    direction.value = Direction.Right
  }
}

const router = useRouter()
router.beforeEach((to, from, next) => {
  setDirection(to, from)
  next()
})
</script>

<style>
:root {
  --router-transition-duration: 0.3s;
  --router-transition-exit-distance: -60%;
  --router-transition-entry-distance: 100%;
  --router-transition-mask-brightness: 0.7;
}
</style>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: all;
  transition: all calc(var(--transition-rate) * var(--router-transition-duration)) ease-in-out;
  box-shadow: 0 0 4px #aaa;
}

.slide-right-enter-from {
  filter: brightness(var(--router-transition-mask-brightness));
  transform: translate3d(var(--router-transition-exit-distance), 0, 0);
}

.slide-right-leave-active {
  z-index: 1;
  transform: translate3d(var(--router-transition-entry-distance), 0, 0);
}

.slide-left-enter-from {
  transform: translate3d(var(--router-transition-entry-distance), 0, 0);
}

.slide-left-leave-active {
  z-index: -1;
  filter: brightness(var(--router-transition-mask-brightness));
  transform: translate3d(var(--router-transition-exit-distance), 0, 0);
}
</style>
