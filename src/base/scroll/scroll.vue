<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BSroll from 'better-scroll'

export default {
  props:{
    click: {  //  点击事件
      type:Boolean,
      default: true
    },
    probeType: {
      type:Number,
      default:1
    },
    data: { //  传入data数据
      type:Array,
      default:null
    },
    listenScroll: { //  是否监听scroll
      type: Boolean,
      default:false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    },20)
  },
  methods:{
    _initScroll() {
      if (!this.$refs.scroll) {
        return
      }
      this.scroll = new BSroll(this.$refs.scroll,{
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll){
        const _this = this
        this.scroll.on('scroll',pos => {
          _this.$emit('scroll',pos)
        })
      }
    },
    enable(){
        this.scroll && this.scroll.enable()
      },
    disable(){
      this.scroll && this.scroll.disable()
    },
    refresh(){
      //刷新scroll 重新计算高度
      //只有调用refresh才会滚动
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data(){
      setTimeout(() => {
        this.refresh()
      },20)
    }
  }
}
</script>

<style lang="stylus">

</style>


