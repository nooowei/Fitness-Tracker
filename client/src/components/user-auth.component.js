import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// axios is used to send HTTP request

export default class UserLogin extends Component {
  // in JS, we always need to call super() when defining the constructor of a subclass
  constructor(props) {
    super(props);

    // these lines are binding the keyword "this" to these methods
    // so "this" will refer to the right thing
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);

    // state is how we create variables in React, when we update state, page will update with new values.
    // coorespond to mongoDB property
    this.state = {
      email: '',
      password: '',
      msg: '',
      redirect: false
    }
  }

  // this is a React lifecycle method, will automatically be called by React
  // called right before anything is displayed on the page.
  // probably don't need it since we dont need to load drowdown in this page
//   componentDidMount() {
//     axios.get('/users')
//       .then(response => {
//         //checking there is at least 1 user in database
//         if (response.data.length > 0) {
//           this.setState({
//             // data will be an array, for each user we will return their username
//             users: response.data.map(user => user.username),
//             username: response.data[0].username
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//   }

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

//   onChangeDuration(e) {
//     this.setState({
//       duration: e.target.value
//     })
//   }

//   onChangeDate(date) {
//     this.setState({
//       date: date
//     })
//   }

  onSubmit(e) {
    // this method will prevent the default submition behaviour from HTML
    // and will use the method we defined underneath instead
    e.preventDefault();

    // we can use the conventional way to create variables in methods
    // if the variable will only be used within the method
    const user = {
      email: this.state.email,
      password: this.state.password
    //   duration: this.state.duration,
    //   date: this.state.date
    }

    console.log(user);

    //this is important for the setState() method to work in axios
    var self = this;

    //send POST request to backend when submit
    axios.post('/login', user)
      .then(function(res){
        // console.log("Axios response res object from POST /login route: ");
        // console.log(res.data.msg);  //working
        if(typeof(res.data.msg) === 'undefined'){
          self.setState({
            email: '',
            password: '',
            msg: '',
            redirect: true
          });
          // console.log("got to this point");
          
          
        }
        self.setState({msg: res.data.msg});
        // //if log in successful, redirect to dashboard
        // return <Redirect to='/create'/>
    });

    // // take the user back to homepage ("/").
    // window.location = '/';
  }

  //function to check if page will redirect
  renderRedirect = () => {
    if (this.state.redirect) {
      // this.setState({redirect: false});
      console.log("this.state.redirect is " + this.state.redirect);
      return <Redirect to='/create' />
    }
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
          {/* <p>{this.state.msg}</p> */}
          <div className="alert alert-light" role="alert">
            {this.state.msg}
          </div>
          <input type="submit" value="Sign In" className="btn btn-primary" />
          {this.renderRedirect()}
        </div>
      </form>
      <p>Don't have an account? Click here to <a href='/user'>Register</a>.</p>
    </div>
    )
  }
}
