<!--
 * @Author: Cphayim
 * @Date: 2019-09-26 09:40:19
 * @LastEditTime: 2020-03-14 18:31:13
 * @Description: 商城 Tab 页
 -->
<template>
  <Layout title="商城">
    <!-- 底部插槽 -->
    <template v-slot:bottom>
      <CoupleTabBar />
    </template>
    <!-- /底部插槽 -->

    <!-- 主内容 -->
    <div>
      <van-button @click="toDetail">前往详情</van-button>
    </div>
    <!-- /主内容 -->
  </Layout>
</template>

<script>
import Layout from '@/components/common/layout.vue'
import CoupleTabBar from '@/components/biz/couple-tab-bar'
import MallDetailPage from './detail.vue'

export default {
  name: 'MallTabPage',
  components: { Layout, CoupleTabBar },
  computed: {},
  methods: {
    toDetail() {
      this.$router.push({ name: MallDetailPage.name })
    },
  },
}
</script>

<style lang="scss" scoped></style>
