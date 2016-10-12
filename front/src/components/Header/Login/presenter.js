import React from 'react'
import ReactDOM from 'react-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.loginSubmit = this.props.loginSubmit.bind(this)
  }

  render () {
    return (
        <div className='login'>
          <form onSubmit={this.loginSubmit}>
            <input onChange={this.props.loginEmailFormChange} ref='email' placeholder='Email' type='email' />
            <input onChange={this.props.loginPasswordFormChange} ref='password' placeholder='Password' type='password' />
            <button type="submit">Login</button>
          </form>
        </div>
    )
  }
}

export default Login
