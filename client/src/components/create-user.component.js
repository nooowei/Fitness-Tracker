import React, { Component } from 'react';
import axios from 'axios';
// axios is used to send HTTP request

export default class CreateUser extends Component {
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

    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }

    console.log(user);
    //reference for this to work in axios
    var self = this;

    // sending a HTTP POST request to the URL end point
    // which is expecting a JSON object, that we put in as a second argument
    axios.post('/users/add', user)
      .then(function(res){
        if(typeof(res.data.msg) === 'undefined'){
          self.setState({
              username: '',
              password: '',
              email: '',
              msg: ''
            });

          window.location = '/';
        }
        self.setState({msg: res.data.msg});
      });

    // // this is used to reset the username field to blank after submission
    // this.setState({
    //   username: '',
    //   password: '',
    //   email: ''
    // })

    // // redirect after adding auth gate to dashboard
    // window.location = '/';
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
