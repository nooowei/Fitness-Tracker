import React, { Component } from 'react';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// axios is used to send HTTP request

export default class CreateExercise extends Component {
  // in JS, we always need to call super() when defining the constructor of a subclass
  constructor(props) {
    super(props);

    // these lines are binding the keyword "this" to these methods
    // so "this" will refer to the right thing
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    // this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // state is how we create variables in React, when we update state, page will update with new values.
    // coorespond to mongoDB property
    this.state = {
      username: '',
      password: ''
    //   duration: 0,
    //   date: new Date(),
    //   users: []
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
      username: this.state.username,
      password: this.state.password
    //   duration: this.state.duration,
    //   date: this.state.date
    }

    console.log(user);

    //send POST request to backend when submit
    axios.post('/login', user)
      .then(res => console.log(res.data));

    // // take the user back to homepage ("/").
    // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Sign In</h3>
      {/* set Event handler function */}
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
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
          <input type="submit" value="Sign In" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
