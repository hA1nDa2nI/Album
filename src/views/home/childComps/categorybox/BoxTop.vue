<template>
  <div class="box-top">
    <span class="glyphicon glyphicon-cd" aria-hidden="true"></span>
    <slot name="name"></slot>
    <a @click="go">查看更多<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a>
  </div>
</template>

<script>
  export default {
    name: 'BoxTop',
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    methods: {
      go() {
        this.$router.push({
          path: '/list',
          query: {
            name: this.name
          }
        })
      }
    }
  }
</script>

<style scoped>
  .box-top {
    position: relative;
    border-bottom: 2px solid var(--color-tint);
    margin-bottom: 30px;
  }
  .glyphicon-cd {
    font-size: 20px;
    color: var(--color-tint);
    margin: 0 10px;
  }
  .box-top h3{
    display: inline-block;
    color: var(--color-tint);
  }
  .box-top a {
    position: absolute;
    right: 0;
    bottom: 10px;
    color: #333;
    font-size: 12px;
    cursor: pointer;
  }
  .glyphicon-menu-right {
    font-size: 12px;
  }
  .box-top a:hover {
    text-decoration: none;
    color: var(--color-high-text);
  }
</style>