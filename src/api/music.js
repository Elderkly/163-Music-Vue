import axios from 'axios'
import {HOST} from 'common/js/config'

//  根据歌单ID获取歌单信息
export const Music_GetListData = (id) => {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url)
}
//  获取歌曲播放src
export const Music_GetSrc = id => {
  const url = HOST + `/music/url?id=${id}`
  return axios.get(url)
}
//  获取歌曲封面
export const Music_GetImg = id => {
  const url = HOST + `/song/detail?ids=${id}`
  return axios.get(url)
}
