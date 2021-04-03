<!--
 * @Author: benaozhi
 * @Date: 2020-07-30 18:32:36
 * @LastEditTime: 2020-10-21 14:06:19
 * @Description:
-->
<template>
  <div class="loginPage">
    <div class="login_wrap">
      <h2 class="title">{{ projectTitle }}</h2>
      <div class="login_content">
        <el-form ref="loginForm" :model="formInline" :rules="rules" label-width="70px" class="demo-form-inline" @submit.native.prevent>
          <el-form-item label="用户名" prop="user">
            <el-input class="login_form_input" v-model="formInline.user" @keyup.enter.native.stop="onSubmit" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input class="login_form_input" v-model="formInline.pass" @keyup.enter.native.stop="onSubmit" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="login_form_button" type="primary" @click="onSubmit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        user: '',
        pass: ''
      },
      rules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    projectTitle() {
      return config.PROJECT_NAME
    }
  },
  methods: {
    // 表单提交
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('auth/login', this.formInline)
        } else {
          return false
        }
      })
    },
    // 表单重置（方法未使用）
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.loginPage {
  user-select:none;
  color: $font-color;
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .login_wrap {
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.26);
    background-color: rgba(255, 255, 255, 0.192);
    border-radius: 0.3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -38%);
    .title {
      width: 100%;
      height: 8vh;
      line-height: 8vh;
      text-align: center;
      font-size: 3vmin;
      font-weight: 800;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .login_content {
      min-width: 40vh;
      box-sizing: border-box;
      padding: 2vh 7vh;
    }
    .login_form {
      max-width: 300px;
    }
    .login_form_forgot {
      float: right;
    }
    .login_form_input{
      .el-form-item__label{
        color: #fff;
      }
    }
    .login_form_button {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
