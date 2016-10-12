import React from 'react'
import ReactDOM from 'react-dom'

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.signUpSubmit = this.props.signUpSubmit.bind(this)
  }

  render () {
    return (
        <div className='signup'>
          <form onSubmit={this.signUpSubmit}>
            <input onChange={this.props.signUpEmailFormChange} ref='email' placeholder='Email' type='email' />
            <input onChange={this.props.signUpPasswordFormChange} ref='password' placeholder='Password' type='password' />
            <input onChange={this.props.signUpUsernameChange} ref='username' placeholder='Username' type='text' />
            <button type="submit">Sign Up</button>
          </form>

        </div>
    )
  }
}

export default SignUp
