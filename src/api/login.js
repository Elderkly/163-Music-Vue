import axios from 'axios'
import { HOST } from 'common/js/config'

//  PhoneLogin
export const login = (phone, password) => {
  const url = HOST + `/login/cellphone?phone=${phone}&password=${password}`
  return axios.get(url, { xhrFields: {
    withCredentials: true
  }})
}
