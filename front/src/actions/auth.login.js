import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import { closeHeader } from './header'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

export function loginEmailFormChange (e) {
  console.log(email, 'in action login')
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

export function loginSubmit (email, password) {
  return function (dispatch) {
    dispatch({type: actionTypes.START_LOADING})
    $.ajax(server.SERVER_LOCATION + '/login', {
      method: 'POST',
      data: {email: email, password: password}
    })
    .then(user => {
      dispatch(sendUserAuthAction(user.user))
      dispatch(closeHeader())
      dispatch({type: actionTypes.STOP_LOADING})
    })
    .catch(err => {
      dispatch({type: actionTypes.STOP_LOADING})
      notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger', dismissAfter: 1000})
      console.log(err)
    })
  }
}
