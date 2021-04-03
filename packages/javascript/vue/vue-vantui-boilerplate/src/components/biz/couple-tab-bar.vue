<!--
 * @Author: Cphayim
 * @Date: 2019-09-27 09:32:30
 * @LastEditTime: 2020-03-14 17:32:20
 * @Description: 集成业务的 tabBar
 *
 * using
 * - @/components/common/tab-bar
 -->

<template>
  <TabBarVue :items="tabs" />
</template>

<script>
import { mapState } from 'vuex'

import TabBarVue from '../common/tab-bar'

export default {
  name: 'CoupleTabBar',
  components: { TabBarVue },
  computed: {
    ...mapState('setting', ['tabs']),
  },
}
</script>

<style lang="scss" scoped>
/deep/ {
  .van-tabbar-item__text {
    /* color: #999; */
  }
  .van-tabbar-item--active {
    .van-tabbar-item__text {
      /* color: #111; */
    }
  }
  .van-tabbar-item__icon {
    transform: scale(1.2);
  }
}
</style>
