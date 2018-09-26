<template>
  <transition name="login">
    <div id="login">
      <div class="logoIcon"><i class="icon-wangyiyun"></i></div>
      <div class="text">网易云音乐</div>
      <div class="input">
        <div :class="focus === 'number' ? 'focus-input-text input-text' : tel === null ? 'input-text' : 'focus-input-text input-text'">手机号</div>
        <input type="number" @focus="_focus($event)" @blur='_blur($event)' ref='tel'>
        <div>
          <hr class="hrBorder">
          <hr :class="focus === 'number' ? 'focus-hrShow hrShow' :'hrShow'">
        </div>
      </div>
      <div class="input">
        <div :class="focus === 'password' ? 'focus-input-text input-text' : password === null ? 'input-text' : 'focus-input-text input-text'">密码</div>
        <input type="password" @focus="_focus($event)" @blur='_blur($event)' @input='input($event)' ref='password'>
        <div>
          <hr class="hrBorder">
          <hr :class="focus === 'password' ? 'focus-hrShow hrShow' :'hrShow'">
        </div>
      </div>
      <button :class="loginClass" @click='login'>
        登录
      </button>
      <loading v-if="loginSwitch"></loading>
    </div>
  </transition>
</template>

<script>
import {login} from 'api/login'
import {setCookie} from 'common/js/cookie'
import {mapMutations,mapGetters} from 'vuex'
import loading from 'base/loading/loading'

export default {
  data(){
    return {
      focus:false,
      tel:null,
      password:null,
      loginSwitch:false
    }
  },
  computed:{
    loginClass(){
      return this.tel !== null && this.password !== null ? 'button' : 'button falseLogin'
    },
    ...mapGetters([
      'userId'
    ])
  },
  components: {
    loading
  },
  methods:{
    _focus(e){
      this.focus = e.target.type
    },
    _blur(e){
      e.target.value !== '' ? 
      e.target.type === 'number' ? 
      this.tel = e.target.value : 
      this.password = e.target.value : 
      e.target.type === 'number' ? 
      this.tel = null : 
      this.password = null
        
      this.focus = false
    },
    input(e){
      e.target.value !== '' ? this.password = e.target.value :  this.password = null
    },
    login(){
      if (this.tel !== null && this.password !== null) {
        this.loginSwitch = true
        login(this.tel,this.password).then(res => {
          this.loginSwitch = false
          if (res.data.code === 200){
            this.setUsreId(res.data.account.id)
            setCookie('userId',res.data.account.id,7)
            this.$router.push('/index')
          }else if (res.data.code === 415) {
            alert('登录过于频繁 请稍候再试')
          }else {
            alert('用户名或密码错误')
          }
        })
      }
    },
    ...mapMutations({
      setUsreId:'SET_USER_ID'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
  #login
    position fixed!important
    top 0!important
    bottom 0
    left 0
    right 0
    z-index 999999
    background $color-background
    .logoIcon
      margin 120px auto 50px
      text-align center
      i 
        font-size 180px
        color $color-highlight-background
    .text
      font-size 50px
      text-align center
      margin 0 auto 100px
    .input 
      width 80%
      position relative
      margin  0 auto 100px
      font-size $font-size-large-x
      height 50px
      .input-text
        position absolute 
        left 0
        top -30px
        transform translate3d(0,30px,0) scale(1)
        transition transform .45s cubic-bezier(.23,1,.32,1)
        color $color-h2
      input 
        height 100%
        width 100%
      hr
        position absolute 
        bottom -10px
        margin 0
        width 100%
        border none 
        height 1px
        background $color-h2
      .hrShow
        height 5px
        margin 0
        left 0
        righ 0
        z-index 5
        margin-top -2px
        transform: scaleX(0)
        background $color-highlight-background
        transition: transform .45s cubic-bezier(.23,1,.32,1);
    .focus-input-text
      color #333!important
      transform translate3d(0,0,0) scale(0.75)!important
      transform-origin left top
    .focus-hrShow
      transform: scaleX(1)!important;
    
    .button
      width 80%
      height 80px
      background $color-highlight-background
      border-radius 10vw
      margin 100px auto 
      color $color-white
      text-align center
      line-height 80px
      display block
      border none
      font-size $font-size-large-x
    .falseLogin
      background #c8382f
      color rgba(256,256,256,.4)

  .login-enter-active,.login-leave-active
    transition:all .3s
  .login-enter,.login-leave-to
    transform translate3d(100%,0,0)
</style>

