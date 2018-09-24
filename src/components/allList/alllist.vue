<template>
  <transition name="slideLeft">
    <div class="alllist son-web">
      <div class="header" ref="header">
        <i class="icon-you" @click="ToLast"></i>
        <p>歌单</p>
      </div>
      <div class="icon-header" ref="iconHeader">
        <img src="./logo.png">
        <div class="mask"></div>
        <div class="icon">
          <img src="./logo.png">
        </div>
        <div class="text">
          <span>精品歌单</span>
          <i class="icon-you"></i>
          <p>根据您的听歌习惯推荐歌单</p>
        </div>
      </div>
      <scroll :data="list" class="scroll" :probeType="3" :listenScroll="true" @scroll="_scroll">
        <div class="list-box">
          <div class="items" v-for="item in list" :key="item.id" @click="TomusicList(item.id)">
            <img v-lazy="item.picUrl">
            <p>
              {{ item.name }}
            </p>
            <div class="items-playCount">
              <i class="icon-erji"></i>
              {{ (item.playCount) }}
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import {CODE} from 'common/js/config'
import {Home_getPersonalizedList} from 'api/index'
import scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'
import {setListenNum} from 'common/js/number'

export default {
  data(){
    return {
      list:[],
      pageY:0
    }
  },
  mounted(){
    // this.probeType = 3
    // this.listenScroll = true
    this._getNewList()
    this.headerHeight = this.$refs.iconHeader.clientHeight
  },
  methods:{
    ToLast() {
      this.$router.back()
    },
    TomusicList(id) {
        this.setListId(id)
        this.setNowShow('playlist')
        this.setShowPlayList(true)
    },
    _getNewList() {
      Home_getPersonalizedList().then(res => {
        if (res.data.code === CODE){
          const resData = res.data.result
          const Json = []
          for (let x in resData) {
            let _Array = {}
            _Array.id = resData[x].id
            _Array.picUrl = resData[x].picUrl
            _Array.name = resData[x].name
            _Array.playCount = setListenNum(resData[x].playCount)
            Json.push(_Array)
          }
          this.list = Json
        }
      })
    },
    _scroll(page){
      this.pageY = page.y
    },
    ...mapMutations({
        setListId:'SET_LIST_ID',
        setNowShow:'SET_NOWSHOW',
        setShowPlayList:'SET_SHOWPLAYLIST'
     }),
  },
  watch:{
    '$route'(to,from) {
      if (to.path === '/alllist'){
        this._getNewList()
      }
    },
    pageY(newY){
      const header = this.$refs.iconHeader
      const headerHeight = header.clientHeight
      let scrollY = Math.min(0,newY)
      header.style.transform = `translateY(${scrollY}px)`
      if (newY > 0) {
        header.style.height = `${this.headerHeight + newY}px`
        header.style.transform += `scale(${1 + newY / headerHeight })`
      }else {
        header.style.height = this.headerHeight + 'px'
        header.style.transform += `scale(1)`
      }
    }
  },
  components:{
    scroll
  }
}
</script>

<style lang="stylus" scoped>
  .scroll
    position fixed
    height calc(100% - 80px - 310px)
    background #fff
  .header
    text-align center
    font-size 35px
    color #fff
    height 80px
    line-height 80px
    position fixed
    top 0 
    width 100%
    z-index 50
    overflow hidden
    background #dd4238
    i 
      float left 
      font-size 35px
      transform rotate(180deg)
      position relative
      left 20px
      z-index 10
  .icon-header
    margin-top 80px
    position relative
    height 310px
    overflow hidden
    display flex
    align-items stretch
    padding 60px 20px 30px
    box-sizing border-box
    &>img 
      width 150%
      min-height 150%
      position absolute 
      left -25%
      top -25%
      filter:blur(6vw)
      z-index -1
    .mask
      width 100%
      height 100%
      position absolute 
      top 0
      left 0
      background rgba(0,0,0,.3)
      z-index -1
    .icon
      width 200px
      height 200px
      overflow hidden
      img 
        width 200px
    .text
      color #fff
      margin-left 20px
      padding-top 40px
      span
        font-size 32px
      .icon-you
        font-size 24px
        color rgba(255,255,255,.7)
        position relative
        top -5px
      p
        margin-top 20px
        font-size 24px
        color rgba(255,255,255,.7)
  .list-box
    padding 16px 10px 16vw
    box-sizing border-box
    overflow hidden
    .items
      border-radius 8px
      overflow hidden
      width 360px
      position relative
      float left
      margin-bottom 25px
      &:nth-child(odd)
        margin-right 10px
      img 
        width 100%
        min-height 360px
      p
        color #333
        display block
        width 90% 
        margin 15px auto 0
      .items-playCount
          position absolute 
          right 10px
          top 8px
          color #fff
          font-size 22px
          i
            font-size 22px




</style>

