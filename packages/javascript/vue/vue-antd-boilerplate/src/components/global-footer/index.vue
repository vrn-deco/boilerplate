<template>
  <Footer class="footer custom-render">
    <template v-slot:links>
      <!-- <a href="https://www.github.com/vueComponent/pro-layout" target="_blank">Pro Layout</a>
      <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">Github</a>
      <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a> -->
    </template>
    <template v-slot:copyright>
      <div>
        <div class="copyright">{{ copyright }}</div>
      </div>
    </template>
  </Footer>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { GlobalFooter as Footer } from '@ant-design-vue/pro-layout'

import config from '@/config'

@Component({
  name: 'GlobalFooter',
  components: {
    Footer,
  },
})
export default class extends Vue {
  title = config.ENVS.PROJECT_NAME

  description = config.ENVS.DESCIPTION

  copyright = `Copyright © ${new Date().getFullYear()} ${config.ENVS.COPYRIGHT}`
}
</script>

<style lang="less" scoped>
.footer {
  margin: 0;
}
</style>
