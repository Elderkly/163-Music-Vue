<template>
  <div class="playlist">
    <transition name="mask">
      <div class="mask" v-if="showList && playList.length>0" @click="setShowList"></div>
    </transition>
    <transition name="list">
      <div class="list-box" v-if="showList && playList.length>0">
        <div class="list-header">
          <i :class="typeClass" @click="setType"></i>
          <span>{{ typeText }}({{ playList.length }})</span>
          <i class="icon-lajitong" @click="deleteAll"></i>
        </div>
        <scroll class="scroll">
          <div>
            <div class="items" v-for="(item,index) in playList" :key="item.id" @click="_selectPlay(index)">
              <i class="icon-laba" v-show="playItem.id === item.id"></i>
              <span :style="playItem.id === item.id ? 'color: #dd4238' : ''">{{ item.name }} - <span class="author">{{ item.author }}</span></span>
              <i class="icon-jia" @click.stop="deleteItems(item)"></i>
            </div>
          </div>
        </scroll>
        <div class="hidden" @click="setShowList">关闭</div>
      </div>
    </transition>
  </div>
</template>

<script>
import bus from 'common/vue/bus'
import scroll from 'base/scroll/scroll'
import { shuffle } from 'common/js/util'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      showList: false
    }
  },
  mounted() {
    const _this = this
    bus.$on('showList', () => {
      _this.setShowList()
    })
  },
  computed: {
    typeClass() {
      let className
      switch (this.playType) {
        case 'list':
          className = 'icon-liebiaoxunhuan'
          break
        case 'single':
          className = 'icon-danquxunhuan'
          break
        case 'random':
          className = 'icon-suijibofang'
          break
      }
      return className
    },
    typeText() {
      return this.playType === 'list' ? '列表循环' : (this.playType === 'single' ? '单曲循环' : '随机播放')
    },
    ...mapGetters([
      'playList',
      'playItem',
      'playType',
      'sequenceList'
    ])
  },
  methods: {
    setType() {
      let list = null
      switch (this.playType) {
        case 'list':
          this.setplayType('single')
          list = this.sequenceList
          break
        case 'single':
          list = shuffle(this.sequenceList)
          this.setplayType('random')
          break
        case 'random':
          this.setplayType('list')
          list = this.sequenceList
          break
      }
      this.setNewPlayIndex(list)
      this.setplayList(list)
    },
    setNewPlayIndex(list) {
      const index = list.findIndex(item => {
        return item.id === this.playItem.id
      })
      this.setplayIndex(index)
    },
    setShowList() {
      this.showList = !this.showList
    },
    deleteAll() {
      this.setplayList([])
      this.setShowList()
    },
    deleteItems(item) {
      this.deleteItem({
        item: item
      })
    },
    _selectPlay(index) {
      this.selectPlay({
        list: this.playList,
        index: index
      })
      this.setShowList()
    },
    ...mapActions([
      'selectPlay',
      'deleteItem'
    ]),
    ...mapMutations({
      setplayType: 'SET_PLAY_TYPE',
      setplayIndex: 'SET_PLAY_INDEX',
      setplayList: 'SET_PLAY_LIST'
    })
  },
  components: {
    scroll
  }
}
</script>


<style lang="stylus" scoped>
  .mask
    position fixed
    height 100%
    width 100%
    background rgba(0,0,0,.3)
    top 0
    z-index 10000
  .list-box
    background rgba(255,255,255,.9)
    z-index 10000
    position fixed
    border-top-left-radius 25px
    border-top-right-radius 25px
    width 100%
    bottom 0
    .list-header
      padding 27px 18px
      display flex
      align-items center
      border-bottom 1px solid rgba(185,182,182,.5)
      &>i:first-child
        font-size 40px
        margin-right 15px
      i 
        color #999999
        font-size 32px
      span 
        font-size 28px
        flex 1
        text-align left
    .scroll
      height 700px
      overflow hidden
      .items
        height 91px
        padding-right 18px
        display flex
        align-items center
        overflow hidden
        width calc(100% - 18px)
        margin-left 18px
        border-bottom 1px solid rgba(185,182,182,.25)
        .icon-laba
          color #dd4238
          font-size 36px
          margin-right 15px
        .icon-jia
          color #999999
          transform rotate(135deg)
          font-size 34px
          margin-right 18px
        &>span 
          flex 1
          font-size 28px
          .author
              font-size 20px
        &:last-child
          border none
    .hidden
      height 110px
      line-height 110px
      font-size 32px
      text-align center
      border-top 1px solid rgba(185,182,182,.5)

  .mask-enter-active,.mask-leave-active
    transition all .3s
  .mask-enter,.mask-leave-to
    opacity 0
  .list-enter-active,.list-leave-active
    transition all .3s
  .list-enter,.list-leave-to
    transform: translateY(100%)
</style>
