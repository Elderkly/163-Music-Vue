<template>
  <div id="app">
    <mheader></mheader>
    <tab :list="['发现','我的','账号']"></tab>
      <!-- <keep-alive> -->
        <!-- <router-view/> -->
        <!-- <index></index>
        <my-music></my-music>
        <user></user> -->
      <!-- </keep-alive> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
    <author></author>
    <musiclist></musiclist>
    <miniplayer></miniplayer>
  </div>
</template>

<script>
import mheader from 'base/mheader/mheader'
import tab from 'cpnts/tab/tab'
import player from 'cpnts/player/player'
import musiclist from 'cpnts/musicList/musicList'
import author from 'cpnts/author/author'
import miniplayer from 'cpnts/miniplayer/miniplayer'
// import {mapGetters,mapMutations} from 'vuex'
import { getCookie } from 'common/js/cookie'

export default {
  computed: {

  },
  created() {
    if (getCookie('userId') === null) {
      this.$router.push('/login')
    }
  },
  methods: {

  },
  components: {
    tab,
    player,
    musiclist,
    author,
    mheader,
    miniplayer
  }
}
</script>

<style lang="stylus" scoped>
  #app
    overflow hidden
</style>
