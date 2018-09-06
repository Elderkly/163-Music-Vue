<template>
  <div class="loading">
    <img width="50" height="50" src="./loading.gif">
    <!-- <p class="desc">{{title}}</p> -->
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    // props: {
    //   title: {
    //     type: String,
    //     default: '正在载入...'
    //   }
    // }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width 240px
    height 240px
    position fixed
    line-height 43vw
    left calc(50% - 240px/2)
    top calc(50% - 300px/2)
    background rgba(0,0,0,.7)
    border-radius 30px
    text-align center
    z-index 999
    .desc
      margin-top 10px
      font-size: $font-size-large
      color: $color-background
</style>
