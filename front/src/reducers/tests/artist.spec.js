import reducer from '../artist'
import * as actionTypes from '../../constants/actionTypes'
import { expect } from 'chai'

const initState = {artistTracks: []}

describe('Artist State', () => {

  it('return default state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initState)
  })

  it('should handle gettings new tunes', () => {
    expect(reducer(initState, {type: actionTypes.TRACKS_SET_ARTIST, songs: [{title: 'Sick ass tune'}, {title: 'COOL'}]})).to.deep.equal({artistTracks: [{title: 'Sick ass tune'}, {title: 'COOL'}]})
  })
  
})
