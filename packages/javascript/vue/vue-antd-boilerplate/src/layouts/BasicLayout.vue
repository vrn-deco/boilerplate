<template>
  <ProLayout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    v-bind="settings"
  >
    <template #menuHeaderRender>
      <div>
        <img :src="logoSVG" alt="" />
        <h1>{{ title }}</h1>
      </div>
    </template>

    <template #headerContentRender>
      <div>
        <a-tooltip title="刷新页面" placement="bottom">
          <a-icon type="reload" style="font-size: 18px;cursor: pointer;" @click="handleReload" />
        </a-tooltip>
      </div>
    </template>

    <!-- <SettingDrawer :settings="settings" @change="handleSettingChange">
      <div style="margin: 12px 0;">
        This is SettingDrawer custom footer content.
      </div>
    </SettingDrawer> -->
    <template #rightContentRender>
      <RightContent
        :top-menu="settings.layout === 'topmenu'"
        :is-mobile="isMobile"
        :theme="settings.theme"
      />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template #footerRender>
      <GlobalFooter />
    </template>

    <template>
      <!-- 面包屑和标题 -->
      <div class="content-header">
        <Breadcrumb />
        <h1 class="title">{{ $route.meta.title }}</h1>
      </div>
      <!-- /面包屑和标题 -->

      <!-- 主内容视图 -->
      <router-view />
      <!-- /主内容视图 -->
    </template>
  </ProLayout>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ProLayout from '@ant-design-vue/pro-layout'
import Breadcrumb from '@/components/Breadcrumb'
// import { i18nRender } from '@/locales'

import config from '@/config'
import RightContent from '@/components/global-header'
import GlobalFooter from '@/components/global-footer'
// import Ads from '@/components/Other/CarbonAds'
import logoSVG from '@/assets/svg/logo.svg?inline'
import Component from 'vue-class-component'
import { lifeCycle } from '@/utils/decorators'

const defaultSettings = config.ENVS.ANTD

@Component({
  name: 'BasicLayout',
  components: {
    ProLayout,
    RightContent,
    GlobalFooter,
    Breadcrumb,
  },
  computed: {
    ...mapGetters('permission', {
      // 动态主路由
      mainMenu: 'addRoutes',
    }),
  },
  watch: {
    $route(to, from) {},
  },
})
export default class BasicLayout extends Vue {
  logoSVG = logoSVG
  // preview.pro.antdv.com only use.
  isProPreviewSite =
    process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development'
  // end

  // base
  menus = []
  // 侧栏收起状态
  collapsed = false
  title = config.ENVS.PROJECT_NAME
  settings = {
    // 布局类型
    layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
    // CONTENT_WIDTH_TYPE
    contentWidth: defaultSettings.layout === 'sidemenu' ? 'Fluid' : defaultSettings.contentWidth,
    // 主题 'dark' | 'light'
    theme: defaultSettings.navTheme,
    // 主色调
    primaryColor: defaultSettings.primaryColor,
    fixedHeader: defaultSettings.fixedHeader,
    fixSiderbar: defaultSettings.fixSiderbar,
    colorWeak: defaultSettings.colorWeak,

    hideHintAlert: false,
    hideCopyButton: false,
  }

  // 媒体查询
  query = {}

  // 是否手机模式
  isMobile = false

  created() {
    // 在 permission.store.addRoutes 中找到 path 为 '/' 的路由
    const routes = this.mainMenu.find(item => item.path === '/')
    // 使用其子路由生成菜单
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      // this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      // this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  }

  @lifeCycle
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    // if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
    //   updateTheme(this.settings.primaryColor)
    // }
  }

  handleMediaQuery(val) {
    this.query = val
    if (this.isMobile && !val['screen-xs']) {
      this.isMobile = false
      return
    }
    if (!this.isMobile && val['screen-xs']) {
      this.isMobile = true
      this.collapsed = false
      this.settings.contentWidth = 'Fluid'
      // this.settings.fixSiderbar = false
    }
  }

  handleCollapse(val) {
    this.collapsed = val
  }

  handleSettingChange({ type, value }) {
    type && (this.settings[type] = value)
    switch (type) {
      case 'contentWidth':
        this.settings[type] = value
        break
      case 'layout':
        if (value === 'sidemenu') {
          this.settings.contentWidth = 'Fluid'
        } else {
          this.settings.fixSiderbar = false
          this.settings.contentWidth = 'Fixed'
        }
        break
    }
  }

  handleReload() {
    window.location.reload()
  }
}
</script>

<style lang="less">
@import '~ant-design-vue/es/style/themes/default.less';

.ant-pro-global-header-index-right {
  margin-right: 8px;

  &.ant-pro-global-header-index-dark {
    .ant-pro-global-header-index-action {
      color: hsla(0, 0%, 100%, 0.85);

      &:hover {
        background: #1890ff;
      }
    }
  }

  .ant-pro-account-avatar {
    .antd-pro-global-header-index-avatar {
      margin: ~'calc((@{layout-header-height} - 24px) / 2)' 0;
      margin-right: 8px;
      color: @primary-color;
      vertical-align: top;
      background: rgba(255, 255, 255, 0.85);
    }
  }

  .menu {
    .anticon {
      margin-right: 8px;
    }

    .ant-dropdown-menu-item {
      min-width: 100px;
    }
  }
}

.content-header {
  padding: 12px 24px;
  margin: -24px -24px 24px;
  background-color: #fff;
  .title {
    margin: 0;
    font-size: 22px;
  }
}
</style>
