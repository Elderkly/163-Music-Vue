import * as types from './mutation-types'
import { shuffle, getThenIndex } from 'common/js/util'

export const selectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  //  如果是随机播放模式
  if (state.playType === 'random') {
    //  生成打乱过的数组 赋值给playList
    const randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    //  找到当前点击的歌曲在打乱后的数组中的index
    index = getThenIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_PLAY_INDEX, index)
  commit(types.SET_PLAY_ING, true)
  commit(types.SET_SHOWPLAYER, true)
  commit(types.SET_NOWSHOW, 'player')
}

//  删除一条播放记录
export const deleteItem = function({ commit, state }, { item }) {
  const playList = state.playList.slice()
  const sequenceList = state.sequenceList.slice()
  const pIndex = getThenIndex(playList, item)
  const sIndex = getThenIndex(sequenceList, item)
  let playIndex = state.playIndex
  playList.splice(pIndex, 1)
  sequenceList.splice(sIndex, 1)
  /*
    playIndex > pIndex
    删除的歌曲在当前播放的歌曲之前
    由于删除后歌单Length会产生变化
    导致当前播放歌曲前的歌曲index都会-1
    所以需要将playIndex--
    否则的话删除后会播放原本正在播放的下一首歌曲

    playIndex === playList.length
    当前播放的歌曲刚好是最后一首
    删除后数组长度发生变化
    需要将playIndex--来播放删除后的最后一首歌曲
  */
  if (playIndex > pIndex || playIndex === playList.length) {
    playIndex--
  }

  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAY_INDEX, playIndex)

  // 如果歌曲删除完毕，那么播放停止
  const playingState = playList.length > 0
  commit(types.SET_PLAY_ING, playingState)
}
