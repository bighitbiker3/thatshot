import * as actionTypes from '../constants/actionTypes';
import * as server from '../constants/server';


export function signUpEmailFormChange(e){
  let email = e.target.value
  return {
    type: actionTypes.SIGNUP_EMAIL_CHANGE,
    email
  }
}

export function signUpPasswordFormChange(e){
  let password = e.target.value
  return {
    type: actionTypes.SIGNUP_PASSWORD_CHANGE,
    password
  }
}

export function sendUserAuthAction(user){
  return {
    type: actionTypes.ME_SET,
    user
  }
}


export function signUpSubmit(email, password){
  return function(dispatch){
    $.ajax(server.API_LOCATION + '/users', {
      method: 'POST',
      data: {email: email, password: password, firstName: 'test', lastName: 'test'}
    })
    .then(newUser => newUser ? dispatch(sendUserAuthAction(newUser)) : console.log('no User created'))
    .catch(err => console.log(err))
  }
}
