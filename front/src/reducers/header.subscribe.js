import * as actionTypes from '../constants/actionTypes'

const initialState = {
  email: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUBSCRIBE_CHANGE: return subscribeFormChange(state, action)
    case actionTypes.SUBSCRIBE_SUBMIT: return subscribeSubmit(state, action)
  }
  return state
}

function subscribeFormChange (state, action) {
  return Object.assign({}, state, {email: action.email})
}

function subscribeSubmit (state, action) {
  console.log('submit pressed in reducer returning statel maoooooooo')
  return {...state}
}