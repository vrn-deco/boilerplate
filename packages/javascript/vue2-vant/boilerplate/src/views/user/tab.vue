<!--
 * @Author: Cphayim
 * @Date: 2019-09-26 09:40:19
 * @Description: 商城 Tab 页
 -->
<template>
  <Layout :title="$route.meta.title">
    <!-- 底部插槽 -->
    <template v-slot:bottom>
      <CoupleTabBar />
    </template>
    <!-- /底部插槽 -->

    <!-- 主内容 -->
    <div>我</div>
    <!-- /主内容 -->
  </Layout>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import Layout from '@/components/common/layout.vue'
import CoupleTabBar from '@/components/biz/couple-tab-bar'

@Component({
  components: { Layout, CoupleTabBar },
})
export default class UserTabPage extends Vue {
  static name = 'UserTabPage'
}
</script>

<style lang="scss" scoped></style>
