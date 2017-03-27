import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import axios from 'axios'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

export function setArtistPageTracks (artistName, trackName) {
  return function (dispatch) {
    dispatch({type: actionTypes.START_LOADING})
    console.log(trackName);
    const url = trackName ? `${server.API_LOCATION}/artists/${artistName}/${trackName}` : `${server.API_LOCATION}/artists/${artistName}/songs`
    console.log(url);
    axios.get(url)
    .then(res => res.data)
    .then(songs => {
      dispatch(trackSetArtist(songs))
      dispatch({type: actionTypes.STOP_LOADING})
    })
    .catch(err => {
      dispatch({type: actionTypes.STOP_LOADING})
      dispatch(notifSend({message: 'Sorry, there was an error. Please try again' + err, kind: 'danger', dismissAfter: 1000}))
    })
  }
}

function trackSetArtist (songs) {
  return {
    type: actionTypes.TRACKS_SET_ARTIST,
    payload: songs
  }
}
