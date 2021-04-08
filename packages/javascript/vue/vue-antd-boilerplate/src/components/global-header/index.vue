<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :class="prefixCls" />
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import { lifeCycle } from '@/utils/decorators'
import AvatarDropdown from './AvatarDropdown'

// import SelectLang from '@/components/SelectLang'

@Component({
  name: 'RightContent',
  components: { AvatarDropdown },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action',
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
    topMenu: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
})
export default class RightContent extends Vue {
  showMenu = true

  currentUser = {}

  get wrpCls() {
    return {
      'ant-pro-global-header-index-right': true,
      [`ant-pro-global-header-index-${
        this.isMobile || !this.topMenu ? 'light' : this.theme
      }`]: true,
    }
  }

  @lifeCycle
  mounted() {}
}
</script>
