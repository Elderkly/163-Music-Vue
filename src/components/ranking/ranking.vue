<template>
  <transition name="slideLeft">
    <div class="ranking son-web">
      <div class="header" ref="header">
        <i class="icon-you" @click="ToLast"></i>
        <p>排行榜</p>
      </div>
      <scroll class="scroll">
        <div>
          <div class="list">
            <p>云音乐官方榜</p> 
            <div>
              <div class="items" @click="ToList(3)">
                <div><img src="./biaosheng.jpg"></div>
              </div>
              <div class="items" @click="ToList(0)">
                <div><img src="./xinge.jpg"></div>
              </div>
              <div class="items" @click="ToList(2)">
                <div><img src="./yuanchuang.jpg"></div>
              </div>
              <div class="items" @click="ToList(1)">
                <div><img src="./rege.jpg"></div>
              </div>
              <div class="items" @click="ToList(4)">
                <div><img src="./dianyin.png"></div>
              </div>
              <div class="items" @click="ToList(22)">
                <div><img src="./acg.jpg"></div>
              </div>
            </div>
          </div>
          <div class="list">
            <p>全球榜</p> 
            <div>
              <div class="items" @click="ToList(5)">
                <div><img src="./UKjpg.jpg"></div>
                <p>UK排行榜周榜</p>
              </div>
              <div class="items" @click="ToList(6)">
                <div><img src="./Billboard.jpg"></div>
                <p>美国Billboard周榜</p>
              </div>
              <div class="items" @click="ToList(7)">
                <div><img src="./ktv.jpg"></div>
                <p>Ktv嗨榜</p>
              </div>
              <div class="items" @click="ToList(8)">
                <div><img src="./itunes.jpg"></div>
                <p>iTunes榜</p>
              </div>
              <div class="items" @click="ToList(9)">
                <div><img src="./hit.jpg"></div>
                <p>Hit FM Top榜</p>
              </div>
              <div class="items" @click="ToList(10)">
                <div><img src="./ocicon.jpg"></div>
                <p>日本Oricon周榜</p>
              </div>
              <div class="items" @click="ToList(14)">
                <div><img src="./gangtai.jpg"></div>
                <p>中国Top排行榜(港台榜)</p>
              </div>
              <div class="items" @click="ToList(15)">
                <div><img src="./neidi.jpg"></div>
                <p>中国Top排行榜(内地榜)</p>
              </div>
              <div class="items" @click="ToList(16)">
                <div><img src="./longhu.jpg"></div>
                <p>香港电台中文歌曲龙虎榜</p>
              </div>
              <div class="items" @click="ToList(18)">
                <div><img src="./xiha.jpg"></div>
                <p>中国嘻哈榜</p>
              </div>
              <div class="items" @click="ToList(20)">
                <div><img src="./hitto.jpg"></div>
                <p>香港Hito排行榜</p>
              </div>
              <div class="items" @click="ToList(21)">
                <div><img src="./beatport.jpg"></div>
                <p>Beatport全球电子舞曲榜</p>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import scroll from 'base/scroll/scroll'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ToLast() {
      this.$router.back()
    },
    ToList(num) {
      this.setListId(num)
      this.setNowShow('playlist')
      this.setListType('ranking')
      this.setShowPlayList(true)
    },
    ...mapMutations({
      setListId: 'SET_LIST_ID',
      setNowShow: 'SET_NOWSHOW',
      setShowPlayList: 'SET_SHOWPLAYLIST',
      setListType: 'SET_LIST_TYPE'
    })
  },
  components: {
    scroll
  }
}
</script>

<style lang="stylus" scoped>
  .scroll
    width 100%
    height 100%
    position fixed
    top 0
  .header
    text-align center
    font-size 35px
    color #fff
    height 80px
    line-height 80px
    position fixed
    top 0 
    width 100%
    z-index 50
    overflow hidden
    background #dd4238
    i 
      float left 
      font-size 35px
      transform rotate(180deg)
      position relative
      left 20px
      z-index 10
  .list
    margin-top 80px
    text-align left 
    overflow hidden
    padding 0 15px
    &:last-child
      margin-top 20px
      padding 0 15px 16vw
      .items
        margin-bottom 30px
    &>p
      font-size 32px
      font-weight 600
      margin 20px 0
    &>div
      overflow hidden
    .items
      float left 
      width calc(100% / 3 - 7px)
      margin-right 10px
      margin-bottom 10px
      &>div
        border-radius 15px
        overflow hidden
      img
        width 100%
      &:nth-child(3n)
        margin-right 0
      p
        color #333
        font-size 26px
        margin-top 8px
</style>

