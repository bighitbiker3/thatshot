import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import axios from 'axios'

export function setProfilePageTracks (id) {
  return function (dispatch) {
    dispatch({type: actionTypes.START_LOADING})
    return axios.get(server.API_LOCATION + `/users/${id}/tracks`)
    .then(res => res.data)
    .then(userStuff => {
      console.log(userStuff);
      dispatch(setTracks(userStuff, id))
      dispatch({type: actionTypes.STOP_LOADING})
    })
    .catch(err => console.warn(err))
  }
}

export function removeProfileTracks () {
  return {
    type: actionTypes.REMOVE_PROFILE_TRACKS
  }
}

export function toggleSettings () {
  return {
    type: actionTypes.TOGGLE_SETTINGS
  }
}


function setTracks (tracks, id) {
  console.log(tracks);
  return {
    type: actionTypes.SET_PROFILE_TRACKS,
    payload: tracks
  }
}
