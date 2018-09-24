<template>
    <div class="index">
      <scroll ref="scroll" class="recommend-content" :data="NewList" v-if="NewList.length > 1">
        <div>
          <div class="banner-wrapper">
            <slider>
              <div v-for="(item,index) in bannerList" :key="index">
                <div class="banner-background"></div>
                <a :href="'https://music.163.com'+item.url">
                  <img class="banner-content" :src="item.picUrl" >
                </a>
              </div>
            </slider>
          </div>
          <!-- <div class="loading" v-else>
            <loading></loading>
          </div> -->
          <div class="button-wrapper">
            <div class="button">
              <div class="icon">
                <i class="icon-tubiaozhizuomoban tuijian"></i>
                <p>{{ _getDate }}</p>
              </div>
              <p>每日推荐</p>
            </div>
            <div class="button" @click="toAllList">
              <div class="icon">
                <i class="icon-gedan"></i>
              </div>
              <p>歌单</p>
            </div>
            <div class="button">
              <div class="icon">
                <i class="icon-paixingbang"></i>
              </div>
              <p>排行榜</p>
            </div>
          </div>
          <div class="Recomlist-wrapper list-wrapper">
            <div class="List-top" @click="toAllList">
              <span>推荐歌单</span>
              <i class="icon-you"></i>
            </div>
            <div class="List-bottom">
              <div class="List-items" v-for="item in RecommendList" :key="item.id" @click="TomusicList(item.id)">
                <!-- <router-link tag="div" class="router-tab" to="/musicList"></router-link> -->
                <img v-lazy="item.picUrl">
                <p>{{ item.name }}</p>
                <div class="items-playCount">
                  <i class="icon-erji"></i>
                  {{ item.playCount }}
                </div>
              </div>
            </div>
          </div>
          <div class="New-wrapper list-wrapper" style="padding-bottom: 16vw;">
            <div class="List-top">
              <span>最新音乐</span>
              <i class="icon-you"></i>
            </div>
            <div class="List-bottom">
              <div class="List-items" v-for="(item,index) in NewList" :key="item.id" @click="ToAlbum(index)">
                <img v-lazy="item.picUrl">
                <p class="text-overflow">{{ item.name }}</p>
                <p class="text-overflow">{{ item.author }}</p>
              </div>
            </div>
          </div>
        </div>
      </scroll>
      <download v-else-if="NewList.length < 1"></download>
      <router-view></router-view>
    </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import loading from 'base/loading/loading'
import download from 'base/download/download'
import {Home_getBanner,Home_getPersonalizedList,Home_getNewList} from 'api/index'
import {CODE} from 'common/js/config'
import {setListenNum} from 'common/js/number'
import {mapMutations,mapActions} from 'vuex'

export default {
    data() {
      return {
        bannerList:[],
        RecommendList: [],
        NewList:[]
      }
    },
    created(){
      this._getBanner()
    },
    methods:{
      TomusicList(id) {
        // this.setListType('sonlist')
        this.setListId(id)
        this.setNowShow('playlist')
        this.setShowPlayList(true)
      },
      ToAlbum(index){
        this.selectPlay({
          list:this.NewList,
          index:index
        })
      },
      toAllList(){
        this.$router.push('/alllist')
      },
      _getBanner() {
        Home_getBanner().then(res => {
          if (res.data.code === CODE) {
            this.bannerList = res.data.banners
          }
          this._getRecommendList()
        })
      },
      _getRecommendList() {
        Home_getPersonalizedList().then(res => {
          // console.log(res)
          if (res.data.code === CODE) {
            const resData = res.data.result.slice(0,6)
            const Json = []
            for (let x in resData) {
              let _Array = {}
              _Array.id = resData[x].id
              _Array.picUrl = resData[x].picUrl
              _Array.name = resData[x].name
              _Array.playCount = setListenNum(resData[x].playCount)
              Json.push(_Array)
            }
            this.RecommendList = Json
          }
          this._getNewList()
        })
      },
      _getNewList() {
        Home_getNewList().then(res => {
          if (res.data.code === CODE) {
            const resData = res.data.result.slice(0,6)
            const Json = []
            for (let x in resData) {
              let _Array = {}
              _Array.id = resData[x].id
              _Array.picUrl = resData[x].song.album.picUrl
              _Array.name = resData[x].name
              _Array.author = resData[x].song.artists[0].name
              Json.push(_Array)
            }
            this.NewList = Json
          }
        })
      },
      ...mapMutations({
        setListId:'SET_LIST_ID',
        setNowShow:'SET_NOWSHOW',
        setShowPlayList:'SET_SHOWPLAYLIST',
        // setListType:'SET_LIST_TYPE'
      }),
      ...mapActions([
        'selectPlay'
      ])
    },
    computed:{
      _getDate(){
        return new Date().getDate()
      }
    },
    components: {
      scroll,
      Slider,
      loading,
      download
    }

}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  .index
    width 100%
    position fixed!important
    top 152px!important
    bottom 0
    background #fbfcfd
  .recommend-content
    height 100%
    overflow hidden
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
      z-index -1
  .button-wrapper
    border-bottom 1px solid #e2e3e4
    display flex
    justify-content center
    align-items center
    padding 35px 0 35px
    .button
      margin 0 50px
      .icon
        height 102px
        width 102px
        text-align center
        line-height 102px
        position relative
        background #ec483c
        border-radius 50%
        .tuijian
          font-size 9.5vw
        i 
          font-size 6vw
          color #fff
        p
          position absolute 
          left 0
          right 0
          top 1.2vw
          font-size $font-size-medium
          color #fff
          margin 0!important
      p
        color $color-h3
        font-size $font-size-large
        text-align center
        margin-top 15px
  .loading
    width 100%
    height 300px
    background $color-highlight-background
    line-height 310px
  .list-wrapper
    margin-top 40px
    padding 0 2.5%
    box-sizing border-box
    .List-top
      margin-bottom 25px
      span
        font-size $font-size-large-x
        font-weight 500
      i
        font-size 28px
        position relative
        top -.5px
    .List-bottom
      display flex
      justify-content flex-start
      align-items center
      flex-wrap wrap
      .List-items
        width 230px
        height 310px
        position relative
        margin-bottom 40px
        &:nth-child(2),&:nth-child(5)
          margin 0 10px 40px
        img 
          width 100%
          height 230px
          border-radius 7px
        p
          font-size $font-size-medium
          color $color-h1
          line-height 33px
          margin-top 15px
          &:last-child
            font-size $font-size-small-s
            color $color-h2
            margin-top 0
        .items-playCount
          position absolute 
          right 10px
          top 8px
          color #fff
          font-size $font-size-small
          i
            font-size 22px
        
  .router-tab
    position absolute 
    height 100%
    width 100%
</style>
