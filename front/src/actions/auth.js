import SC from 'soundcloud'
import axios from 'axios'
import io from 'socket.io-client'
import { actions as notifActions } from 'redux-notifications'
const { notifSend } = notifActions
let socket = io(window.location.origin)

import * as actionTypes from '../constants/actionTypes'
import { openHeader } from '../actions'
import { trackSetSavant } from '../actions/track'
import * as server from '../constants/server'
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth'

const stopLoadingHelper = () => {
  return (dispatch, getState) => {
    const { soundcloud } = getState().auth
    const { savantTracks } = getState().track
    if (soundcloud.favorites.length && savantTracks.length) dispatch({type: actionTypes.STOP_LOADING})
  }
}

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
  return function (dispatch, getState) {
    axios.get(server.SERVER_LOCATION + '/session')
    .then(res => res.data)
    .then(data => {
      if (data.created) dispatch(openHeader())
      if (data.user) {
        data.user.created = data.created
        dispatch(setMe(data.user))
        if (!data.created) {
          dispatch(getSavantTracks(data.user.id))
          dispatch(initSoundCloud())
        }
      }
      return data
    })
    .catch(err => {
      const pathName = getState().routing.locationBeforeTransitions.pathname
      if (err && pathName === '/') dispatch(openHeader())
    })
  }
}

export function logout () {
  return function (dispatch) {
    axios.get(server.SERVER_LOCATION + '/logout')
    .then(() => {
      dispatch(logoutMe())
      dispatch(openHeader())
      dispatch(trackSetSavant([]))
    })
    .catch(err => console.warn(err))
  }
}

export function fetchMeSoundCloud (session) {
  return function (dispatch, getState) {
    fetch(`https://api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      dispatch(setMeSC(data))
    })
    .catch(err => console.warn(err))
  }
};

export function initSoundCloud () {
  return function (dispatch, getState) {
    dispatch(notifSend({message: 'Fetching your SoundCloud data', kind: 'info', dismissAfter: 3000}))
    SC.initialize({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      oauth_token: getState().auth.user.soundcloud_accessToken
    })
    return SC.get('/me').then(me => {
      return Promise.all([SC.get('/me/favorites', {limit: 200}), me])
    })
    .then(([favs, me]) => {
      me.favorites = favs.map(fav => fav.id)
      return dispatch(setMeSC(me))
    })
    .catch(err => {
      if (err) return dispatch(getSoundCloudRefreshToken())
    })
  }
}

export const getSoundCloudRefreshToken = () => {
  return (dispatch, getState) => {
    axios.get(`${server.SERVER_LOCATION}/login/soundcloud/refresh`)
    .then(user => dispatch(initSoundCloud()))
    .catch(err => console.log('another errr', err))
  }
}

function getSavantTracks (id) {
  return function (dispatch) {
    axios.get(`${server.SERVER_LOCATION}/api/songs/${id}/savantTracks`)
    .then(response => {
      if (response.status === 204) dispatch(addSavantTracks(id))
      else dispatch(trackSetSavant(response.data))
    })
    .catch(err => console.log(err, 'errrrrr'))
  }
}

function addSavantTracks (id) {
  return (dispatch, getState) => {
    dispatch(notifSend({
      message: 'We\'re getting your new tracks for the day. This might take a minute. Please don\'t refresh',
      kind: 'info',
      dismissAfter: 20000
    }))
    console.log(id, getState());
    axios.post(`${server.SERVER_LOCATION}/api/songs/${id}/savantTracks`)
    .then(response => socket.on('doneCreateSavantTracks', () => dispatch(getSavantTracks(id))))
    .catch(err => dispatch(notifSend({message: err, kind: 'danger', dismissAfter: 3000})))
  }
}
