import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import { closeHeader } from './header'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions
import { loginSubmit } from './auth.login'

export function signUpEmailFormChange (e) {
  let email = e.target.value
  return {
    type: actionTypes.SIGNUP_EMAIL_CHANGE,
    email
  }
}

export function signUpPasswordFormChange (e) {
  let password = e.target.value
  return {
    type: actionTypes.SIGNUP_PASSWORD_CHANGE,
    password
  }
}

export function signUpUsernameChange (e) {
  let username = e.target.value
  return {
    type: actionTypes.SIGNUP_USERNAME_CHANGE,
    username
  }
}

export function sendUserAuthAction (user) {
  console.log(user, 'THIS IS USERRRRR')
  return {
    type: actionTypes.ME_SET,
    user
  }
}

export function signUpSubmit (email, password, username) {
  const userToSignUp = {email: email, password: password, username: username}
  return function (dispatch) {
    if (!email || !password || !username) return dispatch(notifSend({message: 'All fields are require, noob.', kind: 'danger', dismissAfter: 1000}))
    dispatch({type: actionTypes.START_LOADING})
    return $.ajax(server.API_LOCATION + '/users', {
      method: 'POST',
      data: userToSignUp
    })
    .then(newUser => {
      if (newUser[1]) {
        dispatch(loginSubmit(email, password))
        dispatch(closeHeader())
      } else {
        dispatch(notifSend({message: 'That user already exists :(', kind: 'danger', dismissAfter: 1000}))
      }
      dispatch({type: actionTypes.STOP_LOADING})
    })
    .catch(err => {
      dispatch({type: actionTypes.STOP_LOADING})
      if(err.responseText.includes('Validation isEmail')) return dispatch(notifSend({message: 'Need a real email pls :)', kind: 'danger', dismissAfter: 1000}))
      else return dispatch(notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger', dismissAfter: 1000}))
    })
  }
}
