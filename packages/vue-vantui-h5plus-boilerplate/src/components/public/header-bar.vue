<template>
  <div class="header-bar-wrap">
    <van-nav-bar
      class="header-bar"
      :title="title"
      :left-arrow="leftArrow"
    >
      <van-icon name="search" slot="right" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    leftArrow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
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
  position: absolute;
  width: 100%;
  overflow: hidden;
}
</style>
