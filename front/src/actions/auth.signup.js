import * as actionTypes from '../constants/actionTypes';
import * as server from '../constants/server';
import { closeHeader } from './header'


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

export function signUpUsernameChange(e){
  let username = e.target.value
  return {
    type: actionTypes.SIGNUP_USERNAME_CHANGE,
    username
  }
}

export function sendUserAuthAction(user){
  console.log(user, 'THIS IS USERRRRR');
  return {
    type: actionTypes.ME_SET,
    user
  }
}


export function signUpSubmit(email, password, username){
  const userToSignUp = {email: email, password: password, username: username, firstName: 'test', lastName: 'test'}
  return function(dispatch){
    return $.ajax(server.API_LOCATION + '/users', {
      method: 'POST',
      data: userToSignUp
    })
    .then(newUser => {
      if(newUser){
        dispatch(sendUserAuthAction(newUser))
        dispatch(closeHeader())
      } else {
        console.log('no User created')
      }
    })
    .catch(err => console.log('THERE IS AN ERRORRRRR', err.statusCode()))
  }
}
