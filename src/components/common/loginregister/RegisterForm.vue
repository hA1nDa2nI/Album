<template>
  <form @submit.prevent="submit_register" method="post">
    <div class="txtb">
      <input type="text" v-model="register.tel" required  lay-verify="required" @focus="txtbfocus(0)" @blur="txtbblur(0)" pattern="(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$">
      <span data-placeholder="手机号"></span>
    </div>
    <div class="txtb">
      <input type="password" v-model="register.psw" required  lay-verify="required" @focus="txtbfocus(1)" @blur="txtbblur(1)">
      <span data-placeholder="密码"></span>
    </div>
    <div class="txtb">
      <input type="password" v-model="register.repsw" required  lay-verify="required" @focus="txtbfocus(2)" @blur="txtbblur(2)">
      <span data-placeholder="确认密码"></span>
    </div>
    <div style="overflow:hidden;"><input type="checkbox" required  lay-verify="required" v-model="register.check" style="margin-top:20px;"><span>同意协议并注册</span></div>
    <button type="submit" class="over">完成注册</button>
    <p>已有账号？ 直接 <router-link to='/login'>登录</router-link></p>
  </form>
</template>

<script>
  import Modal from 'components/common/modal/Modal'

  export default {
    name: 'RegisterForm',
    components: {
      Modal
    },
    data() {
      return {
        register: {},
        message: ''
      }
    },
    methods: {
      submit_register() {
        if (this.register.psw != this.register.repsw) {
          this.message = "前后密码不一致，请重新输入!"
          alert(this.message)
          this.$store.state.logregisActive = 1
        } else {
          this.$http.post("/api/users/register", {
            phone: this.register.tel,
            password: this.register.psw
          },{}).then((data) => {
            if (data.body.affectedRows >0) {
              alert("注册成功!")
              this.$router.push('/login')
            }
          },function(response){
            console.log(response);
          })
        }
      },
      txtbfocus(i) {
        $("input").eq(i).addClass("focus")
      },
      txtbblur(i) {
        if ($("input").eq(i).val() == '') {
          $("input").eq(i).removeClass("focus")
        }
      }
    }
  }
</script>

<style scoped>
  .txtb {
    border-bottom: 2px solid #adadad;
    position: relative;
    margin-bottom: 30px;
  } 
  .txtb input {
    font-size: 15px;
    color: #333;
    border: none;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    background: none;
    outline: none;
  }
  .txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    z-index: -1;
    transition: .5s;
    margin-left: 5px;
  }
  .txtb span:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    background: linear-gradient(to right, #fbc2eb, #a18cd1);
    transition: .5s;
  }
  .focus + span::before {
    top: -5px;
  }
  .focus + span::after {
    width: 100%;
  }
  input[type="checkbox"] {
    display: block;
    float: left;
    width: 16px;
    height: 16px;
  }
  span {
    display: block;
    float: left;
    margin: 20px 0 0 5px;
    line-height: 16px;
  }
  .over {
    display: block;
    width: 270px;
    height: 34px;
    background: linear-gradient(120deg, #fbc2eb, #a18cd1, #fbc2eb);
    background-size: 200%;
    margin: 30px 0;
    color: #fff;
    border: none;
    transition: .5s;
  }
  .over:hover {
    background-position: right;
  }
  p {
    color: #000;
  }
  a {
    color: #9e48ca;
  }
</style>