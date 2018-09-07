<template>
  <div id="app">
    <div class="search" ><div><i class="iconfont icon-fangdajing"></i> Jopurney 很好听哦</div></div>
    <tab :list="['发现','我的','账号']"></tab>
      <!-- <keep-alive> -->
        <!-- <router-view/> -->
        <!-- <index></index>
        <my-music></my-music>
        <user></user> -->
      <!-- </keep-alive> -->
    <keep-alive>
      <router-view style="position:relative;top:-1px" />
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import tab from 'cpnts/tab/tab'
import player from 'cpnts/player/player'

// import {mapGetters,mapMutations} from 'vuex'
import {getCookie} from 'common/js/cookie'

export default {
  computed:{

  },
  created(){
    if (getCookie('userId') === null) {
      this.$router.push('/login')
    }
  },
  methods: {

  },
  components:{
    tab,
    player
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  #app
    overflow hidden
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
