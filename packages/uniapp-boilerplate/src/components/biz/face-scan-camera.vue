<!--
 * @Author: Cphayim
 * @Date: 2020-03-11 00:12:02
 * @LastEditTime: 2020-03-14 20:24:21
 * @Description: 人脸相机
 *
 * props
 * - once: boolean [default: true] 是否只能拍照一次，可以使用 reset 方法重置
 * - scanBorder: '1' | '2' 相机覆盖物内置图片，参考 @/static/camera-covers/face-*.png
 *
 * events
 * - @receive 当用户拍照成功时触发，返回照片临时路径
 * - @stop 摄像头在非正常终止时触发
 * - @error 当用户拒绝授权开启摄像头时触发
 *
 * methods
 * - reset: () => void 重置冻结的相机
 -->

<template>
  <div class="face-scan-camera">
    <!-- 自定义覆盖物相机 -->
    <CoverCamera
      :coverImage="coverImage"
      ref="camera"
      position="front"
      flash="off"
      :freeze="true"
      @error="error"
      @stop="stop"
    />
    <!-- 注意：需要覆盖在相机组件上的所有内容必须都是 cover-view，否则真机失效 -->
    <!-- 操作栏 -->
    <cover-view class="opt-box">
      <cover-view class="text-tip">请保证光线充足，平视屏幕，面部足够清晰</cover-view>
      <cover-view class="take-btn" hover-class="take-btn-hover" @click="takePhoto">拍照</cover-view>
    </cover-view>
  </div>
</template>

<script>
import CoverCamera from '@/components/common/cover-camera'

const faceScanPNG1 = '/static/camera-covers/face-1.png'
const faceScanPNG2 = '/static/camera-covers/face-2.png'

export default {
  name: 'FaceScanCamera',
  components: { CoverCamera },
  props: {
    scanBorder: {
      type: String,
      default: '1'
    },
    once: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      flag: false
    }
  },
  computed: {
    coverImage() {
      return this.scanBorder.toString() === '1' ? faceScanPNG1 : faceScanPNG2
    }
  },
  mounted() {
  },
  methods: {
    async takePhoto() {
      // 当仅允许拍摄一次并已经拍摄过
      if(this.once && this.flag) return

      const camera = this.$refs['camera']
      if (!camera) return

      const photoPath = await camera.takePhoto()
      this.$emit('receive', photoPath)
      this.flag = true
    },
    reset() {
      const camera = this.$refs['camera']
      if (!camera) return
      camera.reset()
      this.flag = false
    },
    stop(e) {
      this.$emit('stop', e)
    },
    error(e) {
      this.$emit('error', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.face-scan-camera {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #333;
}
.opt-box {
  z-index: 99;
  position: absolute;
  bottom: val(80);
  padding: val(40);
  width: 100%;
  .take-btn {
    border-radius: 5px;
    line-height: 2.55555556;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    background-color: #5373fa;
  }
  .take-btn-hover {
    background-color: rgba($color: #5373fa, $alpha: 0.3);
  }
  .text-tip {
    margin-bottom: val(120);
    font-size: val(28);
    text-align: center;
    color: #fff;
  }
}
</style>
