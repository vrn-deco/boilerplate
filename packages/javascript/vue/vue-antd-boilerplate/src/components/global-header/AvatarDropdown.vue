<template>
  <a-dropdown v-if="userInfo" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="antd-pro-global-header-index-avatar"
      />
      <span>{{ userInfo.nickname }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu v-if="menu" class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="center" @click="handleToCenter">
          <a-icon type="user" />
          个人中心
        </a-menu-item>
        <a-menu-item key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          个人设置
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'

@Component({
  name: 'AvatarDropdown',
  props: {
    menu: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['userInfo']),
  },
})
export default class AvatarDropdown extends Vue {
  handleToCenter() {
    // this.$router.push({ path: '/account/center' })
  }

  handleToSettings() {
    // this.$router.push({ path: '/account/settings' })
  }

  handleLogout(e) {
    this.$confirm({
      title: '提示',
      content: '确认要退出登录吗？',
      onOk: () => {
        this.$store.dispatch('auth/logout')
      },
      onCancel() {},
    })
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
