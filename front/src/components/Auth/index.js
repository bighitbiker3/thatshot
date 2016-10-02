import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Header from './presenter'

function mapStateToProps (state, props) {
  console.log(state, 'STATE IN HEADER')
  const header = state.header
  return {
    header
  }
}

export default connect(mapStateToProps)(Header)
