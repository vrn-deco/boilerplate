<template>
  <div class="main">
    <a-form-model ref="loginForm" :model="form" :rules="rules" class="user-layout-login">
      <!-- 错误提示 -->
      <a-alert
        v-if="false"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        message="用户名或密码错误"
      />
      <!-- /错误提示 -->
      <a-form-model-item ref="username" prop="username">
        <a-input v-model="form.username" size="large" type="text" placeholder="用户名 admin">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item ref="password" prop="password">
        <a-input-password
          v-model="form.password"
          size="large"
          placeholder="密码 123456"
          @keydown.enter="handleSubmit"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-model-item>

      <!-- <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">
          记住我
        </a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right;"
          >忘记密码</router-link
        >
      </a-form-item> -->

      <a-form-model-item style="margin-top:24px">
        <a-button
          @click="handleSubmit"
          :loading="isLoading"
          size="large"
          type="primary"
          class="login-button"
          >登录</a-button
        >
      </a-form-model-item>

      <!-- <div class="user-login-other">
        <span>其它登录方式</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">注册</router-link>
      </div> -->
    </a-form-model>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Component from 'vue-class-component'

import { lifeCycle, Lock } from '@/utils/decorators'

@Component({
  name: 'AuthLoginPage',
  components: {},
  computed: {
    ...mapGetters('auth', ['isLogin']),
  },
  watch: {
    isLogin(nVal, oVal) {
      // 登录状态改变，跳转到首页
      if (nVal) {
        this.$router.replace('/').catch(err => err)
      }
    },
  },
})
export default class AuthLoginPage extends Vue {
  isLoading = false

  form = {
    username: '',
    password: '',
  }

  rules = {
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入密码' }],
  }

  @lifeCycle
  created() {}

  @Lock()
  async handleSubmit(e) {
    this.isLoading = true
    try {
      await this.$refs.loginForm.validate()
      await this.login()
    } finally {
      this.isLoading = false
    }
  }

  async login() {
    const { username, password } = this.form
    await this.$store.dispatch('auth/login', { username, password })
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  margin-top: 60px;
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
