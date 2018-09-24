<template>
  <transition name="list">
    <div :class="NowShow === 'playlist' ? 'nowShow son-web' : 'son-web playlist'" v-show="showPlayList">
      <div :class="fixed ? 'fixedHeader header' : 'header'">
        <img :src="listData !== null ? listData.coverImgUrl : ''">
        <div class="background header-background"></div>
        <i class="icon-you" @click="ToLast"></i>
        {{ title }}
      </div>
      <Scroll :data="listData" v-if="listData!== null"  class="list-bigBox" @scroll="scroll" :scrollTop="scrollTop" :probe-type="probeType" :listen-scroll="listenScroll">
        <div>
          <div class="List-top">
            <img :src="listData !== null ? listData.coverImgUrl : ''">
            <div class="background list-background"></div>
            <div class="List-data">
              <div class="data-left">
                <img :src="listData !== null ? listData.coverImgUrl : ''">
                <div class="data-left-rightData">
                  <i class="icon-erji"></i>
                  {{ _getNumber(listData.playCount) }}
                </div>
              </div>
              <div class="data-right">
                <p>{{ listData.name }}</p>
                <div ref='author' @click="toAuthor(listData.creator.userId)">
                  <img :src="listData.creator.avatarUrl">
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
          <div class="List-middle" ref="middle" @click="_randomPlay">
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
          <div class="List-bottom" :style="!fullScreen ? 'padding-bottom:16vw' : ''">
            <div class="List-items" v-for="(item,index) in listData.tracks" :key="item.id" @click="toPlayer(index)">
              <div :class="index > 98 ? 'items-left items-left-100' : 'items-left'" v-if="playItem.id !== item.id">
                {{ index+1 }}
              </div>
              <div class="items-left playing" v-else>
                <i class="icon-laba"></i>
              </div>
              <div class="items-right">
                <p :class="playItem.id === item.id ? 'playing' : ''">{{ item.name }}</p>
                <p >{{ item.ar[0].name }}</p>
              </div>
            </div>
          </div>
        </div> 
      </Scroll>
      <download v-else></download>

      <div class="fixed-middle" v-if="fixed && playList.length > 5"  @click="_randomPlay">
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
import {Music_GetListData,Music_GetAlbumData} from 'api/music'
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {CODE} from 'common/js/config'
import Scroll from 'base/scroll/scroll'
import download from 'base/download/download'
import {setListenNum} from 'common/js/number.js'

export default {
  computed: {
    ...mapGetters([
      'listId',
      'playItem',
      'fullScreen',
      'NowShow',
      'showPlayList',
      // 'showPlayListType'
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
    toAuthor(id){
      // this.$router.push({path:'/author' + id})
      this.setShowAuthor(false)
      setTimeout(() => {
        this.setAuthorId(id)
        this.setShowAuthor(true)
        this.setNowShow('author')
      },300)
    },
    _randomPlay() {
      this.randomPlay({
        list:this.playList
      })
    },
    scroll(pos){
      this.scrollY = pos.y
      // console.log(this.scrollY)
    },
    toPlayer(index){
      this.selectPlay({
        list:this.playList,
        index:index
      })
    },
    _getNumber(number) {
      return setListenNum(number)
    },
    ToLast() {
      this.setNowShow('')
      this.setShowPlayList(false)
    },
    _getList() {
      // console.log(this.showPlayListType)
      if (this.listId === null) {
        // this.$router.push('/index')
        this.setNowShow('')
        this.setShowPlayList(false)
        return
      }
      this.listData = null
      // if (this.showPlayListType === 'sonlist') {
        Music_GetListData(this.listId).then(res => {
          if (res.data.code === CODE) {
            this.listData = res.data.playlist
            this._musicList(res.data.playlist.tracks)
          }
        })
      // }else if (this.showPlayListType === 'album'){
      //   Music_GetAlbumData(this.listId).then(res => {
      //     if (res.data.code === CODE) {
      //       this.listData = res.data.playlist
      //       this._musicList(res.data.playlist.tracks)
      //     }
      //     console.log(res)
      //   })
      // }
    },
    _musicList(list){
      let _list = []
      for (let x in list) {
        const obj = {}
        obj.id = list[x].id
        obj.name = list[x].name
        obj.author = list[x].ar[0].name
        _list.push(obj)
      }
      // console.log(_list)
      // this.setPlayList(_list)
      this.playList = _list
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ]),
    ...mapMutations({
      setNowShow:'SET_NOWSHOW',
      setShowPlayList:'SET_SHOWPLAYLIST',
      setShowAuthor:'SET_SHOWAUTHOR',
      setAuthorId:'SET_AUTHOR_ID'
    })
  },
  components: {
    Scroll,
    download
  },
  watch: {
    listId(newID){
      // console.log(newID)
      this._getList()
    },
    scrollY(newY){
      const scrollY = Math.abs(newY)
      const authorHeight = this.$refs.author.offsetTop
      const middleHeight = this.$refs.middle.offsetTop - this.$refs.middle.clientHeight + 10
      if (scrollY > authorHeight) {
        this.title = this.listData.name
      }else {
        this.title = '歌单'
      }

      if (-newY > middleHeight){
        this.fixed = true
      }else {
        this.fixed = false
      }
    }
    // '$route' (to, from) {
    //   //  由于用了vue-router导致created只执行第一次 所以只能监控router进行刷新数据
    //   if (to.path === '/musicList' && from.path !== '/player') {
    //     this.scrollTop = true
    //     this._getList()
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .list-enter-active,.list-leave-active
    transition all .3s
  .list-enter,.list-leave-to
    transform translateX(100%)
  .background
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    z-index -2
    background rgba(0,0,0,.2)
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
        width 120%
        min-height 100%
        position absolute
        left -10%
        top 0
        z-index -2
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
    height 74vw
    position relative
    overflow hidden
    padding 0 30px
    box-sizing border-box
    &>img
      position absolute 
      width 120%
      min-height 100%
      left -10%
      z-index -2
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
          font-size $font-size-small
        i
          font-size 22px
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
        border-bottom 1px solid #e2e3e4!important
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
    position relative
    top -25px
    padding-bottom 120px
    .List-items
      height 110px
      line-height 110px
      display flex
      align-items stretch
      justify-content flex-start
      .items-left
        text-align center
        width 14.2vw
        font-size $font-size-big-x
        color #7d7e7f
      .items-left-100
        font-size $font-size-large
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
    color $color-highlight-background
    i 
      font-size 40px
      color $color-highlight-background

</style>
