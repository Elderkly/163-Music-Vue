<template>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/index">
        <div class="absolute" @click="bindtab(0)"></div>
        <span class="tab-link" >发现</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/my-music">
        <div class="absolute" @click="bindtab(1)"></div>
        <span class="tab-link">我的</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/user">
        <div class="absolute" @click="bindtab(2)"></div>
        <span class="tab-link">账号</span>
      </router-link>
      <div class="link" ref="link"></div>
    </div>
</template>

<script>
export default {
  mounted(){
    let num = this.$router.currentRoute.path === '/index' ? 0 : (this.$router.currentRoute.path === '/my-music' ? 1 : 2)
    this.bindtab(num)
  },
  methods:{
    bindtab(num) {
      this.$refs.link.style.left = `${13.5 + num * 33.35}%`
    }
  },
  watch:{
    $route(to, from) {
      if (from.path === '/login') this.bindtab(0)
    }
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
        left 13.5%
        transition left .3s
</style>

