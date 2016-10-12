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
  return {
    type: actionTypes.ME_SET,
    user
  }
}

// TODO: make this function shorter?
export function signUpSubmit (event) {
  event.preventDefault()
  return function (dispatch, getState) {
    const { email, password, username } = getState().signup
    const userToSignUp = {email, password, username}
    if (!email || !password || !username) return dispatch(notifSend({message: 'All fields are require, noob.', kind: 'danger', dismissAfter: 1000}))
    dispatch({type: actionTypes.START_LOADING})
    return $.ajax(server.API_LOCATION + '/users', {
      method: 'POST',
      data: userToSignUp
    })
    .then(newUser => {
      if (newUser[1]) {
        // new user created so let's log them in :)
        return $.ajax(server.SERVER_LOCATION + '/login', {
          method: 'POST',
          data: {email: email, password: password}
        })
      } else {
        dispatch(notifSend({message: 'That user already exists :(', kind: 'danger', dismissAfter: 1000}))
        dispatch({type: actionTypes.STOP_LOADING})
      }
    })
    .then(user => {
      dispatch(sendUserAuthAction(user.user))
      dispatch({type: actionTypes.STOP_LOADING})
      dispatch(closeHeader())
    })
    .catch(err => {
      dispatch({type: actionTypes.STOP_LOADING})
      if(err.responseText.includes('Validation isEmail')) return dispatch(notifSend({message: 'Need a real email pls :)', kind: 'danger', dismissAfter: 1000}))
      else return dispatch(notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger', dismissAfter: 1000}))
    })
  }
}
