import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import { closeHeader } from './header'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions
import { initSoundCloud } from './auth'

export function loginEmailFormChange (e) {
  let email = e.target.value
  return {
    type: actionTypes.LOGIN_EMAIL_CHANGE,
    email
  }
}

export function loginPasswordFormChange (e) {
  let password = e.target.value
  return {
    type: actionTypes.LOGIN_PASSWORD_CHANGE,
    password
  }
}

export function sendUserAuthAction (user) {
  return {
    type: actionTypes.ME_SET,
    user
  }
}

export function loginSubmit (event) {
  event.preventDefault()
  return function (dispatch, getState) {
    const { email, password } = getState().login
    dispatch({type: actionTypes.START_LOADING})
    $.ajax(server.SERVER_LOCATION + '/login', {
      method: 'POST',
      data: {email: email, password: password}
    })
    .then(user => {
      dispatch(sendUserAuthAction(user.user))
      if (user.token) {
        dispatch(initSoundCloud(user.token))
        dispatch(closeHeader())
      } else {
        dispatch(closeHeader())
        dispatch({type: actionTypes.STOP_LOADING})
      }
    })
    .catch(err => {
      dispatch({type: actionTypes.STOP_LOADING})
      if(err.responseText.includes('Invalid login credentials')) dispatch(notifSend({message: 'Wrong login credentials', kind: 'danger', dismissAfter: 1000}))
      else dispatch(notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger', dismissAfter: 1000}))
      console.warn(err)
    })
  }
}
