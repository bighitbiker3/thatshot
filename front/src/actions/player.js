import * as actionTypes from '../constants/actionTypes'

export function toggleTrack (track, playOrPause) {
  return (dispatch, getState) => {
    const player = document.getElementById('audio')
    const isPlaying = !player.paused
    const { activeTrack } = getState().player
    if (track === activeTrack || !track) {
      if (isPlaying) player.pause()
      else player.play()
      dispatch(toggleTrackAction(activeTrack, !isPlaying))
    } else {
      dispatch(toggleTrackAction(track, true))
    }
  }
}

function toggleTrackAction (activeTrack, nowPlaying) {
  return {
    type: actionTypes.TOGGLE_TRACK,
    payload: { activeTrack, nowPlaying }
  }
}
