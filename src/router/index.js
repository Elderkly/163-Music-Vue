import Vue from 'vue'
import Router from 'vue-router'
import login from 'cpnts/login/login'
import index from 'cpnts/index/index'
import myMusic from 'cpnts/my-music/my-music'
import search from 'cpnts/search/search'
import user from 'cpnts/user/user'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/my-music',
      component: myMusic
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/user',
      component: user
    }
  ]
})
