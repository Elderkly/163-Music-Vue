<template>
  <div class="son-web">
    <div class="search">
      <div class="input">
        <div  :class="animate ? 'showinput' : ''">
          <i class="iconfont icon-fangdajing"></i> 
          <span v-show="input === ''">Jopurney 很好听哦</span>
          <form @submit="submit">
            <input type="search" autofocus="autofocus" v-model="input" ref="input">
            <input id="hiddenText" type="text" style="display:none" onkeypress="searchKeywordKeyboard(event)" />
          </form>
        </div>
      </div>
      <div :class="animate ? 'showbutton button' : 'button'" @click="ToLast">
        取消
      </div>
    </div>
    <div class="hot" v-show="search.length < 1">
      <p>热门搜索</p>
      <div v-for="item in hot" :key="item.first" @click="hotSelect(item.first)">{{ item.first }}</div>
    </div>
    <div class="time" v-show="search.length < 1">
      <div class="time-items" v-for="(item,index) in selectList" :key="index"  @click="hotSelect(item)">
        <i class="icon-clock"></i>
        <div>{{ item }}</div>
        <i class="icon-jia"></i>
      </div>
    </div>
    <div class="suggest" v-show="suggest.length > 0">
      <div class="suggess-input" @click="getSearchData(input)">
        搜索 “ {{ input }} ”
      </div>
      <div class="suggest-data" v-for="item in suggest" :key="item.id" @click="getSearchData(item.name)">
        <i class="icon-fangdajing"></i>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <scroll :data="search" class="scroll" v-if="search.length > 0">
      <div class="search-data" v-show="search.length > 0">
        <div :class="playItem.id === item.id ? 'search-data-items playing' : 'search-data-items'" v-for="(item,index) in search" :key="item.id" @click="toPlay(index)">
          <h2>{{ item.name }}</h2>
          <p>{{ item.author }}</p>
        </div>
      </div>
    </scroll>
    <minloading v-if="loading"></minloading>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import {CODE} from 'common/js/config'
import minloading from 'base/163loading/163loading'
import {mapActions,mapGetters} from 'vuex'
import {setCookie,getCookie} from 'common/js/cookie'
import {Search_getHot,Search_suggest,Search_search} from 'api/search'

export default {
  data(){
    return {
      animate:false,
      input:'',
      hot:[],
      suggest:[],
      search:[],
      forSwitch:true,
      selectList:[],
      loading:false
    }
  },
  computed:{
    ...mapGetters([
      'playItem',
    ])
  },
  mounted(){
    setTimeout(() => {
      this.animate = true
    },30)
    this.selectList == getCookie('selectList')
    // console.log(this.selectList,getCookie('selectList'))
    Search_getHot().then(res => {
      if (res.data.code === CODE) {
        this.hot = res.data.result.hots
      }
    })
  },
  methods:{
    ToLast() {
      this.$router.back()
    },
    toPlay(index) {
      this.selectPlay({
        list:this.search,
        index:index
      })
    },
    submit() {
      console.log('enter')
    },
    hotSelect(e) {
      this.input = e
      this.getSearchData(e)
    },
    getSearchData(value){
      this.loading = true
      if (this.findIndex(value) === 1) {
        this.selectList.push(value)
        setCookie('selectList',this.selectList)
      }
      Search_search(value).then(res => {
        this.suggest = []
        setTimeout(() => {
          this.loading = false
        },300) 
        if (res.data.code === CODE) {
          this._setsearchData(res.data.result.songs)
        }
      })
      
    },
    //  判断搜索结果是否已存在
    findIndex(value){
      let _switch = 1
      this.selectList.findIndex(res => {
        if (res === value) _switch = 0
      })
      return _switch
    },
    //  制作搜索结果数组
    _setsearchData(list){
      let returnData = []
      for (let x in list){
        const data = {}
        data.id = list[x].id
        data.name = list[x].name
        data.author = list[x].artists[0].name + ' - ' + list[x].album.name
        returnData.push(data)
      }
      this.search = returnData
    },
    //  制作搜索建议数组
    _setsuggestData(list){
      const forList = [list.albums,list.artists,list.songs]
      try{
        for (let i in forList){
          if (forList[i].length > 0) {
            for (let x in forList[i]){
              if (this.input != '') this.suggest.push(forList[i][x])
            }
          }
        }
        this.forSwitch = true
      }catch(e){
        this.forSwitch = true
      }
    },
    ...mapActions([
      'selectPlay',
    ]),
  },
  watch:{
    '$route'(to,from){
      this.input = ''
      if (to.path === '/search'){
        this.animate = true
        this.search = []
        this.suggest = []
        setTimeout(() => {
          this.$refs.input.focus()
        },300)
      }else {
        this.animate = false
      }
    },
    input(value){
      this.suggest = []
      if (this.forSwitch){
        this.search = []
        if (value != '') {
          Search_suggest(value).then(res => {
            if (res.data.code === CODE) {
              this.forSwitch = false
              this._setsuggestData(res.data.result)
            }
          })
        }
      }
    }
  },
  components:{
    scroll,
    minloading
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .search
    height 85px
    line-height 85px
    background $color-highlight-background
    padding-top 12.5px
    box-sizing border-box
    position relative
    z-index 2
    display flex
    .input
      width 655px
      height 100%
      &>div
        position relative
        color #efb2ae
        font-size $font-size-medium-x
        overflow hidden
        input
          float right 
          width 608px
          height 60px
          text-align center
          line-height 60px
          margin auto
          border-radius 10vw
          background #df645b
          color #fff
          font-size $font-size-medium-x
          transition all .3s
          text-align left
          text-indent 63px
        i,span
          font-size $font-size-large
          position absolute 
          left 200px
          top -13px
          transition all .3s
        span 
          left 250px
          top -11px
    .button
      width calc(100% - 655px)
      text-align center
      line-height 65px
      color #fff
      transition all .3s
      transform translateX(100%)
    .showbutton
      transform translateX(0)
    .showinput
      input
        width 640px!important
      i 
        left 35px!important
      span 
        left 80px!important
  .hot
    padding 30px 25px
    box-sizing border-box
    overflow hidden
    p
      color #333
      font-size 26px
      margin-bottom 20px
    div
      border-radius 30px
      border 1px solid #ddd
      font-size 28px
      padding 10px 25px
      float left
      margin-right 15px
      margin-bottom 15px
  .suggest
    padding-left 20px
    box-sizing border-box
    position absolute
    top 85px
    background #fbfcfd
    width 100%
    min-height 100%
    .suggess-input
      height 100px
      line-height 100px
      text-align left 
      font-size 32px
      color #507daf
      border-bottom 1px solid #ddd
    .suggest-data
      height 90px
      width 100%
      line-height 90px
      i 
        color #666
        font-size 30px
        float left
      div 
        margin-left 20px
        font-size 28px
        border-bottom 1px solid #ddd
        float left
        width 92%
  .search-data
    padding-left 15px
    box-sizing border-box
    position absolute
    top 0
    background #fbfcfd
    width 100%
    min-height 100%
    padding-bottom 16vw
    .search-data-items
      height 110px
      width 100%
      border-bottom 1px solid #ddd
      padding-top 25px
      box-sizing border-box
      h2
        font-size 28px
      p
        font-size 24px
        color #666
        margin-top 10px
  .scroll
    position fixed
    top 85px
    height calc(100% - 85px)
    width 100%
  .time
    padding-left 20px
    box-sizing border-box
    .time-items
      height 88px
      display flex
      line-height 88px
      border-bottom 1px solid #eee
      div
        font-size 28px
        width 85%
      &>i:first-child
        font-size 32px
        margin-right 20px
        color #999
      &>i:last-child
        font-size 32px
        transform rotate(135deg)
        color #ddd
  .playing
    h2
      color $color-highlight-background
</style>

