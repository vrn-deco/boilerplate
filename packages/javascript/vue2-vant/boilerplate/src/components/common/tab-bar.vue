<!--
 * @Author: Cphayim
 * @Date: 2019-09-05 14:23:30
 * @Description: 底部 Tab 栏
 *
 * props
 * - items: Array<{
 *      title: string // 显示文字
 *      to: string // 路由地址
 *      // 显示的图标，可以是 vant 提供的图标字符串，也可以是两种状态的 base64 图片的自定义图标
 *      icon: string | { normal: base64Img, active: base64Img}
 *   }>
 * - customIcon: boolean // 你需要告诉 tabBar 组件，是否使用了自定义图标
 -->

<template>
  <!-- 占位层 -->
  <div class="tab-bar-wrap">
    <!-- 悬浮层 -->
    <van-tabbar route fixed>
      <!-- 使用自定义图标 -->
      <template v-if="customIcon">
        <van-tabbar-item v-for="item in items" :key="item.title" :to="item.to" replace>
          {{ item.title }}
          <template v-slot:icon="props">
            <!-- 插槽作用域，访问 van-tabbar-item 内的状态 -->
            <img :src="props.active ? item.icon.active : item.icon.normal" />
          </template>
        </van-tabbar-item>
      </template>
      <!-- /使用自定义图标 -->
      <!-- 使用内置图标 -->
      <template v-else>
        <van-tabbar-item
          v-for="item in items"
          :key="item.title"
          :icon="item.icon"
          :to="item.to"
          replace
        >
          {{ item.title }}
        </van-tabbar-item>
      </template>
      <!-- /使用内置图标 -->
    </van-tabbar>
    <!-- /悬浮层 -->
  </div>
  <!-- /占位层 -->
</template>

<script>
export default {
  name: 'TabBar',
  components: {},
  props: {
    // 是否使用了自定义图标
    customIcon: Boolean,
    items: {
      type: Array,
      default: () => [],
      // 必须存在 item 项且不能超过 5 个
      validator: (items) => items.length && items.length <= 5,
    },
  },
}
</script>

<style lang="scss" scoped>
// 底部占位
.tab-bar-wrap {
  position: relative;
  z-index: 99;
  height: val(100);
}
</style>
