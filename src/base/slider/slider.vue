<template>
  <div ref='bannerContent' class="bannerContent">
    <div class="bannerBox" ref='bannerBox'>
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for="(item,index) in dots" :key="item" :class="currentIndex === index ? 'dot dot-in' : 'dot'"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'


export default {
  data() {
    return {
      dots:[],
      bannerLength:0,
      currentIndex:0
    }
  },
  props: {
    loop:{  //循环轮播
      type:Boolean,
      default:true
    },
    autoPlay:{  //自动轮播
      type:Boolean,
      default:true
    },
    interval:{  //轮播间隔
      type:Number,
      default:4000
      }
  },
  mounted() {
    setTimeout(() => {
      this._setBannerWidth()
      this._initScroll()
      this._initDots()
      this._play()
    },20)
  },
  methods: {
    _initDots(){
      this.dots = new Array(this.bannerLength)
    },
    _setBannerWidth() {
      this.bannerLength = this.$refs.bannerBox.children.length
      let [sumWidth,boxWidth] = [0,this.$refs.bannerContent.clientWidth];
      [].forEach.call(this.$refs.bannerBox.children,e => {
        addClass(e,'slider-item')
        e.style.width = boxWidth + 'px'
        sumWidth += boxWidth
      })
      if (this.loop) {
        sumWidth += 2 * boxWidth
      }
      this.$refs.bannerBox.style.width = sumWidth + 'px'
    },
    _initScroll() {
      this.slider = new BScroll(this.$refs.bannerContent, {
          scrollX:true, //允许左右滚动
          scrollY:false,  //禁止上下滚动
          momentum:false, //惯性
          snap:true,
          snapLoop:this.loop, //循环
          snapThreshold: 0.3,
          snaSpeed:400 //速度
          // click: false
      })
      //滚动结束执行
      this.slider.on('scrollEnd',() => {
        let pageIndex = this.slider.getCurrentPage().pageX
        // console.log(pageIndex)
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentIndex = pageIndex

        if (this.autoPlay) {
          //手指放上去的时候 先把原来的定时器清空
          clearTimeout(this.time)
          this._play()
        }
      })
    },
    _play(){
      let _pageIndex = this.currentIndex + 1
      if (this.loop) {
        _pageIndex += 1
      }
      this.time = setTimeout(() => {
        // 调用自动轮播函数  跳转到pageIndex页  0代表横向滚动 400毫秒执行一次
        this.slider.goToPage(_pageIndex,0,400)
      },this.interval)
    }
  }
}
</script>

<style lang="stylus">
  .bannerContent
    background: #dd4238;
    padding-top 10px
    position relative
  .slider-item
    float left 
    position relative
    img 
      display block
      width 95%
      margin-left 2.5%
      z-index 5
      position relative
      border-radius 10px
  .bannerBox
    overflow hidden
    white-space: nowrap
  .dots
    position absolute 
    left 0
    right 0
    bottom 10px
    text-align center
    .dot
      display inline-block
      width 15px
      height 15px
      background rgba(255,255,255,.5)
      border-radius 50%
      margin 0 8px
    .dot-in
      background rgba(255,0,0,.8)
      width 30px
      border-radius 15px
</style>


