import * as actionTypes from '../constants/actionTypes';

const initialState = {
  show: 'none',
  active: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_SIGNUP: return showSignUp(state, action);
    case actionTypes.SHOW_LOGIN: return showLogin(state, action);
    case actionTypes.SHOW_SUBMISSION: return showLogin(state, action);
    case actionTypes.CLOSE_HEADER: return closeHeader(state, action)

  }
  return state;
}

function showSignUp(state, action){
  return Object.assign({}, state, action.payload)
}

function showLogin(state, action){
  return Object.assign({}, state, action.payload)
}
function closeHeader(state, action){
  return Object.assign({}, state, action.payload)
}
function showSubmission(state, action){
  return Object.assign({}, state, action.payload)
}
