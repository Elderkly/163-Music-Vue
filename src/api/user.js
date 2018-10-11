import axios from 'axios'
import { HOST } from 'common/js/config'

//  获取用户歌单
export const User_getUserList = (userId) => {
  // const userId = getCookie('userId')
  const url = HOST + `/user/playlist?uid=${userId}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}

//  获取用户详细信息
export const User_getUserData = (userId) => {
  const url = HOST + `/user/detail?uid=${userId}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}
