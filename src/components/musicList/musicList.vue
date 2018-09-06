<template>
  <transition name="list">
    <div class="son-web">
      <div :class="fixed ? 'fixedHeader header' : 'header'">
        <img :src="listData.coverImgUrl">
        <i class="icon-you" @click="ToLast"></i>
        {{ title }}
      </div>
      <Scroll :data="listData" v-if="listData!== null"  class="list-bigBox" @scroll="scroll" :scrollTop="scrollTop" :probe-type="probeType" :listen-scroll="listenScroll">
        <div>
          <div class="List-top">
            <img :src="listData.coverImgUrl">
            <div class="List-data">
              <div class="data-left">
                <img :src="listData.coverImgUrl">
                <div class="data-left-rightData">
                  <i class="icon-erji"></i>
                  {{ _getNumber(listData.playCount) }}
                </div>
              </div>
              <div class="data-right">
                <p>{{ listData.name }}</p>
                <div ref='author'>
                  <img :src="listData.creator.backgroundUrl">
                  {{ listData.creator.nickname }}
                  <i class="icon-you"></i>
                </div>
              </div>
            </div>
            <div class="ListButton">
              <div class='tab'>
                <i class="icon-pinglun"></i>
                <p>{{ listData.commentCount }}</p>
              </div>
              <div class='tab'>
                <i class="icon-fenxiang"></i>
                <p>{{ listData.shareCount }}</p>
              </div>
              <div class='tab'>
                <i class="icon-xiazai"></i>
                <p>下载</p>
              </div>
              <div class='tab'>
                <i class="icon-duoxuan"></i>
                <p>多选</p>
              </div>
            </div>
          </div>
          <div class="List-middle" ref="middle">
            <div>
              <img src="../../common/img/play.png">
            </div>
            <div>
              播放全部<span>(共{{ listData.tracks.length }}首)</span>
            </div>
            <div>
              <div class="noCollect">
                <img src="../../common/img/add.png">
                收藏({{ listData.subscribedCount }})
              </div>
            </div>
          </div>
          <div class="List-bottom">
            <div class="List-items" v-for="(item,index) in listData.tracks" :key="item.id">
              <div class="items-left">
                {{ index+1 }}
              </div>
              <div class="items-right">
                <p>{{ item.al.name }}</p>
                <p>{{ item.ar[0].name }}</p>
              </div>
            </div>
          </div>
        </div> 
      </Scroll>
      <download v-else></download>

      <div class="fixed-middle" v-if="fixed">
        <div>
          <img src="../../common/img/play.png">
        </div>
        <div>
          播放全部<span>(共{{ listData.tracks.length }}首)</span>
        </div>
        <div>
          <div class="noCollect">
            <img src="../../common/img/add.png">
            收藏({{ listData.subscribedCount }})
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {Music_GetListData} from 'api/music'
import {mapGetters} from 'vuex'
import {CODE} from 'common/js/config'
import Scroll from 'base/scroll/scroll'
import download from 'base/download/download'
import {setListenNum} from 'common/js/number.js'

export default {
  computed: {
    ...mapGetters([
      'listId'
    ])
  },
  data() {
    return {
      listData:null,
      scrollY:0,
      title:'歌单',
      fixed:false,
      scrollTop:false
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true

    this._getList()
  },
  methods: {
    scroll(pos){
      this.scrollY = pos.y
      // console.log(this.scrollY)
    },
    _getNumber(number) {
      return setListenNum(number)
    },
    ToLast() {
      this.$router.back()
    },
    _getList() {
      if (this.listId === null) {
        this.$router.push('/index')
        return
      }
      Music_GetListData(this.listId).then(res => {
        if (res.data.code === CODE) {
          this.listData = res.data.playlist
        }
      })
    }
  },
  components: {
    Scroll,
    download
  },
  watch: {
    scrollY(newY){
      const scrollY = Math.abs(newY)
      const authorHeight = this.$refs.author.offsetTop
      const middleHeight = this.$refs.middle.offsetTop - this.$refs.middle.clientHeight + 10
      if (scrollY > authorHeight) {
        this.title = this.listData.name
      }else {
        this.title = '歌单'
      }

      if (scrollY > middleHeight){
        this.fixed = true
      }else {
        this.fixed = false
      }
    },
    '$route' (to, from) {
      //  由于用了vue-router导致created只执行第一次 所以只能监控router进行刷新数据
      if (to.path === '/musicList') {
        this.listData = null
        this.scrollTop = true
        this._getList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .list-enter-active,.list-leave-active
    transition all .3s
  .list-enter,.list-leave-to
    transform translateX(100%)
  .fixed-middle
    display flex
    justify-content flex-start
    align-items stretch
    padding 0 0 0 20px
    box-sizing border-box
    height 100px
    width 100%
    z-index 5
    position relative
    top -25px
    background $color-background
    border-top-left-radius 0px
    border-top-right-radius 0px
    overflow hidden
    position fixed 
    top 80px
    &>div
      text-align center
      line-height 100px
      &:nth-child(2)
        text-align left 
        font-size $font-size-large-x
        width 62vw
        border-bottom 1px solid #e2e3e4
      &:last-child
        color #fff
        background $color-highlight-background
        height 100%
        line-height 100px
        width 235px
        font-size $font-size-large
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
  .middle-fixed
    position fixed!important
    top 80px!important
  .fixedHeader
    img 
      filter: blur(0vw)!important
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
      img
        width 110%
        min-height 100%
        position absolute
        left -5%
        top 0
        z-index -1
        filter: blur(6vw)
        transition all .3s
      &>i 
        float left 
        font-size 35px
        transform rotate(180deg)
        position relative
        left 20px
  .list-bigBox
    height 100%
    overflow hidden 
  .List-top
    height 42vh
    position relative
    overflow hidden
    padding 0 30px
    box-sizing border-box
    &>img
      position absolute 
      width 110%
      min-height 100%
      left -5%
      z-index -1
      filter: blur(6vw)
    .List-data
      display flex
      justify-content flex-start
      align-items center
      margin-top 14.3333vw
      .data-left
        width 280px
        height 280px
        // overflow hidden
        position relative
        &>img 
          width 280px
          height 280px
          // filter:blur(0)!important
        .data-left-rightData
          position absolute 
          right 20px
          top 10px
          color #fff
        i
          font-size 26px
      .data-right
        color #fff
        margin-left 20px
        &>p
          font-size 32px
          line-height 40px
          letter-spacing 5px 
        div
          margin-top 40px
          font-size $font-size-medium
          color #cecdda
          &>img 
            width 60px
            height 60px
            border-radius 50%
            top 16px
            right 4px
            position relative
          i
            font-size 16px
            margin-left 15px
    .ListButton
      display flex
      justify-content 
      align-items center
      margin-top 40px
      .tab
        width 25%
        text-align center
        &>i 
          font-size 40px
          color #fff
        &>p
          margin-top 15px
          font-size $font-size-medium
          color #cecdda
  .List-middle
    display flex
    justify-content flex-start
    align-items stretch
    padding 0 0 0 20px
    box-sizing border-box
    height 100px
    z-index 5
    position relative
    top -25px
    background $color-background
    border-top-left-radius 30px
    border-top-right-radius 30px
    overflow hidden
    &>div
      text-align center
      line-height 100px
      &:nth-child(2)
        text-align left 
        font-size $font-size-large-x
        width 62vw
        border-bottom 1px solid #e2e3e4
      &:last-child
        color #fff
        background $color-highlight-background
        height 100%
        line-height 100px
        width 235px
        font-size $font-size-large
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
    .List-items
      height 110px
      line-height 110px
      display flex
      align-items stretch
      justify-content flex-start
      .items-left
        margin 0 35px
        text-align center
        font-size $font-size-big-x
        color #7d7e7f
      .items-right
        text-align left
        border-bottom 1px solid #e2e3e4
        line-height 0
        &>p:first-child
          font-size $font-size-big-x
          margin-top 25px
        &>p:last-child
          font-size $font-size-medium-x
          color #7d7e7f
          margin-top 50px


</style>
