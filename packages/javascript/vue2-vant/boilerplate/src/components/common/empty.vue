<!--
 * @Author: Cphayim
 * @Date: 2019-10-04 21:55:58
 * @Description: 暂无内容组件（一般用于空列表）
 *
 * props:
 * - text: string 显示的文字，默认为“暂无内容”
 * - icon: 传递显示的图标，可以是 base64 值或 url，有默认图标，可不指定
 -->
<template>
  <div class="empty">
    <img :src="icon" class="empty-image" />
    <p v-text="text" />
  </div>
</template>

<script>
// 默认图标
import emptyImage from '@/assets/images/empty.png'

export default {
  name: 'Empty',
  components: {},
  props: {
    text: {
      type: String,
      default: '暂无内容',
    },
    icon: {
      type: String,
      default: emptyImage,
    },
  },
}
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  font-size: val(32);
  color: #969799;
  .empty-image {
    display: block;
    width: val(340);
    height: val(340);
    margin: val(100) auto val(40);
  }
  padding: val(100) 0;
}
</style>
