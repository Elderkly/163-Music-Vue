<template>
    <div>
        <button @click="logins">123213</button>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed:{
        ...mapGetters([
            'login'
        ])
    },
    methods:{
        logins(){
            // 查看登录状态
            console.log(this.login)
        }
    }
}
</script>

<style lang="sass">

</style>

