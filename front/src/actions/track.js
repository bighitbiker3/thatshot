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
  return function (dispatch) {
    return fetch(server.API_LOCATION + '/songs?is_savant=true')
      .then(data => data.json())
      .then(dataJSON => dataJSON.sort((a, b) => b.upvotes - a.upvotes))
      .then(dataSorted => dispatch(trackSetSavant(dataSorted)))
      .catch(err => console.log(err))
  }
}

function trackSetUser (tracks) {
  return {
    type: actionTypes.TRACKS_SET_USER,
    tracks
  }
}

export function setUserTracks (song, user) {
  return function (dispatch) {
    if (song) {
      song.user = user
      return dispatch(trackSetUser(song))
    }
    else {
      return fetch(server.API_LOCATION + '/songs?is_savant=false')
      .then(data => data.json())
      .then(dataJSON => dispatch(trackSetUser(dataJSON)))
      .catch(err => console.log(err))
    }
  }
}

function alreadyUpvoted () {
  return {type: actionTypes.ALREADY_UPVOTED}
}

export function upVoteTrack (trackId, user) {
  return function (dispatch) {
    if (!user) return dispatch(notifSend({message: 'You must be logged in to upvote tunes', kind: 'danger', dismissAfter: 1000}))
    return $.ajax(server.API_LOCATION + `/songs/${trackId}/${user.id}/upvote`, {method: 'POST'})
      .then(track => {
        console.log(track)
        if (track) dispatch(sendUpvoteAction(track))
        else dispatch(notifSend({message: 'You already upvoted that', kind: 'danger', dismissAfter: 1000}))
      })
      .catch(err => console.log(err))
  }
}

function sendUpvoteAction (track) {
  return {
    type: actionTypes.UPVOTE_TRACK,
    track
  }
}

export function mouseEnterUpvote () {
  return {
    type: actionTypes.MOUSE_ENTER_UPVOTE,
    upVoteHover: true
  }
}

export function mouseLeaveUpvote () {
  return {
    type: actionTypes.MOUSE_LEAVE_UPVOTE,
    upVoteHover: false
  }
}
