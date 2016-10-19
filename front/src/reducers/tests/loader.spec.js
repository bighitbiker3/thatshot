import reducer from '../loader'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initialState = false

describe('Loader Reducer', () => {
  it('should return initial state if no action recognized', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState)
  })

  it('should return false with stop loading action', () => {
    expect(reducer(initialState, {type: actionTypes.STOP_LOADING})).to.deep.equal(false)
  })

  it('should return true with start loading action', () => {
    expect(reducer(initialState, {type: actionTypes.START_LOADING})).to.deep.equal(true)
  })
})
