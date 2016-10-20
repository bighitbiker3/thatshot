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

xdescribe('Stream Component', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('fetches Savant tracks from the database', () => {
    const store = mockStore()
    return store.dispatch(actions.setSavantTracks())
    .then(() => {
      expect(store.getActions()[0]).to.be.an('object')
      expect(store.getActions()[0]).to.have.property('tracks')
    })
  })
  it('fetches User tracks from the database', () => {
    const store = mockStore()
    return store.dispatch(actions.setUserTracks())
    .then(() => {
      expect(store.getActions()[0]).to.be.an('object')
      expect(store.getActions()[0]).to.have.property('tracks')
    })
  })
})

describe('sync actions', () => {
  it('sends action for showing savant posts', () => {
    const expectedAction = {type: actionTypes.SHOW_SAVANT_TRACKS}
    expect(actions.showSavantTracks()).to.deep.equal(expectedAction)
  })
  it('sends action for showing user posts', () => {
    const expectedAction = {type: actionTypes.SHOW_USER_TRACKS}
    expect(actions.showUserTracks()).to.deep.equal(expectedAction)
  })
})
