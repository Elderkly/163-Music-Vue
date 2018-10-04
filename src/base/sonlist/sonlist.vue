<template>
  <div>
    <div class="creatorlist list">
      <div class="header" ref="createorHeader">
        <!-- <i class="icon-you"></i> -->
        <span ref="createorHeaderText">歌单({{ creatorlist.length }})</span>
      </div>
      <div class="ul">
        <div class="list-items" v-for="(item,index) in creatorlist" :key="item.id" @click="TomusicList(item.id)">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" >
          </div>
          <div class="text">
            <h2>{{ item.name }}</h2>
            <p>{{ item.trackCount }}首</p>
          </div>
        </div>
      </div>
    </div>
    <div class="collectList list" :style="collectList.length < 1 ? 'opacity: 0' : ''">
      <div class="header" ref="collectHeader">
        <!-- <i class="icon-you"></i> -->
        <span ref="collectHeaderText">收藏的歌单({{ collectList.length }})</span>
      </div>
      <div class="ul">
        <div class="list-items" v-for="item in collectList" :key="item.id"  @click="TomusicList(item.id)">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" >
          </div>
          <div class="text">
            <h2>{{ item.name }}</h2>
            <p>{{ item.trackCount }}首</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    creatorlist: {
      type: Array
    },
    collectList: {
      type: Array
    },
    pageY: {
      type: Number
    },
    errorHeight: {
      type: Number,
      default: 0
    }
  },
  methods: {
    TomusicList(id) {
      this.setShowPlayList(false)
      setTimeout(() => {
        this.setListId(id)
        this.setNowShow('playlist')
        this.setShowPlayList(true)
        this.setListType('list')
      }, 300)
    },
    ...mapMutations({
      setListId: 'SET_LIST_ID',
      setNowShow: 'SET_NOWSHOW',
      setShowPlayList: 'SET_SHOWPLAYLIST',
      setListType: 'SET_LIST_TYPE'
    })
  },
  watch: {
    pageY(newY) {
      const pageY = -newY
      const createorHeader = this.$refs.createorHeader.offsetTop
      const collectHeader = this.$refs.collectHeader.offsetTop
      const collectClientHeight = collectHeader - this.$refs.collectHeader.clientHeight
      const offsetY = newY + collectClientHeight > -this.$refs.collectHeader.clientHeight ? newY + collectClientHeight : 0
      // console.log(pageY, createorHeader - this.errorHeight)
      if (pageY > createorHeader - this.errorHeight) {
        this.$emit('setfixedSwitch', true)
        // this.fixedSwitch = true
        if (pageY > collectClientHeight - this.errorHeight) {
          this.$emit('setFixedTransFrom', (offsetY - this.errorHeight) < -this.$refs.collectHeader.clientHeight ? 0 : (offsetY - this.errorHeight))
          // this.$refs.fixedDiv.style.transform = `translate3d(0px, ${offsetY}px, 0px)`
          if (pageY > collectHeader - this.errorHeight) {
            this.$emit('setFixedText', this.$refs.collectHeaderText.innerHTML)
            // this.$refs.fixedDiv.innerHTML = this.$refs.collectHeader.innerHTML
          } else {
            this.$emit('setFixedText', this.$refs.createorHeaderText.innerHTML)
            // this.$refs.fixedDiv.innerHTML = this.$refs.createorHeader.innerHTML
          }
        } else {
          this.$emit('setFixedTransFrom', 0)
          // this.$refs.fixedDiv.style.transform = `translate3d(0px, 0px, 0px)`
        }
      } else {
        this.$emit('setfixedSwitch', false)
        // this.fixedSwitch = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .list
    .header
      height 60px
      background #eeeff0
      padding-left 25px
      line-height 60px
      i 
        font-size 25px
        transform rotate(90deg)
        float left
        margin-right 20px
      span 
        font-size $font-size-medium-x
        color #676768
    .ul 
      .list-items
        height 115px
        display flex
        align-items stretch
        padding 4px 0 4px 20px
        box-sizing border-box
        &:last-child
          .text
            border-bottom none
      .icon
        overflow hidden
        border-radius 8px
        flex: 0 0 108px;
        width: 108px;
        img 
          width 100%
          min-height 100%
      .text
        margin-left: 20px;
        border-bottom 1px solid #e2e3e4
        width 100%
        display flex
        line-height 38px
        justify-content center
        flex-direction column
        h2
          font-size $font-size-large-x
        p
          font-size $font-size-medium
          color #999
  .collectList
    padding-bottom 120px
</style>

