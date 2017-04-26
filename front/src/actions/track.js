import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import axios from 'axios'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

export function trackSetSavant (tracks) {
  return {
    type: actionTypes.TRACKS_SET_SAVANT,
    tracks
  }
}

export function setSavantTracks () {
  return function (dispatch, getState) {
    dispatch({type: actionTypes.START_LOADING})
    return fetch(server.API_LOCATION + '/songs?is_savant=true')
      .then(data => data.json())
      .then(dataJSON => dataJSON.sort((a, b) => b.upvotes - a.upvotes))
      .then(dataSorted => {
        dispatch(trackSetSavant(dataSorted))
        dispatch({type: actionTypes.STOP_LOADING})
      })
      .catch(err => console.warn(err))
  }
}

function trackSetUser (tracks) {
  return {
    type: actionTypes.TRACKS_SET_USER,
    tracks
  }
}

export function setUserTracks (song, user) {
  return function (dispatch, getState) {
    if (song) {
      song.user = user
      return dispatch(trackSetUser(song))
    } else {
      return fetch(server.API_LOCATION + '/songs?is_savant=false')
      .then(data => data.json())
      .then(dataJSON => {
        dispatch(trackSetUser(dataJSON))
      })
      .catch(err => console.warn(err))
    }
  }
}

export function upVoteTrack (trackId, user) {
  return function (dispatch, getState) {
    if (!user) return dispatch(notifSend({message: 'You must be logged in to upvote tunes', kind: 'danger', dismissAfter: 1000}))
    return axios.post(server.API_LOCATION + `/songs/${trackId}/${user.id}/upvote`, {})
      .catch(err => console.warn(err))
  }
}

export function addToLikesOnState (trackId) {
  return {
    type: actionTypes.LIKE_ON_SOUNDCLOUD,
    trackId
  }
}

export function removeLikesOnState (trackId) {
  return {
    type: actionTypes.REMOVE_LIKE_ON_SOUNDCLOUD,
    trackId
  }
}

export function likeOnSoundCloud (scTrackId, trackId, user) {
  return function (dispatch, getState) {
    dispatch(addToLikesOnState(scTrackId))
    dispatch(upVoteTrack(trackId, user))
    SC.put(`/me/favorites/${scTrackId}`)
    .catch(err => console.warn(err))
  }
}

export const unlikeOnSoundCloud = (scTrackId) => {
  return (dispatch, getState) => {
    dispatch(removeLikesOnState(scTrackId))
    SC.delete(`/me/favorites/${scTrackId}`)
    .catch(err => console.warn(err))
  }
}
