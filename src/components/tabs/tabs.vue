<template>
  <div class="tab-wrap">
    <div class="tab">
      <div class="tab-item" v-for="(item,index) in list" :key="item">
        <div class="absolute" :data-index="index" @click="handleClick"></div>
        <span class="tab-link" >{{list[index]}}</span>
      </div>
      <div class="link" ref="link" :style='`transform:translatex(${sliderX}px) scale(${sliderScale});width:${sliderW}px;`'></div>
    </div>
    <div class="list-content" :style='`transform:translatex(${contentX}px);width:${list.length * containerW}px`' @touchstart='handleTouchStart' @touchmove='handleTouchMove' @touchend='handleTouchEnd' @touchcancel='handleTouchCancel'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
//  最小拖动距离
const EFFECT_DISTANCE = 30
//  定义动画时常
const END_TIME = 200
const SCALE = 0.3

//  起始位置
var startX = 0
var startY = 0
//  Move时记录上一帧的值
var moveX = 0
var moveY = 0
//  每一祯的偏移值
var moveOffsetX = 0
var moveOffsetY = 0
//  X总偏移值
var totalOffsetX = 0
var isStarted = false
//  Move时的值
var clientX = 0
var clientY = 0
//  动画开关
var rafReqId = null

var isEndAnimating = false

export default {
  name: 'Vue-Tabs',
  props: {
    list: { //  tab数量
      type: Array,
      required: true
    },
    sliderW: { //  白条宽度
      type: Number,
      default: 30
    },
    callback: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      containerW: window.screen.availWidth < 300 ? 360 : window.screen.availWidth,
      cur: 0,
      sliderCls: '',
      animateTime: 0,
      transition: '',
      sliderX: 0,
      contentX: 0,
      sliderScale: 1
    }
  },
  computed: {
    tabItemW() { //  每个tab的宽度
      return this.containerW / this.list.length
    },
    wRate() {
      return 1 / this.list.length
    },
    sliderInitX() { //  每个标签下标白线的位置
      return (this.tabItemW - this.sliderW) / 2
    },
    halfContentW() {
      return this.containerW / 2
    }
  },
  methods: {
    doAnimationFrame(interval, fn, completeFn) {
      //  更为流畅的动画
      var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame
      //  取消动画
      var cancelRaf = window.cancelAnimationFrame
      if (rafReqId) {
        cancelRaf(rafReqId)
      }
      var start = window.performance.now() // 获取当前页面打开了多长时间 返回一个时间戳,以毫秒为单位,精确到千分之一毫秒.
      var offset = 0

      var step = function(timestamp) {
        //  timestamp 函数触发时间
        //  获取动画进行了多长时间
        offset = timestamp - start
        // console.log(offset)
        //  如果动画时常小于规定时常则继续动画
        if (offset <= interval) {
          fn(offset, interval)
          rafReqId = raf(step)
        } else { //  否则停止
          fn(interval, interval)
          completeFn()
          rafReqId = null
        }
      }
      rafReqId = raf(step)
    },
    handleClick(e) {
      var index = parseInt(e.target.getAttribute('data-index'))
      if (isNaN(index) || index === this.cur) {
        return
      }
      // var dif = index - this.cur
      // var conDif = this.containerW * dif
      var conDif = this.containerW * index - Math.abs(this.contentX)
      // var tabDif = this.tabItemW * dif
      var tabDif = this.tabItemW * index - Math.abs(this.sliderX)
      var sliderX = this.sliderX
      var contentX = this.contentX
      this.cur = index
      this.callback(index)
      isEndAnimating = true
      this.doAnimationFrame(this.animateTime || END_TIME, (offset, interval) => {
        var r = offset / interval
        var rDif = r * conDif
        this.setContentX(contentX - rDif)
        this.setSliderX(sliderX + r * tabDif + this.sliderInitX)
        this.doSliderScale(rDif % this.containerW)
      }, function() {
        isEndAnimating = false
      })
    },
    setSliderScale(scale) {
      this.sliderScale = scale
    },
    setSliderX(moveOffsetX) {
      this.sliderX = moveOffsetX
    },
    setContentX(moveOffsetX) {
      this.contentX = moveOffsetX
    },
    reset() {
      isStarted = false
      moveOffsetX = 0
      moveOffsetY = 0
      totalOffsetX = 0
    },
    addEndAnimation(contentMoveOffsetX) {
      var sliderX = this.sliderX
      var contentX = this.contentX
      this.doAnimationFrame(this.animateTime || END_TIME, (offset, interval) => {
        var r = offset / interval
        var contentF = contentX + r * contentMoveOffsetX
        this.setContentX(contentF)
        this.setSliderX(sliderX - r * (contentMoveOffsetX * this.wRate))
        this.doSliderScale(contentF % this.containerW)
      }, function() {
        isEndAnimating = false
      })
    },
    doSliderScale(contentOffset) { // Move时改变白条大小
      contentOffset = Math.abs(contentOffset) //  取移动距离的绝对值
      var scale = 1
      if (this.halfContentW > contentOffset) { //  如果移动距离小于屏幕一半
        scale = 1 + contentOffset / this.halfContentW * SCALE
      } else {
        scale = (1 + SCALE) - (contentOffset - this.halfContentW) / this.halfContentW * SCALE
      }
      //  存储数值
      this.setSliderScale(scale)
    },
    doEndAnimate(offset) {
      if (offset === 0) {
        return
      }
      isEndAnimating = true
      if (Math.abs(offset) > EFFECT_DISTANCE) { // 如果偏移量大于规定的最小偏移值则进行移动
        if (offset > 0) { // 右移
          this.addEndAnimation(this.containerW - offset)
          this.cur--
        } else { // 左移
          this.addEndAnimation(-this.containerW - offset)
          this.cur++
        }
        this.callback(this.cur)
      } else { // 回滚
        this.addEndAnimation(-offset)
      }
    },
    doEnd() {
      this.doEndAnimate(totalOffsetX)
    },
    handleTouchStart(event) {
      isStarted = true
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    },
    handleTouchMove(event) {
      if (!isStarted || isEndAnimating) {
        return
      }
      //  判断是否是第一次移动
      var isFirst = (moveOffsetX === 0 && moveOffsetY === 0)
      //  当前手指位置
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
      //  move时每一祯偏移值 手指刚按下时只有startX   move开始移动后计算偏移就要减去move时上一帧的所在位置 这个时候就不能计算startX了
      //  moveOffsetX动作越快值越大
      moveOffsetX = clientX - (moveX || startX)
      moveOffsetY = clientY - (moveY || startY)
      //  存储上一帧的位置
      moveX = clientX
      moveY = clientY
      if (isFirst) { // 第一次move,仅做方向判断，不移动
        if (Math.abs(moveOffsetX) < Math.abs(moveOffsetY)) { // 上下优先
          //  初始化偏移值为0
          this.reset()
          return
        }
      } else {
        if ((this.cur === 0 && moveOffsetX > 0) || (this.cur === this.list.length - 1 && moveOffsetX < 0)) {
          return
        }
        //  计算总偏移值
        totalOffsetX += moveOffsetX
        //  大容器偏移位置
        this.setContentX(this.contentX + moveOffsetX)
        //  白条偏移位置
        this.setSliderX(this.sliderX - moveOffsetX * this.wRate)
        //  白条大小
        this.doSliderScale(totalOffsetX)
      }
      event.preventDefault()
      event.stopPropagation()
    },
    handleTouchEnd() {
      if (!isStarted) {
        return
      }
      this.doEnd()
      this.reset()
    },
    handleTouchCancel() {
      if (!isStarted) {
        return
      }
      this.doEnd()
      this.reset()
    }
  },
  mounted() {
    this.setSliderX(this.sliderInitX)
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .tab
    display: flex
    height: 70px
    line-height: 70px
    font-size: $font-size-large
    background $color-highlight-background
    position relative
    top -1px
    .tab-item
      flex: 1
      text-align: center
      position relative
      .absolute
        height 100%
        width 100%
        position absolute
      .tab-link
        padding-bottom: 10px
        color: $color-white
      &.router-link-active
        .tab-link
          color: $color-white
          font-weight 600
    .link
        background: $color-white
        height 8px
        width 50px
        position absolute
        border-radius 10px;
        bottom 2px
        // left 13.5%
        transition left .3s
  .list-content
    overflow hidden
    top: -1px;
    position: relative;
    &>div
      width calc(100% / 3)
      display inline-block
      float left
</style>

