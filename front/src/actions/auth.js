import SC from 'soundcloud';
import * as actionTypes from '../constants/actionTypes';
import { setSavantTracks } from '../actions/track';

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  }
}

export function auth(){
  return function (dispatch){
    SC.connect()
    .then((session) => {
      dispatch(fetchMe(session));
    })
    .catch(err => console.log(err.message));
  }
};

function fetchMe(session){
  return function(dispatch){
    fetch(`https://api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then(res => {
      return res.json()
    })
    .then(data => dispatch(setMe(data)))
    .catch(err => console.log('ERROR ', err))
  }
};
