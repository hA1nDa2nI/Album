<template>
  <div id="app">
    <keep-alive include="Home, NavBar, SearchBox">
      <router-view v-if="isRouterAlive"/>
    </keep-alive>
    <footer-top/>
    <back-top/>
  </div>
</template>
<script>
  import FooterTop from 'components/common/footer/FooterTop'
  import BackTop from 'components/common/backtop/BackTop'
  
  export default {
    name: 'App',
    components: {
      FooterTop,
      BackTop
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style scoped>
  @import 'assets/css/base.css';
</style>
