import reducer from '../header.subscribe'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initialState = {
  email: ''
}

describe('Header Subscribe', () => {
  it('should return initial state', () => {
    expect(reducer(initialState, {})).to.deep.equal(initialState)
  })

  it('should respond to text input', () => {
    expect(reducer(initialState, {type: actionTypes.SUBSCRIBE_CHANGE, email: 'elliott@gmail.com'})).to.deep.equal({email: 'elliott@gmail.com'})
  })

  it('should return same state on submit', () => {
    expect(reducer(initialState, {type: actionTypes.SUBSCRIBE_SUBMIT})).to.deep.equal(initialState)
  })

  it('should clear text input', () => {
    reducer(initialState, {type: actionTypes.SUBSCRIBE_CHANGE, email: 'elliott@gmail.com'})
    expect(reducer(initialState, {type: actionTypes.CLEAR_SUBSCRIBE_INPUT})).to.deep.equal(initialState)
  })
})
