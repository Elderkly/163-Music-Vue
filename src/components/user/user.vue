<template>
    <div>
        <div @click="logout">退出登录</div>
    </div>
</template>

<script>
import {setCookie} from 'common/js/cookie'
import {mapMutations} from 'vuex'
export default {
    methods:{
      logout() {
        setCookie('userId',null,-1)
        this.setLogin(false)
        // $store.commit('SET_LOGIN',123)
        this.$router.push('/login')
      },
      ...mapMutations({
        setLogin:'SET_LOGIN'
      })
    }

}
</script>

<style lang="stylus">

</style>
