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
          <sonlist :creatorlist="creatorlist" 
                   :collectList="collectList" 
                   :pageY="pageY" 
                   @setFixedTransFrom="setFixedTransFrom" 
                   @setFixedText="setFixedText"
                   @setfixedSwitch="setfixedSwitch"
          ></sonlist>
        </div>
      </scroll>
      <div class="fixed-header" v-if="fixedSwitch" ref="fixedDiv">
        <!-- <i class="icon-you"></i> -->
        <span ref="fixedText">歌单({{ creatorlist.length }})</span>
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
import sonlist from 'base/sonlist/sonlist'

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
      User_getUserList(getCookie('userId')).then(res => {
        if (res.data.code === CODE){
          _this._disposeData(res.data.playlist)
        }
      })
    },
    setFixedTransFrom(num){
      try {
        this.$refs.fixedDiv.style.transform = `translate3d(0px, ${num}px, 0px)`
      }catch(e) {
        // console.log(this.$refs.fixedDiv)
      }
    },
    setFixedText(text){
      try{
        this.$refs.fixedText.innerHTML = text
      }catch(e) {
        // console.log(this.$refs.fixedText)
      }
    },
    setfixedSwitch(_switch){
      this.fixedSwitch = _switch
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
    // TomusicList(id) {
    //   this.setListId(id)
    //   this.$router.push('/musicList')
    // },
    ...mapMutations({
      setListId:'SET_LIST_ID'
    })
  },
  components:{
    scroll,
    sonlist
  },
  watch:{
    userId(newId){
      // console.log(newId)
      this._getList()
    },
    '$route'(to){
      to.path == '/my-music' ? (this._getList(),this.fixedSwitch = false) : ''
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
  .fixed-header
    height 60px
    background #eeeff0
    padding-left 20px
    line-height 60px
    position absolute
    top 0 
    width 100%
    .icon-you 
      font-size 25px
      transform rotate(90deg)
      float left
      margin-right 20px
    span 
      font-size $font-size-medium-x
      color #676768
</style>

