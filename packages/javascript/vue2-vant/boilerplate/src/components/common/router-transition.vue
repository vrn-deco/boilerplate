<!--
 * @Author: Cphayim
 * @Date: 2019-09-26 10:18:12
 * @Description: 路由切换过渡效果组件
 *
 * slots
 * - default: 默认插槽
 -->

<template>
  <transition :name="transitionName" @before-enter="beforeEnter" @after-enter="afterEnter">
    <slot />
  </transition>
</template>

<script>
const DIRECTION = {
  IN: 'in',
  OUT: 'out',
  NONE: 'none',
}

let first = true

export default {
  name: 'RouterTransition',
  data() {
    return {
      direction: DIRECTION.NONE,
    }
  },
  computed: {
    transitionName() {
      return `slide-${this.direction}`
    },
  },
  created() {
    if (first) {
      this.registerTransitionGuardToRouter()
      first = false
    }
  },
  methods: {
    registerTransitionGuardToRouter() {
      // 添加一个前置守卫
      this.$router.beforeEach((to, from, next) => {
        this.setDirection(to, from)
        next()
      })
    },
    setDirection(to, from) {
      /**
       * 获取 to, from 指向的 route 对象的 meta.index 值
       * index 小代表层级越靠前
       * login、tab 等页面 index 为 0
       * 其余页面按照层级从 1 开始递增
       *
       * 逻辑：
       * 1.当 to 的 index 等于 from 的 index，或其中一个 index 为 undefined，使用 none 动画（直接跳转）
       * 2.当 to 的 index 大于 from 的 index 时说明打开新的页面，使用 in 动画
       * 3.当 to 的 index 小于 from 的 index 时说明返回旧的页面，使用 out 动画
       */
      const toIndex = to.meta.index
      const fromIndex = from.meta.index
      if (toIndex === fromIndex || toIndex === undefined || fromIndex === undefined) {
        this.direction = DIRECTION.NONE
      } else if (toIndex > fromIndex) {
        this.direction = DIRECTION.IN
      } else {
        this.direction = DIRECTION.OUT
      }
    },
    beforeEnter() {},
    afterEnter() {},
  },
}
</script>

<style lang="scss" scoped>
.slide-none-enter-active,
.slide-none-leave-active,
.slide-out-enter-active,
.slide-out-leave-active,
.slide-in-enter-active,
.slide-in-leave-active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: all 0.4s ease-in-out;
}

.slide-none-enter-active,
.slide-none-leave-active {
  transition: 0s;
}

.slide-out-enter {
  opacity: 0.8;
  transform: translate3d(-100%, 0, 0);
}

.slide-out-leave-active {
  opacity: 0.8;
  transform: translate3d(100%, 0, 0);
  transition-delay: 0.05s;
}

.slide-in-enter {
  opacity: 0.8;
  transform: translate3d(100%, 0, 0);
}

.slide-in-leave-active {
  opacity: 0.8;
  transform: translate3d(-100%, 0, 0);
  transition-delay: 0.05s;
}
</style>
