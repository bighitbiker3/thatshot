import * as actionTypes from '../constants/actionTypes';

const initialState = {
  show: 'savantTracks'
}
export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_USER_TRACKS: return showUserTracks(state, action);
    case actionTypes.SHOW_SAVANT_TRACKS: return showSavantTracks(state, action);
  }
  return state;
}

function showUserTracks(state, action){
  return Object.assign({}, state, {show: 'userTracks'})
}

function showSavantTracks(state, action){
  return Object.assign({}, state, {show: 'savantTracks'})
}
