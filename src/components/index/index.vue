<template>
    <div class="index">
      <scroll ref="scroll" :data="bannerList">
        <div>
          <div class="banner-wrapper" v-if="bannerList.length > 1">
            <slider>
              <div v-for="(item,index) in bannerList" :key="index">
                <div class="banner-background"></div>
                <a :href="'music.163.com'+item.url">
                  <img class="banner-content" :src="item.picUrl" >
                </a>
              </div>
            </slider>
          </div>
          <div class="list-wrapper">

          </div>
        </div>
      </scroll>
    </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {Home_getBanner} from 'api/index'
import {CODE} from 'common/js/config'

export default {
    data() {
      return {
        bannerList:[]
      }
    },
    computed: {
    },
    created(){
      setTimeout(() => {
        this._getBanner()
      })
    },
    methods:{
      _getBanner() {
        Home_getBanner().then(res => {
          if (res.data.code === CODE) {
            // console.log(res.data.banners)
            this.bannerList = res.data.banners
          }
        })
      }
    },
    components: {
      scroll,
      Slider
    }

}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .index
    width 100%
  .banner-wrapper
    width 100%
    a
      display block
      width 100%
    .banner-background
      height 8vw
      position absolute 
      bottom 0
      left 0
      width 100%
      background #fff
</style>
