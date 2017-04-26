import Stream from './presenter'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as server from '../../constants/server'
import * as actionTypes from '../../constants/actionTypes'
import * as actions from '../../actions'
import nock from 'nock'
import { expect } from 'chai' // You can use any testing library

require('isomorphic-fetch')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('play button', () => {
  it('should play track', () => {
    const track = {id: 4, title: 'Good Song', link: 'http://google.com'}
    const expectedAction = {type: actionTypes.TOGGLE_TRACK, track}
    expect(actions.toggleTrack(track)).to.deep.equal(expectedAction)
  })
});