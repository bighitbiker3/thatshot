import * as actionTypes from '../constants/actionTypes'

const initialState = {
  show: 'none',
  active: false,
  profilePage: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_SIGNUP: return showSignUp(state, action)
    case actionTypes.SHOW_LOGIN: return showLogin(state, action)
    case actionTypes.SHOW_SUBMISSION: return showLogin(state, action)
    case actionTypes.CLOSE_HEADER: return closeHeader(state, action)
    case actionTypes.OPEN_HEADER: return openHeader(state, action)
    case actionTypes.SHOW_PROFILE_PAGE: return showProfilePage(state, action)

  }
  return state
}

function showSignUp (state, action) {
  return Object.assign({}, state, action.payload)
}

function showLogin (state, action) {
  return Object.assign({}, state, action.payload)
}

function closeHeader (state, action) {
  return Object.assign({}, state, action.payload)
}

function openHeader (state, action) {
  return Object.assign({}, state, action.payload)
}

function showProfilePage (state, action) {
  return Object.assign({}, state, {profilePage: !state.profilePage})
}
