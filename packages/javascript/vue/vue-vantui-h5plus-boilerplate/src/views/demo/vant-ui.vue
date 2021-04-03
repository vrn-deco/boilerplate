<!--
 * @Author: Cphayim
 * @Date: 2020-05-14 15:33:26
 * @LastEditTime: 2020-05-14 15:50:33
 * @Description: vant 演示 demo
 -->
<template>
  <div class="vant-ui-demo">
    <iframe :src="demoURI" frameborder="0" class="demo-frame"></iframe>
    <van-button @click="openDoc" round type="info" class="doc-btn">查看文档</van-button>
  </div>
</template>

<script>
const demoURI = `https://youzan.github.io/vant/mobile.html#/zh-CN/`
const docURI = `https://youzan.github.io/vant/`
export default {
  name: 'VantUIDemoPage',
  components: {},
  props: {},
  data() {
    return { demoURI, docURI }
  },
  computed: {},
  methods: {
    openDoc() {
      const newWindow = window.open()
      newWindow.opener = null
      newWindow.location = docURI
      newWindow.target = '_blank'
    },
  },
}
</script>

<style lang="scss" scoped>
.demo-frame {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.doc-btn {
  position: fixed;
  z-index: 10;
  right: val(50);
  bottom: val(50);
}
</style>
