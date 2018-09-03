<template>
  <div ref='bannerContent' class="bannerContent">
    <div class="bannerBox" ref='bannerBox'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'


export default {
  data() {
    return {
      bannerLength:0
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
      // this._play()
    },20)
  },
  methods: {
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
          snaSpeed:400, //速度
          click: false
      })
      //滚动结束执行
        // this.slider.on('scrollEnd',()=>{
        //     //获取到滚动到第几张
        //     let pageIndex = this.slider.getCurrentPage().pageX
        //     //如果设置了循环滚动需要-1
        //     if(this.loop){
        //       pageIndex -= 1
        //     }
        //     // console.log(pageIndex)
        //     // 赋值
        //     this.currentPageIndex = pageIndex

        //     //如果设置了自动轮播
        //     if(this.autoPlay){
        //       //手指放上去的时候 先把原来的定时器清空
        //       clearTimeout(this.timer)
        //       //重新开始400毫秒轮播一次
        //       this._play()
        //     }
        // })
    }
  }
}
</script>

<style lang="stylus">
  .bannerContent
    background: #dd4238;
    padding-top 10px
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
</style>


