import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

function trackSetSavant (tracks) {
  return {
    type: actionTypes.TRACKS_SET_SAVANT,
    tracks
  }
}

export function setSavantTracks () {
  return function (dispatch, getState) {
    dispatch({type: actionTypes.START_LOADING})
    return $.get(server.API_LOCATION + '/songs?is_savant=true')
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
    }
    else {
      dispatch({type: actionTypes.START_LOADING})
      return $.get(server.API_LOCATION + '/songs?is_savant=false')
      .then(data => data.json())
      .then(dataJSON => {
        dispatch(trackSetUser(dataJSON))
        dispatch({type: actionTypes.STOP_LOADING})
      })
      .catch(err => console.warn(err))
    }
  }
}

function alreadyUpvoted () {
  return {type: actionTypes.ALREADY_UPVOTED}
}

export function upVoteTrack (trackId, user) {
  return function (dispatch, getState) {
    if (!user) return dispatch(notifSend({message: 'You must be logged in to upvote tunes', kind: 'danger', dismissAfter: 1000}))
    return $.ajax(server.API_LOCATION + `/songs/${trackId}/${user.id}/upvote`, {method: 'POST'})
      .then(track => {
        if (track) dispatch(sendUpvoteAction(track))
        else dispatch(notifSend({message: 'You already upvoted that', kind: 'danger', dismissAfter: 1000}))
      })
      .catch(err => console.warn(err))
  }
}

export function sendUpvoteAction (track) {
  return {
    type: actionTypes.UPVOTE_TRACK,
    track
  }
}

export function addToLikesOnState (trackId) {
  return {
    type: actionTypes.LIKE_ON_SOUNDCLOUD,
    trackId
  }
}

export function likeOnSoundCloud (trackId) {
  return function (dispatch, getState) {
    dispatch(addToLikesOnState(trackId))
    SC.put(`/me/favorites/${trackId}`)
    .catch(err => console.warn(err))
  }
}
