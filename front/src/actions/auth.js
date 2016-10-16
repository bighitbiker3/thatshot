import SC from 'soundcloud'
import * as actionTypes from '../constants/actionTypes'
import { setSavantTracks } from '../actions/track'
import * as server from '../constants/server'
import { closeHeader } from './header'

function setMe (user) {
  return {
    type: actionTypes.ME_SET,
    user
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
    .then(data => data.user ? dispatch(setMe(data.user)) : null)
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

export function soundCloudAuth () {
  return function (dispatch) {
    SC.connect()
    .then((session) => {
      console.log(session, 'sessionsssssslslsls')
      dispatch(fetchMeSoundCloud(session))
    })
    .catch(err => console.log(err.message))
  }
};

function addTokenToDatabase (access_token) {
  $.post(server.SERVER_LOCATION + '/api/soundCloudAuth', {access_token})
  .then(idk => console.log(idk))
  .catch(err => console.warn(err))
}

function fetchMeSoundCloud (session) {
  return function (dispatch) {
    fetch(`https://api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data, 'this is SC dataaaa')
      addTokenToDatabase(session.oauth_token)
    })
    .catch(err => console.log('ERROR ', err))
  }
};
