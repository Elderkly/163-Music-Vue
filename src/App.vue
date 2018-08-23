<template>
  <div id="app">
    <div class="search" v-if='login'><div><i class="iconfont icon-fangdajing"></i> Jopurney 很好听哦</div></div>
    <tab v-if='login'></tab>
    <router-view/>
  </div>
</template>

<script>
import tab from 'cpnts/tab/tab'
import {mapGetters,mapMutations} from 'vuex'
import {getCookie} from 'common/js/cookie'

export default {
  computed:{
    ...mapGetters([
        'login'
    ])
  },
  created(){
    if (getCookie('userId') === null) {
      this.setLogin(false)
    }else {
      this.setLogin(true)
    }
  },
  methods: {
    ...mapMutations({
      setLogin:'SET_LOGIN'
    })
  },
  components:{
    tab
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .search
    height 85px
    line-height 85px
    background $color-highlight-background
    padding-top 12.5px
    box-sizing border-box
    &>div
      width 608px
      height 60px
      text-align center
      line-height 60px
      margin auto
      border-radius 10vw
      background #df645b
      color #efb2ae
      font-size $font-size-medium-x
      i 
        font-size $font-size-large
        margin-right 15px
</style>
