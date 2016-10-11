import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Loader from './presenter'

function mapStateToProps(state, props){
  const { loader, header } = state
  return {
    loader,
    header
  }
}

export default connect(mapStateToProps)(Loader)
