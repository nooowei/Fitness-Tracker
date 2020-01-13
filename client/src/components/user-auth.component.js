import React, { Component } from 'react';
// import  { Redirect } from 'react-router-dom'
import axios from 'axios';
// import Dashboard from './dashboard.component';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// axios is used to send HTTP request

import { connect } from 'react-redux'

import {userSignIn} from '../actions/userAction';

class UserLogin extends Component {
  // in JS, we always need to call super() when defining the constructor of a subclass
  constructor(props) {
    super(props);

    // these lines are binding the keyword "this" to these methods
    // so "this" will refer to the right thing
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.renderRedirect = this.renderRedirect.bind(this);

    // state is how we create variables in React, when we update state, page will update with new values.
    // coorespond to mongoDB property
    this.state = {
      email: '',
      password: '',
      msg: ''
    }
  }

  // Event handler function that calls on "setState()" method to change the state
  // functions are called from the page,  e.target is the text box, value is the innerHTML
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    // this method will prevent the default submition behaviour from HTML
    // and will use the method we defined underneath instead
    e.preventDefault();

    // we can use the conventional way to create variables in methods
    // if the variable will only be used within the method
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user);

    //this is important for the setState() method to work in axios
    var self = this;

    //send POST request to backend when submit
    axios.post('/login', user)
      .then(function(res){
        // console.log("Axios response res object from POST /login route: ");
        // console.log(res.data.msg);  //working
        // if there isn't a error, change the redirect state to true, and redirect user.
        // console.log("user-auth-comp, line 95, res.data.user");
        // console.log(res.data.user);
        if(typeof(res.data.msg) === 'undefined'){

          //NOTE: we will dispatch the SIGN_IN action here
          const user = {
            token: res.data.token,
            id: res.data.user.id,
            username: res.data.user.username,
            email: res.data.user.email
          }

          // dispatch the SIGN_IN action
          self.props.userSignIn(user);


          // // clear the form
          // self.setState({
          //   email: '',
          //   password: '',
          //   msg: ''
          //   // redirect: true
          // });

          self.props.history.push('/dashboard');
          // window.location = '/dashboard';

        }
        else{
         self.setState({msg: res.data.msg});
        }
        // console.log('this is the user from post /login');
        // console.log(res.data.user.id);
        // //if log in successful, redirect to dashboard
        // return <Redirect to='/create'/>
    });

  }

  render() {
    return (
    <div>
      <h3>Sign In</h3>
      {/* set Event handler function */}
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}

            />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input  type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>

        <div className="form-group">
          <div className="alert alert-light" role="alert">
            {this.state.msg}
          </div>
          <input type="submit" value="Sign In" className="btn btn-primary" />
          {/* {this.renderRedirect()} */}
        </div>
      </form>
      <p>Don't have an account? Click here to <a href='/user'>Register</a>.</p>
    </div>
    )
  }
}


const mapStateToProps = (state) => (
  //this returns an object containing data needed by this connected component
  // each field in this object will become a prop of this connected component
    {
      user: state.user
    }
)

const mapDispatchToProps = dispatch => ({
  userSignIn: user => dispatch(userSignIn(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin)