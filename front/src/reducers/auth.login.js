import * as actionTypes from '../constants/actionTypes';

const initialState = {
  email: '',
  password: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_EMAIL_CHANGE: return loginEmailFormChange(state, action);
    case actionTypes.LOGIN_PASSWORD_CHANGE: return loginPasswordFormChange(state, action);

  }
  return state;
}


function loginEmailFormChange(state, action){
  return Object.assign({}, state, {email: action.email})
}

function loginPasswordFormChange(state, action){
  return Object.assign({}, state, {password: action.password})
}
