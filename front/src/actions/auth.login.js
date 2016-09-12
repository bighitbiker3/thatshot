import * as actionTypes from '../constants/actionTypes';
import * as server from '../constants/server';

export function loginEmailFormChange(e){
  console.log(email, 'in action login');
  let email = e.target.value
  return {
    type: actionTypes.LOGIN_EMAIL_CHANGE,
    email
  }
}

export function loginPasswordFormChange(e){
  let password = e.target.value
  return {
    type: actionTypes.LOGIN_PASSWORD_CHANGE,
    password
  }
}

export function sendUserAuthAction(user){
  return {
    type: actionTypes.ME_SET,
    user
  }
}

export function loginSubmit(email, password){
  return function(dispatch){
    $.ajax(server.SERVER_LOCATION + '/login', {
      method: 'POST',
      data: {email: email, password: password}
    })
    .then(user => dispatch(sendUserAuthAction(user.user)))
    .catch(err => console.log(err))
  }
}
