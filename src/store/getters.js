export const login  = state => state.login

export const userId  = state => state.user.userId

export const listId  = state => state.listId

export const playId  = state => state.playId

export const fullScreen  = state => state.fullScreen

export const playIng  = state => state.playIng

export const playType  = state => state.playType

export const playList  = state => state.playList

export const playIndex = state => state.playIndex

export const playItem  = (state) => {
  return state.playList[state.playIndex] || {}
}
