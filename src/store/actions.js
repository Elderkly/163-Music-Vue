import * as types from './mutation-types'

export const selectPlay = function({commit},{list,index}) {
  commit(types.SET_SEQUENCE_LIST,list)
  commit(types.SET_PLAY_INDEX,index)
  commit(types.SET_PLAY_LIST,list)
  commit(types.SET_PLAY_ING,true)
  commit(types.SET_FULLSCREEN,true)
}