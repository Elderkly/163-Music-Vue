import axios from 'axios'
import {HOST} from 'common/js/config'

//  Banner
export const Home_getBanner = () => {
  const url = HOST + `/banner`
  return axios.get(url)
}
//  获取推荐歌单
export const Home_getPersonalizedList = () => {
  const url = HOST + '/personalized'
  return axios.get(url)
}
//  获取推荐新歌曲
export const Home_getNewList = () => {
  const url = HOST + '/personalized/newsong'
  return axios.get(url)
}