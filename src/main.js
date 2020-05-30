import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'
import vcolorpicker from 'vcolorpicker'

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.use(VueLazyLoad, {
  loading: require('./assets/images/placeholder.png'),
  error: require('./assets/images/placeholder.png')
})

Vue.use(vcolorpicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.afterEach((to, from) => {
  window.scrollTo(0,0)
})
