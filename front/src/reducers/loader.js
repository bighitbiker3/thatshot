import * as actionTypes from '../constants/actionTypes'

const initialState = false

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_LOADING: return startLoading(state, action)
    case actionTypes.STOP_LOADING: return stopLoading(state, action)
  }
  return state
}

function startLoading(state, action){
  return true
}

function stopLoading(state, action){
  return false
}
