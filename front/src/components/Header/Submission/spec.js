import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as server from '../../../constants/server'
import * as actionTypes from '../../../constants/actionTypes'
import * as actions from '../../../actions'
import nock from 'nock'
import { expect } from 'chai' // You can use any testing library
import Submission from './presenter'

require('isomorphic-fetch')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

function setup () {
  const props = {submission: {link: 'https://soundcloud.com/duvetcover/i-am', song: {}}}
  const enzymeWrapper = shallow(<Submission {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

xdescribe('Submission Spec', () => {
  it('fetches song from soundcloud', () => {
    const store = mockStore()
    return store.dispatch(actions.submissionSubmit('https://soundcloud.com/duvetcover/i-am', {user: {id: 1}}))
    .then(() => {
      expect(store.getActions()[0].type).to.equal('SUBMISSION_SUBMIT')
      expect(store.getActions()[0]).to.have.property('song')
    })
  })

  it('Renders Submission div', () => {
    const {enzymeWrapper} = setup()
    expect(enzymeWrapper.find('submission').hasClass('submission')).to.equal(true)
    expect(enzymeWrapper.find('input')).to.be.an('object')
    expect(enzymeWrapper.find('button')).to.be.an('object')
  })
})
