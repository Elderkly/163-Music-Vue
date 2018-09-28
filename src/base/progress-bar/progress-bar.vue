<template>
  <div class="progress-bar">
    <div class="bg" ref="bg">
      <div class="progress" ref="progress"></div>
      <div class="button" ref="button" 
           @touchstart="touchstart"
           @touchmove="touchmove"
           @touchend="touchend"
      >
        <div class="button-bar"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    percentageNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // init:false
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    touchstart(e) {
      this.init = true
      this.touch.pageX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
      this.touch.maxWidth = this.$refs.bg.clientWidth
    },
    touchmove(e) {
      if (!this.init) return
      const moveX = e.touches[0].pageX - this.touch.pageX
      /*
        Math.min 限制移动最大值为100%
        Math.max 限制移动最小值为0%
        两者结合可限制移动范围在0% ~ 100%
      */
      this.percentage = Math.max(0, (Math.min(this.touch.maxWidth - 0.8, moveX + this.touch.left)) / (this.touch.maxWidth - 0.8))
      this._offset(this.percentage)
      this.$emit('touchmove', this.percentage)
    },
    touchend(e) {
      this.init = false
      this.$emit('touchend', this.percentage)
    },
    _offset(number) {
      const num = number * 100
      this.$refs.progress.style.width = `${num}%`
      this.$refs.button.style.marginLeft = `${num}%`
    }
  },
  watch: {
    percentageNum(newPercentageNum) {
      if (newPercentageNum >= 0 && !this.init) {
        this._offset(newPercentageNum)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .progress-bar
    height 35px
    flex 1
    .bg
      width 92%
      background #86999b
      position relative
      height 5px
      margin 0 auto
      top 16px
      .progress
        position absolute 
        background $color-highlight-background
        width 0%
        height 100%
      .button
        margin-left 0
        position absolute
        top -10px
        .button-bar
          height 6px
          width 6px
          background $color-highlight-background
          border 10px solid #ffffff
          border-radius 50%
</style>

