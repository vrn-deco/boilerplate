<!--
 * @Author: Cphayim
 * @Date: 2020-03-14 18:11:45
 * @Description:
 -->
<template>
  <Layout :title="$route.meta.title" leftArrow>
    <div class="wrap">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-pull-refresh>
    </div>
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
  static name = 'MallListPage'

  content = ''

  list = []
  loading = false
  finished = false
  refreshing = false

  mounted() {
    this.featchData()
  }

  @UseLoading('模拟请求...')
  async featchData() {
    const content = await this.getMockData()
    this.content = content
  }

  getMockData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('内容内容内容内容内容内容内容')
      }, 1000)
    })
  }

  onLoad() {
    setTimeout(() => {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }

      for (let i = 0; i < 10; i++) {
        this.list.push(this.list.length + 1)
      }
      this.loading = false

      if (this.list.length >= 40) {
        this.finished = true
      }
    }, 1000)
  }

  onRefresh() {
    // 清空列表数据
    this.finished = false

    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    this.loading = true
    this.onLoad()
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: val(20) 0;
}
</style>
