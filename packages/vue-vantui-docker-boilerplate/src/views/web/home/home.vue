<template>
  <div class="home">
    <HeaderBar title="首页"/>
    <div class="content">
      内容区
    </div>
    <FooterTab :items="tabItems" tabActive.sync="tabActive" />
  </div>
</template>

<script>
import HeaderBar from '@/components/public/header-bar'
import FooterTab from '@/components/public/footer-tab'
export default {
  name: 'home',
  components: { HeaderBar, FooterTab },
  data() {
    return {
      tabActive: 0,
      tabItems: [{ title: '首页', icon: 'home-o' }, { title: '我的', icon: 'user-o' }]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
// 所有单位按照设计稿（750宽度）的尺寸测量填写，不要加单位
// 比如 750 设计稿上测量宽度为 100px
// width: val(100)
.home {
  font-size: val(32);
}
</style>
