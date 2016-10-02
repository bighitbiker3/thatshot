import * as actionTypes from '../constants/actionTypes'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ME_SET: return setMe(state, action)
    case actionTypes.LOGOUT: return logout(state, action)
  }
  return state
}

function setMe (state, action) {
  const { user } = action
  return { ...state, user}
}

function logout (state, action) {
  const user = null
  return { ...state, user}
}
