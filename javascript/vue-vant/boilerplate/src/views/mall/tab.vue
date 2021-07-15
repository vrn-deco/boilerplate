<!--
 * @Author: Cphayim
 * @Date: 2019-09-26 09:40:19
 * @LastEditTime: 2020-05-14 16:03:45
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
    <div class="wrap">
      <Section>
        <van-button @click="toDetail" type="info" block>路由跳转动画示例</van-button>
      </Section>
      <Section>
        <van-button @click="toVantDemo" type="primary" block>VantUI 示例</van-button>
      </Section>
    </div>
    <!-- /主内容 -->
  </Layout>
</template>

<script>
import Layout from '@/components/common/layout.vue'
import Section from '@/components/common/section.vue'
import CoupleTabBar from '@/components/biz/couple-tab-bar'

import { VantUIDemoPage } from '@/views/demo'

import MallDetailPage from './list.vue'

export default {
  name: 'MallTabPage',
  components: { Layout, Section, CoupleTabBar },
  computed: {},
  methods: {
    toDetail() {
      this.$router.push({ name: MallDetailPage.name })
    },
    toVantDemo() {
      this.$router.push({
        name: VantUIDemoPage.name,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: val(20);
}
</style>
