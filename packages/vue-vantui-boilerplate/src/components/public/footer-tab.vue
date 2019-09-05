<template>
  <div class="footer-tab-wrap">
    <van-tabbar
      v-model="active"
    >
      <van-tabbar-item
        v-for="item in items"
        :key="item.title"
        replace
        :to="item.to"
        :icon="item.icon"
        fixed
      >
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'FooterTab',
  components: {},
  props: {
    active: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: () => [],
      // 必须存在 item 项且不能超过 5 个
      validator: items => items.length && items.length <= 5
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
// 底部占位
.footer-tab-wrap {
  position: relative;
  z-index: 99;
  height: val(100);
}
</style>
