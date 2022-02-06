<!--
 * @Author: Cphayim
 * @Date: 2019-09-05 14:23:30
 * @LastEditTime: 2019-10-12 15:32:21
 * @Description: 顶部标题栏
 *
 * props
 * - title: string 标题
 * - leftArrow: boolean 左侧是否显示返回箭头（自带 router.back() 功能）
 * - leftSlotIcon: string 左侧插槽的图标，见 vant-icon https://youzan.github.io/vant/#/zh-CN/icon
 * - leftSlotText: string 左侧插槽的文字
 * - onLeftSlotTap: Function 左侧插槽被点击的回调
 * - rightSlotIcon: string 右侧插槽的图标，见 vant-icon https://youzan.github.io/vant/#/zh-CN/icon
 * - rightSlotText: string 右侧插槽的文字
 * - onRightSlotTap: Function 右侧插槽被点击的回调
 -->

<template>
  <!-- 占位层 -->
  <div class="header-bar-wrap">
    <!-- 悬浮层 -->
    <van-nav-bar
      class="header-bar"
      :title="title"
      :left-arrow="leftArrow"
      :left-text="leftSlotText"
      :right-text="rightSlotText"
      @click-left="handleLeftSlotTap"
      @click-right="onRightSlotTap"
      :border="false"
    >
      <!-- 左侧插槽: 当 leftArrow 为 true 或 leftSlotText 有值时忽略插槽内容 -->
      <template v-if="!leftArrow && !leftSlotText" v-slot:left>
        <van-icon size="1.3rem" color="#323233" :name="leftSlotIcon" />
      </template>
      <!-- /左侧插槽 -->

      <!-- 右侧插槽: 当rightSlotText 有值时忽略插槽内容 -->
      <template v-if="!rightSlotText" v-slot:right>
        <van-icon size="1.3rem" color="#323233" :name="rightSlotIcon" />
      </template>
      <!-- /右侧插槽 -->
    </van-nav-bar>
    <!-- /悬浮层 -->
  </div>
  <!-- /占位层 -->
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    // 标题
    title: {
      type: String,
      default: '标题',
    },
    // 是否显示左侧返回箭头
    leftArrow: {
      type: Boolean,
      default: false,
    },
    // 左侧插槽显示的图标
    // @see https://youzan.github.io/vant/#/zh-CN/icon
    leftSlotIcon: {
      type: String,
    },
    // 左侧插槽文字
    leftSlotText: {
      type: String,
    },
    // 左侧插槽被点击的回调
    onLeftSlotTap: {
      type: Function,
      default: () => {},
    },
    // 右侧插槽显示的图标
    // @see https://youzan.github.io/vant/#/zh-CN/icon
    rightSlotIcon: {
      type: String,
    },
    // 右侧插槽文字
    rightSlotText: {
      type: String,
    },
    // 右侧插槽被点击的回调
    onRightSlotTap: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    handleLeftSlotTap() {
      // 当左侧插槽被点击时，判断 leftArrow 是否为 true
      // 当 leftArrow 为 true 时执行路由回退，忽略自定义回调
      // 否则执行自定义回调
      if (this.leftArrow) {
        this.$router.back()
      } else {
        this.onLeftSlotTap()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// 顶部占位
.header-bar-wrap {
  position: relative;
  height: val(92);
  z-index: 99;
}
.header-bar {
  position: fixed;
  width: 100%;
  overflow: hidden;
}
.van-nav-bar__text {
  color: #323233;
}
</style>
