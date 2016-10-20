import reducer from '../stream'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initialState = {
  show: 'savantTracks'
}

describe('Stream reducer', () => {
  it('should return initialState at start', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should return initialState on unrecognized action', () => {
    expect(reducer(initialState, {type: actionTypes.LOL})).to.deep.equal(initialState)
  })

  it('should show user tracks', () => {
    expect(reducer(initialState, {type: actionTypes.SHOW_USER_TRACKS})).to.deep.equal({show: 'userTracks'})
  })

  it('should show savant tracks', () => {
    expect(reducer(initialState, {type: actionTypes.SHOW_SAVANT_TRACKS})).to.deep.equal({show: 'savantTracks'})
  })
})
