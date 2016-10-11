import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'

export function setProfilePageTracks(id){
  console.log(id, 'THIS IS ID BEING PASSSEDDDDDDD');
  return function (dispatch) {
    return fetch(server.API_LOCATION + `/users/${id}/tracks`)
    .then(res => res.json())
    .then(userStuff => dispatch(setTracks(userStuff, id)))
    .catch(err => console.warn(err))
  }
}

export function removeProfileTracks(){
  return {
    type: actionTypes.REMOVE_PROFILE_TRACKS
  }
}

function setTracks(tracks, id){
  tracks = tracks.map(track => {
    track.reqUserId = id
    return track
  })
  let upVotedTracks = tracks.filter(track => track.reqUserId !== track.userId && track.reqUserId !== track.user.username)
  let postedTracks = tracks.filter(track => track.reqUserId === track.userId || track.reqUserId === track.user.username);
  return {
    type: actionTypes.SET_PROFILE_TRACKS,
    upVotedTracks,
    postedTracks
  }
}
