import * as actionTypes from '../constants/actionTypes';
import * as server from '../constants/server';
import * as auth from '../constants/auth';
import { setUserTracks } from './track'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
const { notifSend } = notifActions;

export function submissionFormChange(e){
  let submission = e.target.value
  return {
    type: actionTypes.SUBMISSION_CHANGE,
    submission
  }
}

function sendSubmissionSubmitAction(song){
  console.log('send submission action');
  return {
    type: actionTypes.SUBMISSION_SUBMIT,
    song
  }
}


export function submissionSubmit(link, user){
  return function (dispatch){
    return fetch(`https://api.soundcloud.com/resolve?url=${link}&client_id=${auth.CLIENT_ID}`)
    .then(song => {
      return song.json()
    })
    .then(song => {
      dispatch(sendSubmissionSubmitAction(song))
      analyzeSong(song, user, dispatch)
    })
    .catch(err => {
      console.log(err);
      dispatch(notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger',dismissAfter: 1000}))
    })
  }
}

function analyzeSong(song, postedUser, dispatch){
  return fetch(`https://api.soundcloud.com/users/${song.user.id}?client_id=${auth.CLIENT_ID}`)
  .then(user =>  user.json())
  .then(user => user.followers_count < 12000 ? checkForSongInDb(song, postedUser, dispatch) : tooManyFollowers())
  .catch(err => console.log(err))
}

function checkForSongInDb(song, user, dispatch){
  console.log(song);
  const songToAdd = {artwork_url: song.artwork_url, duration: song.duration, genre: song.genre, trackId: song.id, permalink_url: song.permalink_url, reposts_count: song.reposts_count, title: song.title, artist: song.user.username, artist_uri: song.user.uri, playback_count: song.playback_count, artist_permalink: song.user.permalink_url, stream_url: song.stream_url, artist_id: song.user.id, waveform_url: song.waveform_url}
  return $.ajax(server.API_LOCATION + `/songs/${user.id}/${song.id}`, {
    method: 'POST',
    data: songToAdd
  })
  .then(song => {
    if(song) {
      dispatch(setUserTracks(song, user))
      dispatch(notifSend({message: 'Song posted. Thanks :)', kind: 'success',dismissAfter: 1000}))
    } else {
      dispatch(notifSend({message: 'This song was already posted', kind: 'danger',dismissAfter: 1000}))
    }
  })
  .catch(err => {
      console.log(err);
      dispatch(notifSend({message: 'Sorry, there was an error. Please try again', kind: 'danger',dismissAfter: 1000}))
  })

}

function tooManyFollowers(){
  dispatch(notifSend({message: 'This artist is over our 13k follower limit :(', kind: 'danger',dismissAfter: 1000}))
}
