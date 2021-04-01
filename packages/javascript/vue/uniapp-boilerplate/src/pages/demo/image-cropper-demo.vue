<!--
 * @Author: Cphayim
 * @Date: 2020-03-20 00:36:30
 * @LastEditTime: 2020-03-24 14:31:21
 * @Description:
 -->
<template>
  <div class="select-image-page">
    <!-- 展示区 -->
    <div class="content">
      <button @click="handleSelect" class="select-btn">选择图片</button>
      <!-- 展示裁剪后的图片 -->
      <image :src="processed" mode="aspectFit" class="preview-img"></image>
    </div>

    <!-- 裁剪功能区 -->
    <div v-show="showCropper" class="cropper-feature-area">
      <!-- 裁剪组件：原生微信小程序自定义组件，仅在微信小程序中可用 -->
      <cropper
        id="cropper"
        :imgSrc="origin"
        :limit_move="cropperOptions.limit_move"
        :disable_rotate="cropperOptions.disable_rotate"
        :width="cropperOptions.width"
        :height="cropperOptions.height"
        :max_width="cropperOptions.max_width"
        :max_height="cropperOptions.max_height"
      ></cropper>

      <div class="opt-box">
        <button @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCropperDemo',
  components: {},
  props: {},
  data() {
    const { windowWidth, windowHeight } = uni.getSystemInfoSync()
    return {
      // 原图地址
      origin: '',
      // 裁剪后图片地址
      processed: '',
      // 是否渲染裁剪功能区
      showCropper: false,
      cropperOptions: {
        // 限制裁剪框不能超出图片范围
        limit_move: true,
        // 禁止旋转图片
        disable_rotate: true,
        width: windowWidth - 100,
        height: windowHeight - 200,
        max_width: windowWidth,
        max_height: windowHeight
      }
    }
  },
  computed: {},
  methods: {
    // 选择图片
    handleSelect() {
      uni.chooseImage({
        count: 1, // 一张图
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'], //从相册选择或拍照
        success: res => {
          this.origin = res.tempFilePaths
          this.showCropper = true
        }
      })
    },
    // 确认裁剪
    handleConfirm() {
      const originMpPage = this.$mp.page
      const cropper = originMpPage.selectComponent('#cropper')
      cropper.getImg(obj => {
        this.processed = obj.url
        this.showCropper = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-btn {
  margin: val(20);
}
.preview-img {
  display: block;
  margin: auto;
}
.cropper-feature-area {
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  .opt-box {
    position: absolute;
    z-index: 100;
    bottom: 0;
    width: 100%;
  }
}
</style>
