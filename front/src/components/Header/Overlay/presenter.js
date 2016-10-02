import React from 'react'

export default class Overlay extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={this.props.header.active ? 'header-overlay-on' : 'header-overlay-off'} />
    )
  }
}
