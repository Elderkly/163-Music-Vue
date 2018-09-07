<template>
  <transition name="player">
    <div class="son-web" v-show="fullScreen">
      <div @click="back">返回</div>
    </div>
  </transition>

</template>

<script>
import {mapGetters,mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'playId'
    ])
  },
  created() {

  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    ...mapMutations({
      setFullScreen:'SET_FULLSCREEN'
    })

  },
  watch: {
    playId(newID){
      console.log(newID)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .player-enter-active,.player-leave-active
    transition all .3s
  .player-enter,.player-leave-to
    transform translateX(100%)
</style>


