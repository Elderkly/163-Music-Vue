import axios from 'axios'
import { HOST } from 'common/js/config'

//  根据歌单ID获取歌单信息
export const Music_GetListData = (id) => {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}
//  根据歌单ID获取专辑信息
export const Music_GetAlbumData = (id) => {
  const url = HOST + `/album?id=${id}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}
//  获取歌曲播放src
export const Music_GetSrc = id => {
  const url = HOST + `/music/url?id=${id}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}
//  获取歌曲封面
export const Music_GetImg = id => {
  const url = HOST + `/song/detail?ids=${id}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}
//  获取歌曲评论总数
export const Music_Comment = id => {
  /*
    id:歌曲ID
    limit：取出个数
    offset：分页
  */
  const url = HOST + `/comment/music?id=${id}&limit=1`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}

//  获取排行榜歌单
export const Music_getRanking = num => {
  const url = HOST + `/top/list?idx=${num}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}
