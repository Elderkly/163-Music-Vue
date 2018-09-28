<template>
  <div class="minloading">
    <img src="./download.gif">
    <p>正在加载</p>
  </div>
</template>

<style lang="stylus" scoped>
  .minloading
    text-align center
    width 100%
    line-height 50px
    z-index 999
    position fixed
    top 80px
    width 100%
    height 100%
    background #fff
    padding-top 200px
    img 
      heigh 50px
      width 50px
    p
      color #999
      font-size 26px
</style>

