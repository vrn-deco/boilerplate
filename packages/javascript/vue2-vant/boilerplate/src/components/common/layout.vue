<!--
 * @Author: Cphayim
 * @Date: 2019-09-26 13:29:29
 * @Description: 基础布局组件
 *
 * using
 * - header-bar
 *
 * props
 * 所有 header-bar 组件的 props, 见 ./header-bar.vue
 *
 * slots
 * - top: 顶部插槽区，默认为 header-bar 组件
 * - default: 内容插槽区
 * - bottom: 底部插槽区
 * - left-aside: 左侧弹出区
 * - right-aside: 右侧弹出区
 -->
<template>
  <div class="page-layout">
    <!-- 顶部: 默认使用 header-bar 外部可以覆盖默认插槽的内容 -->
    <slot name="top">
      <HeaderBar
        :title="title"
        :leftArrow="leftArrow"
        :leftSlotIcon="leftSlotIcon"
        :leftSlotText="leftSlotText"
        :onLeftSlotTap="onLeftSlotTap"
        :rightSlotIcon="rightSlotIcon"
        :rightSlotText="rightSlotText"
        :onRightSlotTap="onRightSlotTap"
      />
    </slot>
    <!-- /顶部 -->

    <div ref="viewport" @scroll="handleScroll" class="viewport">
      <!-- 主体 -->
      <slot name="default" />
      <!-- /主体 -->
      <!-- 底部 -->
      <slot name="bottom" />
      <!-- /底部 -->
    </div>

    <!-- 左侧弹出区 -->
    <slot name="left-aside" />
    <!-- /左侧弹出区 -->
    <!-- 右侧弹出区 -->
    <slot name="right-aside" />
    <!-- /右侧弹出区 -->
  </div>
</template>

<script>
import debounce from 'debounce'
import HeaderBar from './header-bar'

export default {
  name: 'PageLayout',
  components: { HeaderBar },
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
    },
  },
  data() {
    return {
      scrollTop: 0,
    }
  },
  methods: {
    // viewport 滚动时记录滚动高度，函数防抖
    handleScroll: debounce(function (e) {
      this.scrollTop = this.$refs.viewport.scrollTop
    }, 200),
  },
  // 当回到这个页面时恢复滚动高度
  activated() {
    this.$refs.viewport.scrollTop = this.scrollTop
  },
}
</script>

<style lang="scss" scoped>
.page-layout {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  box-shadow: 0 0 val(4) #aaa;
}
.viewport {
  position: relative;
  top: val(-2);
  width: 100vw;
  // 高度为屏幕高度减去标题栏高度
  height: calc(100vh - #{val(92)});
  overflow: auto;
  overflow-x: hidden;
  // 如果你看到后面那个大括号报错无视它，语法没有错误
}
</style>
