<!--
 * @Author: Cphayim
 * @Date: 2019-05-23 09:14:55
 * @LastEditTime: 2020-03-19 17:10:30
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
    return {
      backButtonPress: 0, // 返回键按下次数
    }
  },
  /**
   * h5plus 就绪
   * @see @/plugins/h5plus/index.js
   */
  plusReady() {
    plus.screen.lockOrientation('portrait-primary')
    // Android返回键监听事件
    plus.key.addEventListener(
      'backbutton',
      () => {
        if (this.$route.meta.index > 0) {
          // 非顶级页面，调用路由回退
          this.$router.back()
        } else {
          // 顶级页面，第一次提示，第二次退出
          this.backButtonPress++
          if (this.backButtonPress > 1) {
            plus.runtime.quit()
          } else {
            plus.nativeUI.toast('再按一次退出应用')
          }
          setTimeout(() => {
            this.backButtonPress = 0
          }, 1000)
        }
      },
      false,
    )
  },
}
</script>
