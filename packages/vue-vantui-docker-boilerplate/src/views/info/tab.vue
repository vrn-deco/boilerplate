<!--
 * @Author: Cphayim
 * @Date: 2019-09-26 09:40:19
 * @LastEditTime: 2020-03-14 17:16:51
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
import Layout from '@/components/common/layout.vue'
import CoupleTabBar from '@/components/biz/couple-tab-bar'

export default {
  name: 'InfoTabPage',
  components: { Layout, CoupleTabBar },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
