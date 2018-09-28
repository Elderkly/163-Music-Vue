import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGIN](state, login) {
    state.login = login
  },
  [types.SET_USER](state, obj) {
    state.user = obj
  },
  [types.SET_USER_ID](state, id) {
    state.user.userId = id
  },
  [types.SET_LIST_ID](state, id) {
    state.listId = id
  },
  [types.SET_PLAY_ID](state, id) {
    state.playId = id
  },
  // [types.SET_FULLSCREEN](state,fullScreen) {
  //   state.fullScreen = fullScreen
  // },
  [types.SET_PLAY_ING](state, playing) {
    state.playIng = playing
  },
  [types.SET_PLAY_TYPE](state, type) {
    state.playType = type
  },
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  },
  [types.SET_PLAY_INDEX](state, index) {
    state.playIndex = index
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_NOWSHOW](state, show) {
    state.tab.NowShow = show
  },
  [types.SET_SHOWPLAYER](state, show) {
    state.tab.showPlayer = show
  },
  [types.SET_SHOWPLAYLIST](state, show) {
    state.tab.showPlayList = show
  },
  [types.SET_SHOWAUTHOR](state, show) {
    state.tab.showAuthor = show
  },
  [types.SET_AUTHOR_ID](state, id) {
    state.authorId = id
  },
  [types.SET_LIST_TYPE](state, type) {
    state.showPlayListType = type
  }

}

export default mutations
