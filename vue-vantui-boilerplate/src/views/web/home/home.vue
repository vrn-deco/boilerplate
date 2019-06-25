<template>
  <div class="home">
    123
    <van-button type="default">默认按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.home{
  // 按照设计稿（750宽度）的尺寸测量填写，不要加单位
  // 例如此处在 iphone6 上显示为 16px
  font-size: val(32);
}
</style>
