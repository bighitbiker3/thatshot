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

export function subscribeSubmit (event) {
  event.preventDefault()
  return function (dispatch, getState) {
    const { email } = getState().subscribe
    dispatch({type: actionTypes.START_LOADING})
    return $.ajax(`${server.API_LOCATION}/subscribers`, {method: 'POST', data: {email}})
    .then((sub) => {
      dispatch({type: actionTypes.STOP_LOADING})
      dispatch(notifSend({message: 'Thanks for subscribing!', kind: 'success', dismissAfter: 1000}))
    })
    .catch((err) => {
      dispatch({type: actionTypes.STOP_LOADING})
      if(err.responseText.includes('Validation')) return dispatch(notifSend({message: 'You\'re already subscribed!', kind: 'success', dismissAfter: 1000}))
      dispatch(notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger', dismissAfter: 1000}))
    })
  }
}
