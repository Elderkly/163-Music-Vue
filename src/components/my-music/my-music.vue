<template>
    <div class="father-web">
      <div style="height:100%;overflow:hidden;position: relative;">
        <scroll class="scroll-box" :data="collectList" @scroll="_scroll" :listenScroll="listenScroll" :probeType="probeType">
        <div>
          <div class="top-list">
            <div class="top-list-item">
              <i class="icon-yinyue"></i>
              <div>
                <span>本地音乐</span>
                <span>25</span>
                <i class="icon-you"></i>
              </div>
            </div>
            <div class="top-list-item">
              <i class="icon-zuijinbofang"></i>
              <div>
                <span>最近播放</span>
                <span>80</span>
                <i class="icon-you"></i>
              </div>
            </div>
            <div class="top-list-item">
              <i class="icon-diantai"></i>
              <div>
                <span>我的电台</span>
                <span>102</span>
                <i class="icon-you"></i>
              </div>
            </div>
            <div class="top-list-item">
              <i class="icon-wodeshoucang"></i>
              <div>
                <span>我的收藏</span>
                <span>1</span>
                <i class="icon-you"></i>
              </div>
            </div>
          </div>
          <div class="creatorlist list">
            <div class="header" ref="createorHeader">
              <i class="icon-you"></i>
              <span>我创建的歌单({{ creatorlist.length }})</span>
            </div>
            <div class="ul">
              <div class="list-items" v-for="(item,index) in creatorlist" :key="item.id" @click="TomusicList(item.id)">
                <div class="icon">
                  <img v-lazy="item.coverImgUrl" >
                </div>
                <div class="text">
                  <h2>{{ index === 0 ? '我喜欢的音乐' : item.name }}</h2>
                  <p>{{ item.trackCount }}首</p>
                </div>
              </div>
            </div>
          </div>
          <div class="collectList list">
            <div class="header" ref="collectHeader">
              <i class="icon-you"></i>
              <span>我收藏的歌单({{ collectList.length }})</span>
            </div>
            <div class="ul">
              <div class="list-items" v-for="item in collectList" :key="item.id"  @click="TomusicList(item.id)">
                <div class="icon">
                  <img v-lazy="item.coverImgUrl" >
                </div>
                <div class="text">
                  <h2>{{ item.name }}</h2>
                  <p>{{ item.trackCount }}首</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <div class="fixed-header" v-show="fixedSwitch" ref="fixedDiv">
        <i class="icon-you"></i>
        <span ref="fixedText">我创建的歌单(4)</span>
      </div>
      </div>

    </div>
</template>

<script>
import {CODE} from 'common/js/config'
import {User_getUserList} from 'api/user'
import {getCookie} from 'common/js/cookie'
import scroll from 'base/scroll/scroll'
import {mapGetters,mapMutations} from 'vuex'

export default {
  data() {
    return {
      creatorlist:[], //  用户创建的歌单
      collectList:[],  //  用户收藏的歌单
      pageY:0,
      fixedSwitch:false,
      _userId:null
    }
  },
  created(){
     this.listenScroll = true
     this.probeType = 3
     this._userId = getCookie('userId')
     this._getList()
  },
  computed:{
    ...mapGetters([
      'fullScreen',
      'playList',
      'userId'
    ])
  },
  methods: {
    _scroll(e){
      this.pageY = e.y
    },
    _getList(){
      const _this = this
      this.creatorlist = []
      this.collectList = []
      User_getUserList().then(res => {
        if (res.data.code === CODE){
          _this._disposeData(res.data.playlist)
        }
      })
    },
    _disposeData(list){
      this._userId = getCookie('userId')
      // console.log(this._userId)
      for (let x in list) {
        list[x].userId == this._userId ? 
        this.creatorlist.push(list[x]) : 
        this.collectList.push(list[x])
      }
    },
    TomusicList(id) {
      this.setListId(id)
      this.$router.push('/musicList')
    },
    ...mapMutations({
      setListId:'SET_LIST_ID'
    })
  },
  components:{
    scroll
  },
  watch:{
    userId(newId){
      // console.log(newId)
      this._getList()
    },
    pageY(newY){
      const pageY = -newY
      const createorHeader = this.$refs.createorHeader.offsetTop
      const collectHeader = this.$refs.collectHeader.offsetTop
      const collectClientHeight = collectHeader - this.$refs.collectHeader.clientHeight
      const offsetY = newY + collectClientHeight > -this.$refs.collectHeader.clientHeight ? newY + collectClientHeight : 0
      if (pageY > createorHeader) {
        this.fixedSwitch = true
        if (pageY > collectClientHeight) {
          this.$refs.fixedDiv.style.transform = `translate3d(0px, ${offsetY}px, 0px)`
          if (pageY > collectHeader){
            this.$refs.fixedDiv.innerHTML = this.$refs.collectHeader.innerHTML
          }else {
            this.$refs.fixedDiv.innerHTML = this.$refs.createorHeader.innerHTML
          }
        }else {
          this.$refs.fixedDiv.style.transform = `translate3d(0px, 0px, 0px)`
        }
      }else {
        this.fixedSwitch = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .top-list
    .top-list-item
      height 110px
      width 100%
      display flex
      justify-content flex-start
      align-items stretch
      line-height 110px
      &>i
        width 135px
        font-size 50px
        color $color-highlight-background
        text-align center
      &>div
        border-bottom 1px solid #e2e3e4
        width 82%
        span 
          &:first-child
            font-size $font-size-large-x
            display inline-block 
            width 76%
          &:nth-child(2)
            display inline-block 
            width 60px
            text-align right
            font-size $font-size-medium-x
            color #999
            margin-right 20px
        i
          font-size 30px
          color #c2c2c2
          position relative
          top 2px
  .list
    .header
      height 60px
      background #eeeff0
      padding-left 20px
      line-height 60px
      i 
        font-size 25px
        transform rotate(90deg)
        float left
        margin-right 20px
      span 
        font-size $font-size-medium-x
        color #676768
    .ul 
      .list-items
        height 115px
        display flex
        align-items stretch
        padding 4px 0 4px 20px
        box-sizing border-box
        &:last-child
          .text
            border-bottom none
      .icon
        overflow hidden
        border-radius 8px
        flex: 0 0 108px;
        width: 108px;
        img 
          width 100%
          min-height 100%
      .text
        margin-left: 20px;
        border-bottom 1px solid #e2e3e4
        width 100%
        display flex
        line-height 38px
        justify-content center
        flex-direction column
        h2
          font-size $font-size-large-x
        p
          font-size $font-size-medium
          color #999
  .collectList
    padding-bottom 120px
  .fixed-header
    height 60px
    background #eeeff0
    padding-left 20px
    line-height 60px
    position absolute
    top 0 
    width 100%
    i 
      font-size 25px
      transform rotate(90deg)
      float left
      margin-right 20px
    span 
      font-size $font-size-medium-x
      color #676768
</style>

