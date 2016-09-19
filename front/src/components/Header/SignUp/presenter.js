import React from 'react';
import ReactDOM from 'react-dom';


class SignUp extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    return (
        <div className="signup">
          <p>Sign Up</p>
            <input onChange={this.props.signUpEmailFormChange} ref="email" placeholder="Email" type="email"/>
            <input onChange={this.props.signUpPasswordFormChange} ref="password" placeholder="Password" type="password"/>
            <input onChange={this.props.signUpUsernameChange} ref="username" placeholder="Username" type="text"/>
            <button onClick={() => this.props.signUpSubmit(this.props.signup.email, this.props.signup.password, this.props.signup.username)}>Submit</button>
        </div>
    )
  }
}

export default SignUp;
