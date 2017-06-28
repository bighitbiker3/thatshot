import * as actionTypes from '../constants/actionTypes'
import * as server from '../constants/server'
import axios from 'axios'
import { trackSetSavant } from './track'
import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications'
const { notifSend } = notifActions

export function setArtistPageTracks (artistName, trackName) {
  return function (dispatch) {
    dispatch({type: actionTypes.START_LOADING})
    const url = trackName ? `${server.API_LOCATION}/artists/${artistName}/${trackName}` : `${server.API_LOCATION}/artists/${artistName}/songs`
    axios.get(url)
    .then(res => res.data)
    .then(songs => {
      dispatch(trackSetSavant({ songs }))
      dispatch({type: actionTypes.STOP_LOADING})
    })
    .catch(err => {
      dispatch({type: actionTypes.STOP_LOADING})
      dispatch(notifSend({message: 'Sorry, there was an error. Please try again' + err, kind: 'danger', dismissAfter: 1000}))
    })
  }
};
