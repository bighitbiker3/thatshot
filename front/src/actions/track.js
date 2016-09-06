import * as actionTypes from '../constants/actionTypes';
import * as server from '../constants/server';
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
const { notifSend } = notifActions;

function trackSetSavant(tracks) {
  return {
    type: actionTypes.TRACKS_SET_SAVANT,
    tracks
  }
}

export function setSavantTracks(){
  return function (dispatch){
    return fetch(server.API_LOCATION + '/songs?isSavant=true')
      .then(data => data.json())
      .then(dataJSON => dispatch(trackSetSavant(dataJSON)))
      .catch(err => console.log(err))
  }
}

function trackSetUser(tracks){
  return {
    type: actionTypes.TRACKS_SET_USER,
    tracks
  }
}

export function setUserTracks(song){
  return function (dispatch){
      console.log(song, 'song in set user tracks');
    if(song) return dispatch(trackSetUser(song))
    else{
      return fetch(server.API_LOCATION + '/songs?isSavant=false')
      .then(data => data.json())
      .then(dataJSON => dispatch(trackSetUser(dataJSON)))
    }
  }
}

function sendUpvoteAction(track){
  return {
    type: actionTypes.UPVOTE_TRACK,
    track
  }
}

function alreadyUpvoted(){
  return {type: actionTypes.ALREADY_UPVOTED}
}

export function upVoteTrack(trackId, userId){
  return function (dispatch){
    return fetch(server.API_LOCATION + `/songs/${trackId}/${userId}/upvote`, {method: "POST"})
      .then(track => {
        console.log(track);
        if(track) {
          console.log('we got a track');
          return track.json()
        }
        else return null
      })
      .then(trackJSON => {
        console.log(trackJSON);
        trackJSON ? dispatch(sendUpvoteAction(trackJSON)) : dispatch(notifSend({message: 'You already upvoted that', kind: 'danger',dismissAfter: 1000}));

      })
      .catch(err => console.log(err))
  }
}
