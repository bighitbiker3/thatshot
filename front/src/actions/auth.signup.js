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
  console.log(e);
  let password = e.target.value
  return {
    type: actionTypes.SIGNUP_PASSWORD_CHANGE,
    password
  }
}

export function sendUserAuthAction(user){
  console.log(user, 'THIS IS USERRRRR');
  return {
    type: actionTypes.ME_SET,
    user
  }
}


export function signUpSubmit(email, password){
  console.log(email, password, 'EMAIL PASSWRD');
  const userToSignUp = {email: email, password: password, firstName: 'test', lastName: 'test'}
  return function(dispatch){
    console.log('in CALLBACK WITH ', userToSignUp, server.API_LOCATION + '/users');
    return $.ajax(server.API_LOCATION + '/users', {
      method: 'POST',
      data: userToSignUp
    })
    .then(newUser => {
      // newUser = newUser.json()
      console.log('made it into the new user section?');
      return newUser ? dispatch(sendUserAuthAction(newUser)) : console.log('no User created')

    })
    .catch(err => console.log('THERE IS AN ERRORRRRR', err.statusCode()))
  }
}
