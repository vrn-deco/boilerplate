<!--
 * @Author: Cphayim
 * @Date: 2020-03-09 14:18:47
 * @LastEditTime: 2020-03-14 16:08:42
 * @Description: 自定义覆盖物相机
 *
 * 镜头宽高由外层元素控制
 * 例如
 * <view class="wrap">
 *    <CoverCamera />
 * </view>
 * wrap 的宽高为 500px，则镜头宽高为 500px
 * wrap 的宽高为 300rpx,500rpx，则镜头宽高为 300rpx,500rpx
 * wrap 的宽高为 100vw,100vh，则镜头宽高为 100vw,100vh
 *
 * props
 * - mode: 'normal' | 'scanCode' [default: 'normal'] 摄像头模式，相机模式或扫码模式
 * - position: 'front' | 'back' [default: 'back'] 镜头方向
 * - flash: 'auto' | 'on' | 'off' [default: 'auto'] 闪光灯模式
 * - freeze: boolean [default: false] 当外部调用 takePhoto 组件方法拍照后是否将镜头画面冻结
 * - coverImage: string(url) 用于覆盖在镜头上的图片
 *   !!!注意: 该参数作用于 cover-image 原生组件，在真机上不支持 Buffer 和 string(base64) 类型（开发工具的模拟器上有效）
 *          如果需要自定义图片，请将图片放置在 static 目录下（uniapp 规则），外部参照本组件下方 defaultCoverPNG 变量格式传递参数
 *
 * events
 * - @stop 摄像头在非正常终止时触发
 * - @error 当用户拒绝授权开启摄像头时触发
 *
 * methods
 * - takePhoto: () => Promise<string> 拍照，返回镜头捕获的当前帧图像临时路径
 * - reset: () => void 重置冻结的相机，仅当 freeze 为 true 有效
 -->
<template>
  <view class="cover-camera">
    <camera :mode="mode" :device-position="position" :flash="flash" @error="error" class="camera"> </camera>
    <cover-view class="cover">
      <!-- ！注意：cover-image src 不支持 base64 数据 -->
      <!-- 当前成像 -->
      <cover-image v-if="photoPath" :src="photoPath" class="image photo-image" />
      <!-- 覆盖物 -->
      <!-- ！注意：在 cover-view 中使用图片可能导致安卓真机下不显示 -->
      <!-- <cover-view class="image cover-image" :style="{ backgroundImage: `url(${coverImage})` }" /> -->
      <cover-image v-if="coverImage" :src="coverImage" class="image cover-image" />
    </cover-view>
  </view>
</template>

<script>
// 默认的相机镜头外框
const defaultCoverPNG = '/static/camera-covers/default.png'

export default {
  name: 'CoverCamera',
  components: {},
  props: {
    // 相机模式
    mode: {
      type: String,
      default: 'normal'
    },
    // 镜头位置
    position: {
      type: String,
      default: 'back'
    },
    // 闪光灯状态
    flash: {
      type: String,
      default: 'auto'
    },
    // 是否冻结镜头
    freeze: {
      type: Boolean,
      default: false
    },
    // 镜头覆盖物图片
    coverImage: {
      type: String,
      default: defaultCoverPNG
    }
  },
  data() {
    return {
      photoPath: ''
    }
  },
  watch: {
    coverImage: {
      handler(n, o) {
        // console.log(n)
      },
      immediate: true
    }
  },
  computed: {},
  methods: {
    // 拍照
    async takePhoto() {
      const path = await this._take()
      if (this.freeze) {
        this.photoPath = path
      }
      return path
    },
    // 重置镜头
    reset() {
      this.photoPath = ''
    },
    stop(e) {
      this.$emit('stop', e)
    },
    error(e) {
      this.$emit('error', e)
    },
    _take() {
      return new Promise((resolve, reject) => {
        const ctx = uni.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: res => {
            const path = res.tempImagePath
            resolve(path)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-camera {
  position: relative;
  min-width: val(300);
  min-height: val(300);
  width: 100%;
  height: 100%;
  margin: auto;
}
.camera {
  width: 100%;
  height: 100%;
}
.cover {
  position: absolute;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 100%;
  .image {
    position: absolute;
    top: 0;
  }
  .cover-image {
    z-index: 10;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
}
</style>
