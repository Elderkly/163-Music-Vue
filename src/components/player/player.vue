<template>
  <div class="player" v-show="playList.length > 0">
    <transition name="player">
      <div class="son-web" v-show="fullScreen">
        <div class="bg" :style="'background:url('+bgImg+')'"></div>
        <div class="background"></div>
        <div class="header">
          <i class="icon-you" @click="back"></i>
          <div>
            <p>{{ playItem.name }}</p>
            <p>{{ playItem.author }}</p>
          </div>
        </div>
        <div class="wrap">
          <div class="turn">
            <img src="./disc_light.png">
            <img src="./disc_light-bg.png" :class="turnClassSlow">
            <img :src="musicImg" :class="turnClass">
          </div>
          <img :class="needleClass" src="./needle-ip6.png">
          <img src="./needle.png">
        </div>
        <div class="tab">
          <div>
            <i class="icon-xihuan" style="font-size:6.5vw"></i>
          </div>
          <div>
            <i class="icon-xiazai"></i>
          </div>
          <div>
            <i class="icon-pinglun"></i>
          </div>
          <div>
            <i class="icon-more-copy"></i>
          </div>
        </div>
        <div class="play-data">
          <span class="play-time time-left">{{ format(Time) }}</span>
          <progress-bar
                @touchmove="touchMove"
                @touchend="touchEnd"
                :percentageNum="percentageNum"
          ></progress-bar>
          <span class="play-time time-right">{{ format(sumTime) }}</span>
        </div>
        <div class="button">
          <i :class="typeClass" @click="setType"></i>
          <i class="icon-xiayishouxianxing"></i>
          <i :class="buttonClass" @click="play"></i>
          <i class="icon-xiayishouxianxing"></i>
          <i class="icon-icon-test"></i>
        </div>
        <audio ref="audio" :src="musicSrc" 
              @canplay="ready" 
              @error="error"
              @timeupdate="updateTime"
              @ended="ended"
        ></audio>
      </div>
    </transition>
    <transition name="mini">
      <div class="min-player" v-show="!fullScreen">
        <div class="banner">
          <img :src="musicImg">
        </div>
        <div class="text">
          <h2 class="text-overflow">{{ playItem.name }}</h2>
          <p class="text-overflow">{{ playItem.author }}</p>
        </div>
        <div class="control">
          <i class="icon-bofang1"></i>
        </div>
        <div class="min-list">
          <i class="icon-gedan"></i>
        </div>
      </div>
    </transition>
  </div>
  
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import {Music_GetSrc,Music_GetImg} from 'api/music'
import {CODE} from 'common/js/config'
import progressBar from 'base/progress-bar/progress-bar'


export default {
  data() {
    return {
      musicSrc:null,
      musicImg:null,
      bgImg:null,
      Time:0,
      sumTime:0,
      percentageNum:0
      // MoveSwitch:false
    }
  },
  computed: {
    turnClass(){
      return this.playIng ? 'play' : 'play pause'
    },
    typeClass() {
      let className
      switch (this.playType){
        case 'list':
          className = 'icon-liebiaoxunhuan'
          break
        case 'single':
          className = 'icon-danquxunhuan'
          break
        case 'random':
          className = 'icon-suijibofang'
          break
      }
      return className
    },
    buttonClass(){
      return this.playIng ? 'icon-zanting' : 'icon-bofang1'
    },
    needleClass(){
      return this.playIng ? 'needle needle-play' : 'needle'
    },
    turnClassSlow(){
      return this.playIng ? 'play-slow' : 'play-slow pause'
    },
    ...mapGetters([
      'fullScreen',
      'playIng',
      'playType',
      'playList',
      'playItem'
    ])
  },
  methods: {
    ready(e) {
      this.audioReady = true
      this.sumTime = this.$refs.audio.duration
    },
    error() {
      this.audioReady = true
      console.log('error')
    },
    updateTime(e) {
      if (!this.MoveSwitch) {
        this.Time = e.target.currentTime
        this.percentageNum = this.Time / this.sumTime
      }
    },
    ended() {
      this.setplayIng(false)   
    },
    touchMove(percentage) {
      this.MoveSwitch = true
      this.Time = this.sumTime * percentage
    },
    touchEnd(percentage) {
      this.MoveSwitch = false
      this.$refs.audio.currentTime = this.sumTime * percentage
      if (!this.playIng) this.play()
    },
    format(time) {
      /*
        3 | 4 =  7 
        转换为二进制之后011|100  相加得到111=7
      */
      time = time | 0
      const min = time / 60 | 0
      const second = time % 60
      return `${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
    },
    setType() {
      switch(this.playType) {
        case 'list':
          this.setplayType('single')
          break
        case 'single':
          this.setplayType('random')
          break
        case 'random':
          this.setplayType('list')
          break
      }
    },
    play() {
      this.playIng ? this.$refs.audio.pause() :this.$refs.audio.play()
      this.setplayIng(!this.playIng)    
    },
    back() {
      this.setFullScreen(false)
    },
    _getMusicSrc(id) {
      Music_GetSrc(id).then(res => {
        if (res.data.code === CODE) {
          this.musicSrc = res.data.data[0].url
          // 在下次 DOM 更新循环结束之后执行延迟回调  在下一次DOM更新循环结束后播放最新获取的歌曲
          this.$nextTick(()=>{
            this.$refs.audio.play()
          })
          this.setplayIng(true)
        }
      })
    },
    _getMusicImg(id) {
      Music_GetImg(id).then(res => {
        if (res.data.code === CODE) {
          this.musicImg = res.data.songs[0].al.picUrl
          setTimeout(() => {
            this.bgImg = this.musicImg
          },900)
        }
      })
    },
    ...mapMutations({
      setFullScreen:'SET_FULLSCREEN',
      setplayIng:'SET_PLAY_ING',
      setplayType:'SET_PLAY_TYPE'
    })

  },
  watch: {
    playItem(newList,oldList){
      if (newList.id === oldList.id) {
        return
      }
      // console.log(newList,oldList)
      this.$nextTick(()=>{
        this._getMusicSrc(newList.id)
        this._getMusicImg(newList.id)
      })
    }
  },
  components:{
    progressBar
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .bg
    position fixed
    width 120%
    height 120%
    z-index -2
    left -10%
    top -10%
    filter blur(6vw)
    transition all .6s
    background-size 100% 100%!important
  .background
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    z-index -1
    background rgba(0,0,0,.5)
  .header
    height 80px
    text-align center
    line-height 80px
    color #fff
    i 
      float left 
      font-size 35px
      transform rotate(180deg)
      position relative
      left 20px
      z-index 1
    p
      color #fff
      line-height 30px
      position relative
    & p:first-child
      top 10px
      font-size $font-size-large-x
    & p:last-child
      top 15px
      font-size $font-size-medium-x
  .wrap
    border-top 1px solid #51626f
    position relative
    overflow hidden
    .turn
      margin-top 157px
      text-align center
      position relative
      &>img 
        &.play
          animation rotate 20s linear infinite
        &.play-slow
          animation rotate 15s linear infinite
        &.pause
          animation-play-state paused
        &:first-child
          width 612px
          height 612px
        &:nth-child(2)
          width 612px
          height 612px
          position absolute 
          top 0
          left 0
          right 0
          margin auto
          transform rotate(90deg)
        &:last-child
          width 395px
          height 395px
          border-radius 50%
          position absolute 
          top 110px
          left 0
          right 0
          margin auto
          transform rotate(90deg)
     
    .needle
      position absolute 
      top 0
      left 23vw
      right 0
      margin auto
      height 293px
      width 193px
      transform: rotate(-24deg)
      transform-origin: -2vw 0vw
      transition all .6s
    .needle-play
      transform: rotate(2deg)
    &>img:last-child
      width 55px
      height 27.5px
      position absolute 
      top -1px
      left 5vw
      right 0
      margin auto
  .tab
    margin-top 125px
    display flex
    justify-content center
    align-items stretch 
    div
      margin 0 55px
      position relative
      i
        color #d6dde2
        font-size 40px
  .play-data
    display flex
    align-items center
    width 90%
    margin 9.333vw auto 0
    .play-time
      font-size $font-size-medium
    .time-left
      color #d6dde2
    .time-right
      color #869397
      margin-left 1.5vw
  .button
    display flex
    align-items center
    width 90%
    margin 7vw auto 0
    i 
      color #d6dde2
      font-size 60px
      margin 0 5.9vw
      &:first-child
        margin-left 0
      &:nth-child(2)
        transform rotate(180deg)
      &:nth-child(3)
        font-size 80px
      // &:nth-child(4)
      &:last-child
        margin-right 0
        font-size 75px
  .min-player
    position fixed
    width 100%
    height 120px
    display flex
    bottom 0px
    z-index 300
    left 0
    align-items saturate
    background $color-background
    box-shadow: 0 0 50px rgba(0,0,0,0.2)
    padding 0 30px
    box-sizing border-box
    &>div
    i
      font-size 60px
      color #333
    .banner
      line-height 22vw
      margin-right 20px
      img
        width 80px
        height 80px
    .text
      line-height 1
      width 400px
      margin-right 36px
      h2
        font-size $font-size-large-x
        color #333
        margin-top 22px
      p
        margin-top 10px
        color #999999
        font-size $font-size-medium-x
    .control
      line-height 120px
      margin-right 30px
    .min-list
      line-height 120px
      color #333
  
  @keyframes rotate 
    to
      transform rotate(0deg)
    from
      transform rotate(-360deg)
  .mini-enter-active,.mini-leave-active
    transition all .3s
  .mini-enter,.mini-leave-to
    transform translateY(100%)
  .player-enter-active,.player-leave-active
    transition all .3s
  .player-enter,.player-leave-to
    transform translateX(100%)
</style>


