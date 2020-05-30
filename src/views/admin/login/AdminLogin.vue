<template>
  <div class="adminlogin">
    <div class="container">
      <form class="layui-form" @submit.prevent="submit_login" method="post">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input type="text" name="title" v-model="login.no" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码框</label>
          <div class="layui-input-block">
            <input type="password" name="password" v-model="login.psw" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminLogin',
    data() {
      return {
        login: {}
      }
    },
    methods: {
      submit_login() {
        this.$http.post("/api/admin/login", {
          no: this.login.no,
          password: this.login.psw
        },{}).then((data) => {
          if (typeof(data.body) === 'object') {
            this.$store.state.admin = data.body[0]
            this.$router.push('/adminhome')
          } else {
            alert(data.body)
          }
        },function(response) {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
.adminlogin {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  background-color: #eee;
}
.layui-form {
  position: absolute;
  max-width: 330px;
  padding: 35px 20px 35px 0;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 30px 60px rgba(0, 0, 0, .12), 0 20px 20px rgba(95, 23, 101, .2);
}
.layui-form-item {
  text-align: center;
}
</style>