import * as types from './mutation-types'

const mutations = {
    [types.SET_LOGIN](state,login) {
        state.login = login
    },
    [types.SET_USER](state,obj) {
        state.user = obj
    }
}