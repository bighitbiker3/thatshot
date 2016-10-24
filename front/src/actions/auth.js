import SC from 'soundcloud'
import * as actionTypes from '../constants/actionTypes'
import { setSavantTracks } from '../actions/track'
import * as server from '../constants/server'
import { closeHeader } from './header'
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth'


function setMe (user) {
  return {
    type: actionTypes.ME_SET,
    user
  }
}

export function setMeSC (soundcloud) {
  return {
    type: actionTypes.ME_SET_SOUNDCLOUD,
    soundcloud
  }
}

function logoutMe () {
  return {
    type: actionTypes.LOGOUT
  }
}

export function getSession () {
  return function (dispatch) {
    $.get(server.SERVER_LOCATION + '/session')
    .then(data => {
      data.user ? dispatch(setMe(data.user)) : null
      return data
    })
    .then(data => {
      dispatch(initSoundCloud(data.token))
    })
    .catch(err => console.warn(err))
  }
}

export function logout () {
  return function (dispatch) {
    $.get(server.SERVER_LOCATION + '/logout')
    .then(() => {
      dispatch(logoutMe())
      dispatch(closeHeader())
    })
    .catch(err => console.warn(err))
  }
}

export function soundCloudAuth (token) {
  return function (dispatch) {
    SC.connect()
    .then((session) => {
      dispatch(fetchMeSoundCloud(session))
    })
    .catch(err => console.log(err.message))
  }
};

function addTokenToDatabase (accessToken) {
  $.post(server.SERVER_LOCATION + '/api/soundCloudAuth', {access_token: accessToken})
  .catch(err => console.warn(err))
}

export function fetchMeSoundCloud (session) {
  return function (dispatch, getState) {
    fetch(`https://api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      addTokenToDatabase(session.oauth_token)
      dispatch(setMeSC(data))
    })
    .catch(err => console.warn(err))
  }
};

export function initSoundCloud (token) {
  return function (dispatch) {
    dispatch({type: actionTypes.STOP_LOADING})
    if (token) {
      SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI, oauth_token: token })
      SC.get('/me').then(me => {
        return Promise.all([SC.get('/me/favorites', {limit: 200}), me])
      })
      .then(([favs, me]) => {
        me.favorites = favs.map(fav => fav.id)
        dispatch(setMeSC(me))
        dispatch({type: actionTypes.STOP_LOADING})
      })
    } else {
      SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI })
      dispatch({type: actionTypes.STOP_LOADING})
      return null
    }
  }
}
