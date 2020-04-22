<!--
 * @Author: Cphayim
 * @Date: 2020-03-09 14:21:08
 * @LastEditTime: 2020-03-12 17:07:55
 * @Description: 自定义覆盖物相机例子
 -->
<template>
  <view>
    <!-- 摄像头组件 -->
    <div class="wrap">
      <CoverCamera ref="camera" position="front" flash="off" :freeze="true" />
    </div>
    <button type="primary" class="take-photo-btn" @click="takePhoto">拍照</button>
  </view>
</template>

<script>
import CoverCamera from '@/components/common/cover-camera'
import { getImageInfo, getFileInfo } from '@/utils/mp/file'

export default {
  name: 'CoverCameraDemo',
  components: { CoverCamera },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    async takePhoto() {
      const camera = this.$refs['camera']
      if (!camera) return
      const photoPath = await camera.takePhoto()
      const [fileInfo, imageInfo] = await Promise.all([getFileInfo(photoPath), getImageInfo(photoPath)])
      console.log(fileInfo)
      console.log(imageInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: val(500);
  height: val(500);
  margin: auto;
}
.take-photo-btn {
  margin: val(30) 0;
  background-color: #278ae7;
}
</style>
