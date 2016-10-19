import * as actionTypes from '../constants/actionTypes'

const initialState = {
  profileTracks: {
    upvoted: [],
    posted: []
  },
  showSettings: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PROFILE_TRACKS: return setProfilePageTracks(state, action)
    case actionTypes.REMOVE_PROFILE_TRACKS: return removeProfileTracks(state, action)
    case actionTypes.TOGGLE_SETTINGS: return toggleSettings(state, action)

  }
  return state
}

function setProfilePageTracks (state, action) {
  let profileTracks = {}
  profileTracks.upvoted = action.upVotedTracks || []
  profileTracks.posted = action.postedTracks || []
  return {...state, profileTracks}
}

function removeProfileTracks (state, action) {
  let profileTracks = {}
  profileTracks.upvoted = []
  profileTracks.posted = []
  return {...state, profileTracks}
}

function toggleSettings (state, action) {
  return {...state, showSettings: !state.showSettings}
}
