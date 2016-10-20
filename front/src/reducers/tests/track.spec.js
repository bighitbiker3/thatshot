import reducer from '../track'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initialState = {
  savantTracks: [],
  userTracks: []
}

describe('Track reducer', () => {
  it('should return initialState on start', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should return initialState on unrecognized action', () => {
    expect(reducer(initialState, {type: actionTypes.LOL})).to.deep.equal(initialState)
  })

  it('should set savant tracks', () => {
    expect(reducer(initialState, {type: actionTypes.TRACKS_SET_SAVANT, tracks: [{name: 'Cool'}]})).to.deep.equal({
      savantTracks: [{name: 'Cool'}],
      userTracks: []
    })
  })

  it('should set user tracks', () => {
    expect(reducer(initialState, {type: actionTypes.TRACKS_SET_USER, tracks: [{name: 'Cool'}]})).to.deep.equal({
      savantTracks: [],
      userTracks: [{name: 'Cool'}]
    })
  })

  it('should recognize when sent single user track', () => {
    const alreadySetUserState = {savantTracks: [], userTracks: [{name: 'Cool'}]}
    expect(reducer(alreadySetUserState, {type: actionTypes.TRACKS_SET_USER, tracks: {name: 'Elliott'}})).to.deep.equal({
      savantTracks: [],
      userTracks: [{name: 'Cool'}, {name: 'Elliott'}]
    })
  })

  it('should upvote a tune on the front end when clicked', () => {
    const currentStateUserTracks = {savantTracks: [], userTracks: [{id: 1, name: 'Cool', upvotes: 1}]}
    const currentStateSavantTracks = {savantTracks: [{id: 12, name: 'Cool', upvotes: 1}], userTracks: [{id: 1, name: 'Cool', upvotes: 1}]}
    const actionToUpvote = {type: actionTypes.UPVOTE_TRACK, track: {id: 1, name: 'Cool', upvotes: 2}}
    const actionToUpvoteSavant = {type: actionTypes.UPVOTE_TRACK, track: {id: 12, name: 'Cool', upvotes: 2}}
    expect(reducer(currentStateUserTracks, actionToUpvote)).to.deep.equal({
      savantTracks: [],
      userTracks: [{id: 1, name: 'Cool', upvotes: 2}]
    })
    expect(reducer(currentStateSavantTracks, actionToUpvoteSavant)).to.deep.equal({
      savantTracks: [{id: 12, name: 'Cool', upvotes: 2}],
      userTracks: [{id: 1, name: 'Cool', upvotes: 1}]
    })
  })
  it('should return state if already upvoted', () => {
    const newState = {savantTracks: [], userTracks: [{id: 1, name: 'Cool', upvotes: 1}]}
    expect(reducer(newState, {type: actionTypes.ALREADY_UPVOTED})).to.deep.equal(newState)
  })
})