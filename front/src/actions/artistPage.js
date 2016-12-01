import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

export function setArtistPageTracks (artistName) {
  return function (dispatch) {
    dispatch({type: actionTypes.START_LOADING})
    fetch(`${server.API_LOCATION}/artists/${artistName}/songs`)
    .then(res => res.json())
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
    songs
  }
}
