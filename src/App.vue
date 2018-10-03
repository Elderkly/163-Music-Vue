<template>
  <div id="app">
    <div class="App-fixed">
      <mheader></mheader>
      <tab :list="['发现','我的','账号']"></tab>
    </div>
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

    <playlist></playlist>
  </div>
</template>

<script>
import mheader from 'base/mheader/mheader'
import tab from 'cpnts/tab/tab'
import player from 'cpnts/player/player'
import musiclist from 'cpnts/musicList/musicList'
import author from 'cpnts/author/author'
import miniplayer from 'cpnts/miniplayer/miniplayer'
import playlist from 'cpnts/playlist/playlist'
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
    miniplayer,
    playlist
  }
}
</script>

<style lang="stylus" scoped>
  #app
    overflow hidden
  .App-fixed
    position fixed
    width 100%
    top 0 
    z-index 100
</style>
