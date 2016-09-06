import React from 'react';
import ReactDOM from 'react-dom';


class Login extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
        <div className="login">
          <p>Login</p>
            <input onChange={this.props.loginEmailFormChange} ref="email" type="email"/>
            <input onChange={this.props.loginPasswordFormChange} ref="password" type="password"/>
            <button onClick={() => this.props.loginSubmit(this.props.login.email, this.props.login.password)}>Submit</button>
        </div>
    )
  }
}

export default Login;
