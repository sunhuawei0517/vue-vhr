<template>
  <div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginContainer">

      <h2 class="loginTitle">微人事系统登录</h2>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="LoginRemember">记住我</el-checkbox>

      <el-button type="primary" style="width: 100%" @click="submitLogin('loginForm')">登录</el-button>


    </el-form>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123"
      },
      rules: {
        username:
            [
              {required: true, message: '请输入用户名', trigger: 'blur', placeholder: "请输入用户名"}
            ],
        password:
            [
              {required: true, message: '请输入密码', trigger: 'blur', placeholder: "请输入密码"}
            ]
      },
      checked: true
    }
  },
  methods: {
    submitLogin(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
            if (resp) {
              // 存入浏览器中的storage中，浏览器关闭这个就消失了
              window.sessionStorage.setItem("user",JSON.stringify(resp.data))
              // replace 浏览器没有后退 push 可后退
              this.$router.replace("/home")
            }
          })
        } else {
          this.$message.error('请输入所有内容');
          return false;
        }
      });
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 250px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0px auto 20px auto;
  text-align: center;
}

.LoginRemember {
  margin: 0px 0px 15px auto;
  text-align: right;
}
</style>