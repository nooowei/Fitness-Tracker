import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// axios is used to send HTTP request

export default class CreateExercise extends Component {
  // in JS, we always need to call super() when defining the constructor of a subclass
  constructor(props) {
    super(props);

    // these lines are binding the keyword "this" to these methods
    // so "this" will refer to the right thing
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // state is how we create variables in React, when we update state, page will update with new values.
    // coorespond to mongoDB property
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  // this is a React lifecycle method, will automatically be called by React
  // called right before anything is displayed on the page.
  componentDidMount() {
    axios.get('/users')
      .then(response => {
        //checking there is at least 1 user in database
        if (response.data.length > 0) {
          this.setState({
            // data will be an array, for each user we will return their username
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  // Event handler function that calls on "setState()" method to change the state
  // functions are called from the page,  e.target is the text box, value is the innerHTML
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    // this method will prevent the default submition behaviour from HTML
    // and will use the method we defined underneath instead
    e.preventDefault();

    // we can use the conventional way to create variables in methods
    // if the variable will only be used within the method
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('/exercises/add', exercise)
      .then(res => console.log(res.data));

    // take the user back to homepage ("/").
    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      {/* set Event handler function */}
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
