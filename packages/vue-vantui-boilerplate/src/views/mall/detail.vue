<!--
 * @Author: Cphayim
 * @Date: 2020-03-14 18:11:45
 * @LastEditTime: 2020-03-14 19:47:27
 * @Description:
 -->
<template>
  <Layout title="详情" leftArrow>
    <div v-if="content">{{ content }}</div>
  </Layout>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import Layout from '@/components/common/layout.vue'
import { UseLoading } from '@/utils/decorators'

@Component({
  components: { Layout },
  computed: {},
  watch: {},
})
export default class MallDetailPage extends Vue {
  static name = 'MallDetailPage'

  content = ''

  mounted() {
    this.featchData()
  }

  @UseLoading('正在加载...')
  async featchData() {
    const content = await this.getMockData()
    this.content = content
  }

  getMockData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('内容内容内容内容内容内容内容')
      }, 2000)
    })
  }
}
</script>

<style lang="scss" scoped></style>
