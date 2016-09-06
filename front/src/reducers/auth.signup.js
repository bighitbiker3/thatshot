import * as actionTypes from '../constants/actionTypes';

const initialState = {
  email: '',
  password: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGNUP_EMAIL_CHANGE: return signUpEmailFormChange(state, action);
    case actionTypes.SIGNUP_PASSWORD_CHANGE: return signUpPasswordFormChange(state, action);

  }
  return state;
}


function signUpEmailFormChange(state, action){
  return Object.assign({}, state, {email: action.email})
}

function signUpPasswordFormChange(state, action){
  return Object.assign({}, state, {password: action.password})
}
