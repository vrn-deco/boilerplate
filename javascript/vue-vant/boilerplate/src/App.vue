<!--
 * @Author: Cphayim
 * @Date: 2019-05-23 09:14:55
 * @LastEditTime: 2020-03-19 17:10:26
 * @Description: 入口组件
-->

<template>
  <div id="app">
    <!-- 路由窗体过度动画 -->
    <RouterTransition>
      <!-- 动态添加移除的 keepAlive 组件列表 -->
      <keep-alive :include="keepAliveComponents">
        <router-view :key="$route.fullpath" />
      </keep-alive>
    </RouterTransition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RouterTransition from '@/components/common/router-transition.vue'
export default {
  name: 'App',
  components: { RouterTransition },
  computed: {
    // 动态添加移除的 keepalive 列表
    ...mapState(['keepAliveComponents']),
  },
  data() {
    return {}
  },
}
</script>
