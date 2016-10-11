import * as actionTypes from '../constants/actionTypes'

const initialState = {
  profileTracks: {
    upvoted: [],
    posted: []
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PROFILE_TRACKS: return setProfilePageTracks(state, action)
  }
  return state
}

function setProfilePageTracks (state, action) {
  let profileTracks = {}
  profileTracks.upvoted = action.upVotedTracks
  profileTracks.posted = action.postedTracks
  return {...state, profileTracks}
}
