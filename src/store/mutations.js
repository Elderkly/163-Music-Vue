import * as types from './mutation-types'

const mutations = {
    [types.SET_LOGIN](state,login) {
        state.login = login
    },
    [types.SET_USER](state,obj) {
        state.user = obj
    },
    [types.SET_USER_ID](state,id) {
      state.user.id = id
    },
    [types.SET_LIST_ID](state,id) {
      state.listId = id
    }
}

export default mutations