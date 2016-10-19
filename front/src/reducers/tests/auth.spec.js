import reducer from '../auth'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

describe('Authentication', () => {
  it('should return state if no action recognized', () => {
    expect(reducer(undefined, {})).to.deep.equal({})
  })

  it('should set the user on the state', () => {
    const user = {name: 'Elliott'}
    expect(reducer(undefined, {type: actionTypes.ME_SET, user})).to.deep.equal({user: user})
  })

  it('should set the user if theyve authed with SC', () => {
    const soundcloud = {id: 23432234, name: 'Elliott'}
    expect(reducer(undefined, {type: actionTypes.ME_SET_SOUNDCLOUD, soundcloud})).to.deep.equal({soundcloud})
  })

  it('should clear the state on logout', () => {
    const initState = {
      user: {name: 'Elliott'},
      soundcloud: {id: 123424}
    }
    expect(reducer(initState, {type: actionTypes.LOGOUT})).to.deep.equal({user: null, soundcloud: null})
  })

  it('should add newly liked sounds to the like array', () => {
    const newLike = 12321
    const initState = {
      soundcloud: {
        favorites: [1]
      }
    }
    expect(reducer(initState, {type: actionTypes.LIKE_ON_SOUNDCLOUD, trackId: newLike})).to.deep.equal({
      soundcloud: {
        favorites: [1, newLike]
      }
    })
  })
})
