import reducer from '../player'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initialState = {
  nowPlaying: false,
  activeTrack: null
}

describe('Player reducer', () => {
  it('should return init state with no action recognized', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should set the track and set playing to true with no track already playing', () => {
    expect(reducer(initialState, {type: actionTypes.TOGGLE_TRACK, track: {name: 'New Track'}, nowPlaying: true})).to.deep.equal({
      nowPlaying: true,
      activeTrack: {
        name: 'New Track'
      }
    })
  })

  it('should set now playing to false if a track is already playing', () => {
    const currentlyPlaying = {nowPlaying: true, activeTrack: {name: 'New Track'}}
    expect(reducer(currentlyPlaying, {type: actionTypes.TOGGLE_TRACK})).to.deep.equal({
      nowPlaying: false,
      activeTrack: {
        name: 'New Track'
      }
    })
    // Simulate toggle
    expect(reducer(reducer(currentlyPlaying, {type: actionTypes.TOGGLE_TRACK}), {type: actionTypes.TOGGLE_TRACK})).to.deep.equal({
      nowPlaying: true,
      activeTrack: {
        name: 'New Track'
      }
    })
  })

  it('should set and play a new track if it doesnt match current activeTrack', () => {
    const currentlyPlaying = {nowPlaying: true, activeTrack: {name: 'New Track'}}
    expect(reducer(currentlyPlaying, {type: actionTypes.TOGGLE_TRACK, nowPlaying: true, track: {name: 'lol'}})).to.deep.equal({
      nowPlaying: true,
      activeTrack: {
        name: 'lol'
      }
    })
  })
})
