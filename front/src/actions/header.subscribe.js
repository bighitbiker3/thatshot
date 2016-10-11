import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

export function subscribeFormChange (e) {
  let email = e.target.value
  return {
    type: actionTypes.SUBSCRIBE_CHANGE,
    email
  }
}

function sendSubscribeSubmitAction () {
  return {
    type: actionTypes.SUBSCRIBE_SUBMIT
  }
}

export function subscribeSubmit (email) {
  let dataToSend = {email: email}
  return function (dispatch) {
    dispatch({type: actionTypes.START_LOADING})
    return $.ajax(`${server.API_LOCATION}/subscribers`, {method: 'POST', data: dataToSend})
    .then(user => dispatch(sendUserAuthAction()))
    .then(() => {
      dispatch({type: actionTypes.STOP_LOADING})
      dispatch(notifSend({message: 'Thanks for subscribing!', kind: 'success', dismissAfter: 1000}))
    })
    .catch(() => {
      dispatch({type: actionTypes.STOP_LOADING})
      dispatch(notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger', dismissAfter: 1000}))
    })
  }
}
