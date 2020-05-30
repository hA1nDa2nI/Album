<template>
  <div class="backtop" :style="{'opacity': btnFlag}" @click="backTop()">
    <span class="layui-icon layui-icon-top" aria-hidden="true"></span>
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    data() {
      return{
        btnFlag: 0
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      backTop() {
        let that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if(that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      scrollToTop() {
        let that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if(that.scrollTop >300) {
          that.btnFlag = 1
        } else {
          that.btnFlag = 0
        }
      }
    }
  }
</script>

<style scoped>
  .backtop {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 60px;
    height: 60px;
    color: var(--color-high-text);
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
    transition: all .6s;
    box-shadow: #666 0px 0px 2px;
    cursor: pointer;
  }
  .backtop span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 45px;
    font-weight: 700;
  }
</style>