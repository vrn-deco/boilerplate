<template>
  <ConfigProvider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </ConfigProvider>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

@Component({
  name: 'App',
  components: { ConfigProvider },
})
export default class App extends Vue {
  locale = zhCN
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
</style>
