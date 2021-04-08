<!--
 * @Author: Cphayim
 * @Date: 2021-03-29 13:34:54
 * @Description:
 - emit: cancel
 - emit: confirm
-->

<template>
  <div class="drawer">
    <a-drawer :visible="visible" :title="title" :width="width" @close="handleCancel" destroyOnClose>
      <a-spin :spinning="loading" style="height:100%">
        <div class="ant-drawer-main">
          <slot />
        </div>
        <div class="ant-drawer-footer">
          <slot name="footer">
            <div class="footer-default-wrap">
              <a-space>
                <a-button @click="handleCancel" type="default">
                  {{ cancelText }}
                </a-button>
                <a-button @click="handleConfirm" type="primary">
                  {{ confirmText }}
                </a-button>
              </a-space>
            </div>
          </slot>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Drawer',
  components: {},
  props: {
    visible: Boolean,
    title: String,
    loading: Boolean,
    width: {
      type: String,
      default: '400px',
    },
    confirmText: {
      type: String,
      default: '确认',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
  },
})
export default class Drawer extends Vue {
  handleCancel() {
    this.$emit('cancel')
  }

  handleConfirm() {
    this.$emit('confirm')
  }
}
</script>

<style lang="less" scoped>
::v-deep .ant-drawer-body {
  padding: 0;
  height: calc(100% - 55px);
}
::v-deep .ant-spin-nested-loading,
::v-deep .ant-spin-container {
  height: 100%;
}
.ant-drawer-main {
  height: calc(100% - 55px);
  padding: 24px;
}
.ant-drawer-footer {
  overflow: hidden;
  height: 55px;
  padding: 0 24px;
  border-top: 1px solid #e8e8e8;
}
.footer-default-wrap {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
</style>
