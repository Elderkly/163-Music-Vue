import Vue from 'vue'
import Router from 'vue-router'
import login from 'cpnts/login/login'
import index from 'cpnts/index/index'
import myMusic from 'cpnts/my-music/my-music'
import search from 'cpnts/search/search'
import user from 'cpnts/user/user'
import alllist from 'cpnts/allList/allList'
import newmusic from 'cpnts/newmusic/newmusic'
import {getCookie} from 'common/js/cookie'

Vue.use(Router)

const router = new Router({
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
    // {
    //   path: '/musicList',
    //   component: musicList
    // },
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
    },
    {
      path: '/alllist',
      component: alllist
    },
    {
      path: '/newmusic',
      component: newmusic
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (getCookie('userId') === null && to.path.indexOf('login') == -1){
    return next('/login')
  }else {
    return next()
  }
})

export default router
