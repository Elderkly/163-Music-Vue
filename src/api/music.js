import axios from 'axios'
import {HOST} from 'common/js/config'

//  根据歌单ID获取歌单信息
export const Music_GetListData = (id) => {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url)
}