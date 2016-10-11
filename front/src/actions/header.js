import * as actionTypes from '../constants/actionTypes'

export function showSignUp () {
  return {
    type: actionTypes.SHOW_SIGNUP,
    payload: {active: true, show: 'signup'}
  }
}

export function showLogin () {
  return {
    type: actionTypes.SHOW_LOGIN,
    payload: {active: true, show: 'login'}
  }
}

export function closeHeader () {
  return {
    type: actionTypes.CLOSE_HEADER,
    payload: {active: false, show: 'none'}
  }
}

export function showSubmission () {
  return {
    type: actionTypes.SHOW_SUBMISSION,
    payload: {active: true, show: 'submission'}
  }
}

export function showProfilePage () {
  return {
    type: actionTypes.SHOW_PROFILE_PAGE
  }
}
