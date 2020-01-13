import React, { Component } from 'react';
import axios from 'axios';
// axios is used to send HTTP request

import { connect } from 'react-redux'

import {userRegister} from '../actions/userAction';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      password: '',
      email: '',
      msg: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }

    //reference for this to work in axios
    var self = this;

    // sending a HTTP POST request to the URL end point
    // which is expecting a JSON object, that we put in as a second argument
    axios.post('/users/add', newUser)
      .then(function(res){
        if(typeof(res.data.msg) === 'undefined'){

          const user = {
            token: res.data.token,
            id: res.data.user.id,
            username: res.data.user.username,
            email: res.data.user.email
          }

          console.log("create-user-comp, line 77, res.data");
          console.log(res.data);
          self.props.userRegister(user);

          self.props.history.push('/dashboard');
        }else{
          self.setState({msg: res.data.msg});
        }
      });

  }

  render() {
    return (
      <div>
        <h3>Create New Account</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
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
            <label>Email: </label>
            <input  type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group">
            <div className="alert alert-light" role="alert">
              {this.state.msg}
            </div>
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
        <p>Already have an account? Click here to <a href='/login'>Sign In</a>.</p>
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
  userRegister: user => dispatch(userRegister(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)