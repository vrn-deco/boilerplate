<!--
 * @Author: Cphayim
 * @Date: 2019-09-26 09:40:19
 * @Description: 商城 Tab 页
 -->
<template>
  <Layout title="资讯">
    <!-- 底部插槽 -->
    <template v-slot:bottom>
      <CoupleTabBar />
    </template>
    <!-- /底部插槽 -->

    <!-- 主内容 -->
    <div>资讯</div>
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
export default class InfoTabPage extends Vue {
  static name = 'InfoTabPage'
}
</script>

<style lang="scss" scoped></style>
