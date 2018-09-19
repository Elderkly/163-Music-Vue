import * as types from './mutation-types'
import {shuffle,getThenIndex} from 'common/js/util'


export const selectPlay = function({commit,state},{list,index}) {
  commit(types.SET_SEQUENCE_LIST,list)
  //  如果是随机播放模式
  if (state.playType === 'random') {
    //  生成打乱过的数组 赋值给playList
    const randomList = shuffle(list)
    commit(types.SET_PLAY_LIST,randomList)
    //  找到当前点击的歌曲在打乱后的数组中的index
    index = getThenIndex(randomList,list[index])
  }else {
    commit(types.SET_PLAY_LIST,list)
  }
  commit(types.SET_PLAY_INDEX,index)
  commit(types.SET_PLAY_ING,true)
  commit(types.SET_SHOWPLAYER,true)
  commit(types.SET_NOWSHOW,'player')
}

//  随机播放
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_TYPE,'random')
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_PLAY_INDEX, 0)
  commit(types.SET_SHOWPLAYER,true)
  commit(types.SET_NOWSHOW,'player')
  commit(types.SET_PLAY_ING, true)
}