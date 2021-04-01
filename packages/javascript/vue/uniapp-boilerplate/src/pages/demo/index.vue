<!--
 * @Author: Cphayim
 * @Date: 2020-03-12 16:52:15
 * @LastEditTime: 2020-03-20 00:23:12
 * @Description:
 -->
<template>
  <div>
    <button @click="go('/pages/demo/cover-camera-demo')">自定义覆盖物相机例子</button>
    <button @click="go('/pages/demo/face-scan-camera-demo')">人脸扫描相机例子</button>
    <button @click="go('/pages/demo/image-cropper-demo')">照片裁剪例子</button>
  </div>
</template>

<script>
export default {
  name: 'IndexDemo',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    go(url) {
      uni.navigateTo({ url })
    }
  }
}
</script>

<style lang="scss" scoped>
  button {
    margin: val(20);
  }
</style>
