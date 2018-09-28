<template>
  <transition name="mini">
      <div class="min-player" v-show="!showPlayer && musicImg !== null" @click="showPlay">
        <div class="banner">
          <img :src="musicImg">
        </div>
        <div class="text">
          <h2 class="text-overflow">{{ playItem.name }}</h2>
          <p class="text-overflow">{{ playItem.author }}</p>
        </div>
        <div class="control">
          <i :class="buttonClass" @click.stop="play"></i>
        </div>
        <div class="min-list">
          <i class="icon-gedan"></i>
        </div>
      </div>
    </transition>
</template>

<script>
import bus from 'common/vue/bus'
import {mapGetters,mapMutations} from 'vuex'

export default {
  data(){
    return {
      musicImg:null
    }
  },
  computed:{
    ...mapGetters([
      'showPlayer',
      'playItem',
      'playIng'
    ]),
    buttonClass(){
      return this.playIng ? 'icon-zanting' : 'icon-bofang1'
    },
  },
  created() {
    const _this = this
    bus.$on('passImg',function(img) {
      _this.musicImg = img
      // console.log(_this.musicImg)
    })
  },
  methods:{
    showPlay(){
      this.setPlayShow(true)
      this.setNowShow('player')
    },
    play() {
      // if (this.playing){

      // }
      // this.playIng ? this.$refs.audio.pause() :this.$refs.audio.play()
      bus.$emit('setplaying')
      // this.setplayIng(!this.playIng)    
    },
    ...mapMutations({
      setNowShow:'SET_NOWSHOW',
      setPlayShow:'SET_SHOWPLAYER'
    })
  }
}
</script>


<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .min-player
    position fixed
    width 100%
    height 120px
    display flex
    bottom 0px
    z-index 9999
    left 0
    align-items saturate
    background $color-background
    box-shadow: 0 0 50px rgba(0,0,0,0.2)
    padding 0 30px
    box-sizing border-box
    background #fff
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
  .mini-enter-active,.mini-leave-active
    transition all .3s
  .mini-enter,.mini-leave-to
    transform translateY(120px)
</style>

