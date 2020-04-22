<!--
 * @Author: Cphayim
 * @Date: 2020-03-10 23:07:23
 * @LastEditTime: 2020-03-14 19:56:28
 * @Description: 人脸扫描相机例子
 -->
<template>
  <div>
    <FaceScanCamera
      scanBorder="2"
      @receive="handleReceive"
      @error="handleError"
      @stop="handleStop"
    />
  </div>
</template>

<script>
import FaceScanCamera from '@/components/biz/face-scan-camera'

export default {
  name: 'FaceScanCameraDemo',
  components: { FaceScanCamera },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    handleError(e) {
      console.log(e)
    },
    handleStop(e) {
      console.log(e)
    },
    handleReceive(photoPath) {
      console.log(photoPath)
    }
  }
}
</script>

<style lang="scss" scoped></style>
