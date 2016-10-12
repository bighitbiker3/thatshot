import * as actionTypes from '../constants/actionTypes'

const initialState = {
  email: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUBSCRIBE_CHANGE: return subscribeFormChange(state, action)
    case actionTypes.SUBSCRIBE_SUBMIT: return subscribeSubmit(state, action)
    case actionTypes.CLEAR_SUBSCRIBE_INPUT: return clearSubscribeInput(state, action)
  }
  return state
}

function subscribeFormChange (state, action) {
  return Object.assign({}, state, {email: action.email})
}

function subscribeSubmit (state, action) {
  return {...state}
}

function clearSubscribeInput () {
  return {email: ''}
}
