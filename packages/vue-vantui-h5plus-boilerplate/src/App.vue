<!--
 * @Author: Cphayim
 * @Date: 2019-05-23 09:14:55
 * @LastEditTime: 2020-03-17 13:32:56
 * @Description: 入口组件
-->

<template>
  <div id="app">
    <RouterTransition>
      <keep-alive :include="keepAliveComponents">
        <router-view />
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
