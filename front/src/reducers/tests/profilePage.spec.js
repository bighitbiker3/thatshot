import reducer from '../profilePage'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initialState = {
  profileTracks: {
    upvoted: [],
    posted: []
  },
  showSettings: false
}

describe('Profile Page', () => {
  it('should return state if no action/state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should return state if unrecognized action', () => {
    expect(reducer(initialState, {type: actionTypes.LOLLLL})).to.deep.equal(initialState)
  })

  it('should set profile page tracks', () => {
    const actionNoPosted = {type: actionTypes.SET_PROFILE_TRACKS, upVotedTracks: [{name: 'cool'}]}
    const actionNoUpvoted = {type: actionTypes.SET_PROFILE_TRACKS, postedTracks: [{name: 'coolPosted!'}]}
    const actionBoth = {type: actionTypes.SET_PROFILE_TRACKS, upVotedTracks: [{name: 'cool'}], postedTracks: [{name: 'Posteddd'}]}
    expect(reducer(initialState, actionNoPosted)).to.deep.equal({
      profileTracks: {
        upvoted: [{name: 'cool'}],
        posted: []
      },
      showSettings: false
    })
    expect(reducer(initialState, actionNoUpvoted)).to.deep.equal({
      profileTracks: {
        upvoted: [],
        posted: [{name: 'coolPosted!'}]
      },
      showSettings: false
    })
    expect(reducer(initialState, actionBoth)).to.deep.equal({
      profileTracks: {
        upvoted: [{name: 'cool'}],
        posted: [{name: 'Posteddd'}]
      },
      showSettings: false
    })
  })

  it('should toggleSettings', () => {
    expect(reducer(initialState, {type: actionTypes.TOGGLE_SETTINGS})).to.deep.equal({
      profileTracks: {
        upvoted: [],
        posted: []
      },
      showSettings: true
    })
    // Simulate Toggle
    expect(reducer(reducer(initialState, {type: actionTypes.TOGGLE_SETTINGS}), {type: actionTypes.TOGGLE_SETTINGS})).to.deep.equal({
      profileTracks: {
        upvoted: [],
        posted: []
      },
      showSettings: false
    })
  })
})
