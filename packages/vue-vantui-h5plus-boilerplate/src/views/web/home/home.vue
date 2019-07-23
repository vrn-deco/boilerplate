<template>
  <div class="home">
    123
    <van-button type="default">默认按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  mounted() {
    // this.printNetworkType()
    this.printScreenInfo()
    this.record()
  },
  methods: {
    // 获取网络信息
    printNetworkType() {
      const networkType = this.$plus.Network.getCurrentType()
      console.log(`网络类型: ${networkType}`)
    },
    // 获取屏幕信息
    printScreenInfo() {
      const { resolutionWidth, resolutionHeight } = this.$plus.Screen.getInfo()
      console.log(`屏幕宽度: ${resolutionWidth}`)
      console.log(`屏幕高度: ${resolutionHeight}`)
    },
    record() {
      const r = new this.$plus.Audio.Recorder()
      r.start()
        .then(res => console.log(res))
        .catch(err => console.error(err))
      setTimeout(() => {
        r.stop()
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  // 按照设计稿（750宽度）的尺寸测量填写，不要加单位
  // 例如此处在 iphone6 上显示为 16px
  font-size: val(32);
}
</style>
