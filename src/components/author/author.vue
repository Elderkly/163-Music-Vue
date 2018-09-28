<template>
  <transition name="slideLeft">
    <div :class="NowShow === 'author' ? 'nowShow son-web author' : 'son-web author'" v-show="showAuthor">
      <div class="header" ref="header">
        <div class="mask"></div>
        <img :src="user.bgImg" ref="headerBg">
        <i class="icon-you" @click="ToLast"></i>
        <p ref="hiddenUserName">{{ user.name }}</p>
      </div>
      <scroll class="scroll-box" :data="collectList" @scroll="_scroll" :listenScroll="listenScroll" :probeType="probeType">
        <div>
          <div class="userDataBox">
            <div class="userData" >
              <div class="mask"></div>
              <img :src="user.bgImg"  ref="userData">
              <div class="icon">
                <img :src="user.headerImg" >
              </div>
              <div class="compile" v-if="userId == user.authorId">编 辑</div>
              <div class="user-name" ref="username">{{ user.name }}</div>
              <div class="followeds">
                <span>关注 {{ user.follows }} </span>
                <span> | </span>
                <span>粉丝 {{ user.followeds }} </span>
              </div>
              <div class="label">
                <div class="sex" :style="user.gender === 1 ? 'background:rgba(111,204,255,.5)' : 'background:rgba(231,159,215,.5)'">
                  <i :class="user.gender === 1 ? 'icon-nan' : 'icon-nv'" :style="user.gender === 1 ? 'color:#6fccff' : 'color:rgb(231,159,215)'"></i>
                </div>
                <div class="level">
                  <i class="icon-Lv"></i>
                  .{{ user.level }}
                </div>
                <!-- <div class="from">
                  深圳
                </div> -->
              </div>
            </div>
          </div>
          
          <div style="background:#fbfcfd">
            <div class="min-title"  ref="fixedmiddle">
              音乐
              <span>{{ creatorlist.length + collectList.length }}</span>
              <!-- <hr> -->
            </div>
            <sonlist :creatorlist="creatorlist" 
                    :collectList="collectList" 
                    :pageY="pageY" 
                    @setFixedTransFrom="setFixedTransFrom" 
                    @setFixedText="setFixedText"
                    @setfixedSwitch="setfixedSwitch"
                    :errorHeight=44
                    class="sonListBox"
            ></sonlist>
          </div>

        </div>
      </scroll>
      <div class="fixed-header" v-if="fixedSwitch" ref="fixedDiv">
        <!-- <i class="icon-you"></i> -->
        <span ref="fixedText">歌单({{ creatorlist.length }})</span>
      </div>
      <div class="fixed-middle" v-if="fixedmiddleSwitch">
        音乐
        <span>36</span>
      </div>
    </div>
    <!-- <download v-else></download> -->
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import scroll from 'base/scroll/scroll'
import sonlist from 'base/sonlist/sonlist'
import { User_getUserList, User_getUserData } from 'api/user'
import { CODE } from 'common/js/config'
import { getCookie } from 'common/js/cookie'
import download from 'base/download/download'

export default {
  data() {
    return {
      fixedSwitch: false,
      creatorlist: [],
      collectList: [],
      pageY: 0,
      fixedmiddleSwitch: false,
      user: {
        bgImg: null,
        headerImg: null,
        name: null,
        followeds: 0,
        follows: 0,
        level: 0,
        gender: 0,
        authorId: null
      },
      userId: null
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  computed: {
    ...mapGetters([
      'showAuthor',
      'authorId',
      'NowShow'
    ])
  },
  methods: {
    ToLast() {
      this.setShowAuthor(false)
      this.setNowShow('')
    },
    _getUserList(id) {
      User_getUserList(id).then(res => {
        if (res.data.code === CODE) {
          this._disposeData(res.data.playlist)
        }
      })
    },
    _getUserData(id) {
      this.userId = getCookie('userId')
      User_getUserData(id).then(res => {
        if (res.data.code === CODE) {
          this.user = {
            bgImg: res.data.profile.backgroundUrl,
            headerImg: res.data.profile.avatarUrl,
            name: res.data.profile.nickname,
            followeds: res.data.profile.followeds,
            follows: res.data.profile.follows,
            level: res.data.level,
            gender: res.data.profile.gender,
            authorId: res.data.profile.userId
          }
        }
      })
    },
    _disposeData(list) {
      this.creatorlist = []
      this.collectList = []
      for (const x in list) {
        list[x].userId === parseInt(this.authorId)
          ? this.creatorlist.push(list[x])
          : this.collectList.push(list[x])
      }
    },
    setFixedTransFrom(num) {
      try {
        // console.log(num)
        this.$refs.fixedDiv.style.transform = `translate3d(0px, ${num + this.$refs.header.clientHeight}px, 0px)`
      } catch (e) {
        // console.log(this.$refs.fixedDiv)
      }
    },
    setFixedText(text) {
      try {
        this.$refs.fixedText.innerHTML = text
      } catch (e) {
        // console.log(this.$refs.fixedText)
      }
    },
    setfixedSwitch(_switch) {
      this.fixedSwitch = _switch
    },
    _scroll(e) {
      this.pageY = e.y
    },
    ...mapMutations({
      setShowAuthor: 'SET_SHOWAUTHOR',
      setNowShow: 'SET_NOWSHOW'
    })
  },
  components: {
    scroll,
    sonlist,
    download
  },
  watch: {
    showAuthor(newSwitch) {
      if (newSwitch) {
        this.user = {
          bgImg: null,
          headerImg: null,
          name: null,
          followeds: 0,
          follows: 0,
          level: 0,
          gender: 0,
          authorId: null
        }
        this._getUserList(this.authorId)
        this._getUserData(this.authorId)
      }
    },
    pageY(newY) {
      const userName = this.$refs.username.offsetTop
      // const hiddenDom = this.$refs.hiddenUserName
      const result = Math.max(0, 1 - -newY / userName)
      this.$refs.hiddenUserName.style.transform = `translate3d(0px, ${result * 100}%, 0px)`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .mask
    width 100%
    height 100%
    position absolute 
    top 0
    left 0
    background rgba(0,0,0,.3)
    z-index -1
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
    img 
      width 120%
      min-height 100%
      position absolute
      left -10%
      top 0
      z-index -2
    i 
      float left 
      font-size 35px
      transform rotate(180deg)
      position relative
      left 20px
      z-index 10
    p
      transform translateY(100%)
  .userDataBox
    width 100%
    height 74vw
    overflow hidden
  .userData
    width 100%
    height 100%
    overflow hidden
    position relative
    padding-left 40px
    box-sizing border-box
    &>img 
      width 120%
      position absolute 
      left -10%
      z-index -2
    .icon
      margin-top 130px
      width 160px
      height 160px
      border-radius 50%
      overflow hidden
      img 
        width 100%
        min-height 100%
    .compile
      color #fff
      position absolute 
      right 20px
      top 145px
      width 155px
      height 65px
      background rgba(156,156,156,.5)
      border-radius 8px
      text-align center
      line-height 65px
      font-size 26px
      font-weight 300
    .user-name
      margin-top 30px
      color #fff
      font-size 32px
      font-weight 600
    .followeds
      margin-top 15px
      &>span 
        color #fff
        font-size 20px
    .label
      margin-top 15px
      &>div
        height 24px
        border-radius 30px
        background rgba(255,255,255,.5)
        padding 8px 15px
        width auto
        float left 
        min-width 50px
        text-align center
        font-size 18px
        color #fff
        margin-right 8px
        // line-height 40px
      .sex
        i
          font-weight 600
          font-size 24px
      .level
      .from
        // font-size 30px
  .min-title
    width 100%
    height 40px
    border-top-left-radius 20px
    border-top-right-radius 20px
    position relative
    top -40px
    background #fbfcfd
    text-align left 
    text-indent 28px
    line-height 80px
    font-size 34px
    color #dd4238
    font-weight 600
    span
      font-size 26px
      color #979798
    hr
      width 80px
      height 8px
      border-radius 30px
      background #dd4238
      position absolute 
      border none
      left 33px
      top 50px
  .fixed-header
    height 60px
    background #eeeff0
    padding-left 20px
    line-height 60px
    position absolute
    top 0 
    width 100%
    .icon-you 
      font-size 25px
      transform rotate(90deg)
      float left
      margin-right 20px
    span 
      font-size $font-size-medium-x
      color #676768
  .fixed-middle 
    width 100%
    height 80px
    border-top-left-radius 20px
    border-top-right-radius 20px
    position fixed
    top 80px
    background #fbfcfd
    text-align left 
    text-indent 28px
    line-height 80px
    font-size 34px
    color #dd4238
    font-weight 600
    span
      font-size 26px
      color #979798
  .sonListBox
    // position relative
    // top -40px
</style>
