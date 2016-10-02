import React from 'react'

export default class Subscribe extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="subscribe">
        <input onChange={(e) => this.props.subscribeFormChange(e)} placeholder='Email Address' />
        <button onClick={() => this.props.subscribeSubmit(this.props.subscribe.email)}>Subscribe</button>
      </div>
    )
  }
}
