import React from 'react'
import ReactDOM from 'react-dom'

class Login extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
        <div className='login'>
            <input onChange={this.props.loginEmailFormChange} ref='email' placeholder='Email' type='email' />
            <input onChange={this.props.loginPasswordFormChange} ref='password' placeholder='Password' type='password' />
            <button onClick={() => this.props.loginSubmit(this.props.login.email, this.props.login.password)}>Login</button>
        </div>
    )
  }
}

export default Login
