<template>
  <div id="login">
    <login-register>
      <h3 slot="title">LOGIN</h3>
      <login-form slot="form"/>
    </login-register>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">修改密码</h4>
          </div>
          <form @submit.prevent="submit_repassword" method="post">
           <div class="modal-body">
              <div class="form-group">
                <label for="tel" class="control-label">手机号:</label>
                <input type="tel" class="form-control" required  lay-verify="required" id="tel" v-model="repasswd.tel" pattern="(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$">
              </div>
              <div class="form-group">
                <label for="passwd" class="control-label">密码:</label>
                <input type="password" class="form-control" required  lay-verify="required" id="passwd" v-model="repasswd.psw">
              </div>
              <div class="form-group">
                <label for="repasswd" class="control-label">确认密码:</label>
                <input type="password" class="form-control" required  lay-verify="required" id="repasswd" v-model="repasswd.repsw">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="submit" class="over">确认修改</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginRegister from 'components/common/loginregister/LoginRegister'
  import LoginForm from 'components/common/loginregister/LoginForm'

  export default {
    name: 'Login',
    components: {
      LoginRegister,
      LoginForm
    },
    data() {
      return {
        repasswd: {},
        message: ''
      }
    },
    methods: {
      submit_repassword() {
        if (this.repasswd.psw != this.repasswd.repsw) {
          this.message = "前后密码不一致，请重新输入!"
          alert(this.message)
        } else {
          this.$http.post("/api/users/repasswd", {
            phone: this.repasswd.tel,
            password: this.repasswd.psw
          },{}).then((data) => {
            if (typeof(data.body) === 'object') {
              alert("修改成功!")
              $('#exampleModal').modal('hide')
              $('.modal-backdrop').removeClass("in")
            } else {
              alert(data.body)
            }
          },function(response){
            console.log(response);
          })
        }
      }
    }
  }
</script>

<style>
  #login {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100vh);
    z-index: 2;
    background: linear-gradient(to right, #fbc2eb, #a18cd1);
  }
  .modal-backdrop {
    z-index: 0;
  }
  .over {
    display: inlink-block;
    width: 82px;
    height: 34px;
    background: linear-gradient(120deg, #fbc2eb, #a18cd1, #fbc2eb);
    background-size: 200%;
    margin-left: 5px;
    color: #fff;
    border: none;
    transition: .5s;
    border-radius: 4px;
  }
  .over:hover {
    background-position: right;
  }
  .form-control:focus {
    border-color: #ccc;
    outline: 0;
    box-shadow: none;
  }
</style>