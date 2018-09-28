import axios from 'axios'
import { HOST } from 'common/js/config'

//  获取热搜词汇
export const Search_getHot = () => {
  const url = HOST + `/search/hot`
  return axios.get(url)
}

//  获取搜索建议
export const Search_suggest = (key) => {
  const url = HOST + `/search/suggest?keywords=${key}`
  return axios.get(url)
}

//  获取搜索结果
export const Search_search = (key) => {
  const url = HOST + `/search?keywords=${key}`
  return axios.get(url)
}
