<template>
  <transition name="slideLeft">
    <div class="alllist son-web">
      <div class="header" ref="header">
        <i class="icon-you" @click="ToLast"></i>
        <p>最新</p>
      </div>
      <div class="icon-header" ref="iconHeader">
        <img src="./342ac65c1038534372907d059913b07eca8088b3.jpg">
        <div class="mask"></div>
        <div class="text-left">
          推
        </div>
        <div class="text-right">
          <span>荐</span>
          <p>最新单曲</p>
        </div>
      </div>
      <scroll :data="list" class="scroll" :probeType="3" :listenScroll="true" @scroll="_scroll">
        <div>
          <div class="List-middle" ref="middle" @click="playList">
            <div>
              <img src="../../common/img/play.png">
            </div>
            <div>
              播放全部<span>(共{{ list.length }}首)</span>
            </div>
          </div>
          <div class="List-bottom">
            <div class="List-items" v-for="(item,index) in list" :key="item.id" @click="toPlayer(index)">
              <div class="items-left">
                <img :src="item.picUrl">
              </div>
              <div class="items-right">
                <p :class="playItem.id === item.id ? 'playing' : ''">{{ item.name }}</p>
                <p >{{ item.author }}</p>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <div class="fixed-middle" ref="fixedmiddle" @click="playList" v-if="show">
        <div>
          <img src="../../common/img/play.png">
        </div>
        <div>
          播放全部<span>(共{{ list.length }}首)</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {CODE} from 'common/js/config'
import {Home_getNewList} from 'api/index'
import scroll from 'base/scroll/scroll'
import {mapMutations,mapGetters,mapActions} from 'vuex'
import {setListenNum} from 'common/js/number'

export default {
  data(){
    return {
      list:[],
      pageY:0,
      show:false
    }
  },
  mounted(){
    // this.probeType = 3
    // this.listenScroll = true
    this._getNewList()
    this.headerHeight = this.$refs.iconHeader.clientHeight
  },
  computed:{
    ...mapGetters([
      'playItem'
    ])
  },
  methods:{
    ToLast() {
      this.$router.back()
    },
    _getNewList() {
      Home_getNewList().then(res => {
        if (res.data.code === CODE){
          const resData = res.data.result
          const Json = []
          for (let x in resData) {
            let _Array = {}
            _Array.id = resData[x].id
            _Array.picUrl = resData[x].song.album.picUrl
            _Array.name = resData[x].song.album.name
            _Array.author = resData[x].song.artists[0].name
            Json.push(_Array)
          }
          this.list = Json
        }
      })
    },
    _scroll(page){
      this.pageY = page.y
    },
    toPlayer(index){
      this.selectPlay({
        list:this.list,
        index:index
      })
    },
    playList(){
      this.selectPlay({
        list:this.list,
        index:0
      })
    },
    ...mapMutations({
        setListId:'SET_LIST_ID',
        setNowShow:'SET_NOWSHOW',
        setShowPlayList:'SET_SHOWPLAYLIST'
     }),
    ...mapActions([
      'selectPlay'
    ])
  },
  watch:{
    '$route'(to,from) {
      if (to.path === '/newmusic'){
        this._getNewList()
      }
    },
    pageY(newY){
      const header = this.$refs.iconHeader
      const headerHeight = header.clientHeight
      let scrollY = Math.min(0,newY)
      header.style.transform = `translateY(${scrollY}px)`
      if (newY > 0) {
        header.style.transform += `scale(${1 + newY / headerHeight })`
      }else {
        header.style.transform += `scale(1)`
        if (-newY > headerHeight){
          this.show = true
        }else {
          this.show = false
        }
      }
    }
  },
  components:{
    scroll
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .scroll
    position fixed
    height calc(100% - 80px - 310px)
    background #fff
    width 100%
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
    min-height 310px
    overflow hidden
    display flex
    align-items stretch
    z-index 10
    .mask
      width 100%
      height 100%
      position absolute 
      top 0
      left 0
      background rgba(0,0,0,.3)
      z-index -1
    &>img 
      position absolute 
      width 120%
      min-height 120%
      left -10%
      top -10%
      filter:blur(1vw) 
      z-index -1
    .text-left
      color #fff
      font-size 110px
      font-weight 600
      position absolute 
      top 150px
      left 35px
    .text-right
      color #fff
      position absolute 
      top 160px
      left 150px
      span 
        font-size 70px
        font-weight 600
      p
        font-weight 300
        font-size 22px
        margin-top 10px
  .List-middle
    display flex
    justify-content flex-start
    align-items stretch
    padding 0 0 0 20px
    box-sizing border-box
    height 100px
    z-index 5
    border-top-left-radius 30px
    border-top-right-radius 30px
    overflow hidden
    border-bottom: 1px solid #eeeeee
    &>div
      text-align center
      line-height 100px
      &:nth-child(2)
        text-align left 
        font-size $font-size-large-x
        width 62vw
        border-bottom 1px solid #e2e3e4!important
      &:last-child
        // color #333
        height 100%
        line-height 100px
        width 235px
        font-size 30px
        border-bottom 1px solid #e2e3e4
        img:last-child
          width 30px
          height 30px
          margin-right 0!important
          position relative
          top 3px
      &>span 
        font-size $font-size-large
        color #979798
        margin-left 7px
    img:first-child
      width 50px
      height 50px
      margin-right 20px!important
      position relative
      top 13px

  .List-bottom
    padding-bottom 120px
    .List-items
      height 110px
      line-height 110px
      display flex
      align-items stretch
      justify-content flex-start
      .items-left
        width 80px
        height 80px
        border-radius 8px
        overflow hidden
        margin 20px 20px
        img 
          width 100%
          min-height 100%
      .items-right
        text-align left
        border-bottom 1px solid #e2e3e4
        line-height 0
        width 85%
        p
          display inline-block
          overflow hidden
          width 100%
          text-overflow ellipsis
          white-space nowrap
        &>p:first-child
          font-size $font-size-big-x
          margin-top 10px
          height 60px 
          line-height 60px
        &>p:last-child
          font-size $font-size-medium-x
          color #7d7e7f
          // margin-top 45px
          height 30px 
          line-height 30px
      &:last-child
        .items-right
          border none
  .header-background
    height 80px
  .list-background
    height 74vw
  .playing
    color #dd4238
    i 
      font-size 40px
      color #dd4238
  .fixed-middle
    display flex
    justify-content flex-start
    align-items stretch
    padding 0 0 0 20px
    box-sizing border-box
    height 100px
    z-index 5
    border-top-left-radius 30px
    border-top-right-radius 30px
    overflow hidden
    border-bottom: 1px solid #eeeeee
    position fixed
    top 80px
    background #fff
    &>div
      text-align center
      line-height 100px
      &:last-child
        text-align left 
        height 100%
        line-height 100px
        width 62vw
        font-size 30px
        border-bottom 1px solid #e2e3e4
        img:last-child
          width 30px
          height 30px
          margin-right 0!important
          position relative
          top 3px
      &>span 
        font-size $font-size-large
        color #979798
        margin-left 7px
    img:first-child
      width 50px
      height 50px
      margin-right 20px!important
      position relative
      top 13px

</style>

