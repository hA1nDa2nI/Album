<template>
  <div id="register">
    <login-register>
      <h3 slot="title">REGISTER</h3>
      <register-form slot="form"/>
    </login-register>
  </div>
</template>

<script>
  import LoginRegister from 'components/common/loginregister/LoginRegister'
  import RegisterForm from 'components/common/loginregister/RegisterForm'

  export default {
    name: 'Register',
    components: {
      LoginRegister,
      RegisterForm
    }
  }
</script>

<style scoped>
  #register {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100vh);
    z-index: 2;
    background: linear-gradient(to right, #fbc2eb, #a18cd1);
  }
</style>