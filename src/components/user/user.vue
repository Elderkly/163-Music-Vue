<template>
  <div>
    <scroll class="father-web">
      <div class="user">
        <div class="user-top" @click="toAuthor">
          <div class="icon"><img v-lazy="userData.profile.avatarUrl"></div>
          <div class="user-name">
            <h2>{{ userData.profile.nickname }}</h2>
            <div class="level">
              <i class="icon-Lv"></i>
              .{{ userData.level }}
            </div>
          </div>
        </div>
        <div class="user-bottom">
          <div>
            <p class="tags-title">动态</p>
            <p class="tags-num">{{ userData.profile.eventCount }}</p>
          </div>
          <div>
            <p class="tags-title">关注</p>
            <p class="tags-num">{{ userData.profile.follows }}</p>
          </div>
          <div>
            <p class="tags-title">粉丝</p>
            <p class="tags-num">{{ userData.profile.followeds }}</p>
          </div>
        </div>
        <div style="padding-bottom:16vw">
          <div class="user-data-base">
            <div class="unfinished">
              <i class="icon-xinfeng first-icon"></i>
              <div>
                <span>我的消息</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
          </div>
          <div class="user-data-base">
            <div class="unfinished">
              <i class="icon-huiyuanzhongxin first-icon" style="font-size:6vw"></i>
              <div>
                <span>会员中心</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-gouwuche first-icon"></i>
              <div>
                <span>商城</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-shoubing first-icon"></i>
              <div>
                <span>游戏推荐Bate</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-xiangzi first-icon"></i>
              <div>
                <span>在线听歌免流量</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
          </div>
          <div class="user-data-base">
            <div class="unfinished">
              <i class="icon-shezhi first-icon"></i>
              <div>
                <span>设置</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-scan first-icon"></i>
              <div>
                <span>扫一扫</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-yifu first-icon"></i>
              <div>
                <span>个性换肤</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-dengpao first-icon"></i>
              <div>
                <span>夜间模式</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-clock first-icon"></i>
              <div>
                <span>定时关闭</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-naozhong first-icon"></i>
              <div>
                <span>音乐闹钟</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-che first-icon"></i>
              <div>
                <span>驾驶模式</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-552cc40952152 first-icon"></i>
              <div>
                <span>优惠券</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
          </div>
          <div class="user-data-base">
            <div class="unfinished">
              <i class="icon-fenxiang first-icon"></i>
              <div>
                <span>分享网易云音乐</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
            <div class="unfinished">
              <i class="icon-guanyu first-icon"></i>
              <div>
                <span>关于</span>
                <i class="icon-you last-icon"></i>
              </div>
            </div>
          </div>
          <div class="user-data-base logout" @click="logout">
            退出登录
          </div>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { setCookie, getCookie } from 'common/js/cookie'
import { mapMutations } from 'vuex'
import { User_getUserData } from 'api/user'
import scroll from 'base/scroll/scroll'
import { CODE } from 'common/js/config'

export default {
  data() {
    return {
      userData: {
        profile: {
          userId: null,
          avatarUrl: null,
          followeds: 0,
          follows: 0,
          eventCount: 0,
          nickname: null
        },
        level: 0
      }
    }
  },
  mounted() {
    User_getUserData(getCookie('userId')).then(res => {
      if (res.data.code === CODE) {
        this.userData = res.data
      }
    })
  },
  methods: {
    toAuthor() {
      this.setAuthorId(this.userData.profile.userId)
      this.setShowAuthor(true)
      this.setNowShow('author')
    },
    logout() {
      setCookie('userId', null, -1)
      this.setLogin(false)
      // $store.commit('SET_LOGIN',123)
      this.$router.push('/login')
    },
    ...mapMutations({
      setLogin: 'SET_LOGIN',
      setShowAuthor: 'SET_SHOWAUTHOR',
      setAuthorId: 'SET_AUTHOR_ID',
      setNowShow: 'SET_NOWSHOW'
    })
  },
  components: {
    scroll
  }

}
</script>

<style lang="stylus" scoped>
  .father-web
    background #eeeff0
  .user-top
    height 180px
    padding 30px
    box-sizing border-box
    display flex
    justify-content flex-start
    border-bottom 1px solid #e2e3e4
    background #fbfcfd
    .icon
      height 120px
      width 120px
      border-radius 50%
      overflow hidden
      img 
        width 100%
    .user-name
      margin-left 20px
      h2 
        font-size 28px
        margin-top 30px
      .level
        margin-top 10px
        color #979798
        font-size 20px
        padding 5px 8px
        border-radius 30px
        border 2px solid #bfbfbf
        font-style italic 
        font-weight 600
  .user-bottom
    height 105px
    padding 20px 0
    box-sizing border-box
    display flex
    justify-content flex-start
    align-items center
    background #fbfcfd
    &>div
      width calc(100% / 3)
      text-align center
      border-right 1px solid #e2e3e4
      .tags-title
        color #999
        font-size 26px
        margin-bottom 8px
      .tags-num
        color #000
        font-weight 600
        font-size 32px
      &:last-child
        border none
  .user-data-base
    margin 20px 0
    background #fbfcfd
    &>div
      padding-left 25px
      height 90px
      line-height 90px
      box-sizing border-box
      display flex
      font-size 26px
      div
        border-bottom 1px solid #e2e3e4
        width 100%
      span 
        font-size 32px
      .first-icon
        color #8f8e94
        margin-right 25px
        font-size 33px
      .last-icon
        color #e1e2e3
        float right 
        margin-right 12px
        font-size 32px
      &:last-child
        div
          border none
  .logout
    background #fbfcfd
    width 100%
    height 80px
    text-align center
    line-height 80px
    color #dd4238
  .unfinished
    // color #ccc
</style>

