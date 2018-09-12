import axios from 'axios'
import {HOST} from 'common/js/config'
import {getCookie} from 'common/js/cookie'

//  获取用户歌单
export const User_getUserList = () => {
  const userId = getCookie('userId')
  const url = HOST + `/user/playlist?uid=${userId}`
  return axios.get(url)
}