import React from 'react'

export default class Subscribe extends React.Component {
  constructor (props) {
    super(props)
    this.subscribeSubmit = this.props.subscribeSubmit.bind(this)
    this.subscribeFormChange = this.props.subscribeFormChange.bind(this)
  }

  render () {
    return (
      <div className="subscribe">
      <form onSubmit={this.subscribeSubmit}>
        <input onChange={this.subscribeFormChange} placeholder='Email Address' />
        <button type="submit">Subscribe</button>
      </form>
      </div>
    )
  }
}
