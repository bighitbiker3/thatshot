import * as actionTypes from '../constants/actionTypes';

export function toggleTrack(track) {
  return {
    type: actionTypes.TOGGLE_TRACK,
    track
  }
}
