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


export function getProfileTracks (id) {
  return function (dispatch) {
    dispatch({type: actionTypes.START_LOADING})
    return axios.get(server.API_LOCATION + `/users/${id}/tracks`)
    .then(res => res.data)
    .then(userStuff => {
      dispatch(trackSetSavant(userStuff))
      dispatch({type: actionTypes.STOP_LOADING})
    })
    .catch(err => console.warn(err))
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

export const clearTracks = () => ({
  type: actionTypes.CLEAR_TRACKS
})
