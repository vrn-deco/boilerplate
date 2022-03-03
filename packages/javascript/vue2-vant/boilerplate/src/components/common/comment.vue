<!--
 * @Author: Cphayim
 * @Date: 2019-10-18 13:06:20
 * @Description: 注释组件（用于在页面上展示一段说明文字）
 -->

<template>
  <Section class="comment">
    <van-field :value="trimContent" type="textarea" rows="1" autosize readonly />
  </Section>
</template>

<script>
import Section from './section'
export default {
  name: 'Comment',
  components: { Section },
  props: {
    content: String,
  },
  computed: {
    trimContent() {
      return this.content ? this.content.trim() : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.comment {
  ::v-deep {
    .van-cell {
      background-color: transparent;
    }
    .van-field__control {
      line-height: val(36);
      font-size: val(24);
    }
  }
}
</style>
