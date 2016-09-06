import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import track from './track';
import player from './player';
import signup from './auth.signup'
import login from './auth.login'
import submission from './submission'
import stream from './stream'
import { reducer as notifReducer } from 'redux-notifications';


export default combineReducers({
  auth,
  track,
  signup,
  login,
  submission,
  player,
  stream,
  notifs: notifReducer,
  routing: routerReducer
})
