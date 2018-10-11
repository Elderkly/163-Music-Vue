// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Axios from 'axios'
import VueLazyload from 'vue-lazyload'
//  stylus
import 'common/stylus/index.styl'

Vue.config.productionTip = false

// Axios.defaults.baseURL = '/api'
// Axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.use(VueLazyload, {
  loading: require('common/img/loading.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
