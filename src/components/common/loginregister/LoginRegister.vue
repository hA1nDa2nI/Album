<template>
  <div class="content">
    <div class="form">
      <slot name="title"></slot>
      <slot name="form"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginRegister',
  }
</script>

<style scoped>
  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, .12),
      0 20px 20px rgba(95, 23, 101, .2);
  }
  .content h3 {
    text-align: center;
    margin-bottom: 30px;
    font-family: Comic Sans MS;
  }
  .form {
    margin: 50px 30px;
  }
</style>