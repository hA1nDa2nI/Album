<template>
  <form @submit.prevent="submit_login" method="post">
    <div class="txtb">
      <input type="tel" v-model="login.tel" required  lay-verify="required" @focus="txtbfocus(0)" @blur="txtbblur(0)" pattern="(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$">
      <span data-placeholder="手机号"></span>
    </div>
    <div class="txtb">
      <input type="password" v-model="login.psw" required  lay-verify="required" @focus="txtbfocus(1)" @blur="txtbblur(1)">
      <span data-placeholder="密码"></span>
    </div>
    <button type="submit" class="over">LOGIN</button>
    <p>没有账号？ <router-link to='/register'>注册</router-link></p>
    <p>忘记密码？ <button type="button" class="forget" data-toggle="modal" data-target="#exampleModal">立即找回</button></p>
  </form>
</template>

<script>
  import Modal from 'components/common/modal/Modal'

  export default {
    name: 'LoginForm',
    components: {
      Modal
    },
    data() {
      return {
        login: {},
        message: ''
      }
    },
    methods: {
      // 点击login后触发事件
      submit_login() {
        this.$http.post("/api/users/login",{
          phone: this.login.tel,
          password: this.login.psw
        },{}).then((data) => {
          if (typeof(data.body) === 'object') {
            // alert("登录成功,立即前往首页!")
            this.$store.state.user_id = data.body[1]
            this.$store.state.profileStatus = true
            this.$router.push('/home')
          } else {
            alert(data.body)
          }
        },function(response){
          console.log(response);
        })
      },
      txtbfocus(i) {
        $("input").eq(i).addClass("focus")
      },
      txtbblur(i) {
        if ($("input").eq(i).val() == '') {
          $("input").eq(i).removeClass("focus")
        }
      },
      forget() {
        $("#exampleModal").show()
        $("#exampleModal").css('opacity', 1)
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
    height: 40px;
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
  .over {
    display: block;
    width: 250px;
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
  .forget {
    background: none;
    border: none;
    color: #9e48ca;
  }
  .forget:hover {
    text-decoration: underline;
  }
</style>