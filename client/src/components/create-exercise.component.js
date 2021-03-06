import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux'

class CreateExercise extends Component {
  // in JS, we always need to call super() when defining the constructor of a subclass
  constructor(props) {
    super(props);

    // these lines are binding the keyword "this" to these methods
    // so "this" will refer to the right thing
    // this.onChangeUsername = this.onChangeUsername.bind(this);
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


  // Event handler function that calls on "setState()" method to change the state
  // functions are called from the page,  e.target is the text box, value is the innerHTML

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
      username: this.props.user.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log("just added this exercise: ");
    console.log(exercise);

    axios.post('/exercises/add', exercise)
      .then(res => console.log(res.data));

    // take the user back to homepage ("/").
    this.props.history.push('/dashboard');
  }

  render() {
    return (
    <div align="left">
      <h3>Create New Log</h3>
      {/* set Event handler function */}
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <br></br>
          <h5>User: {this.props.user.username}</h5>
          
        </div>
        <div className="form-group">
          <h5>Description: </h5>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <h5>Duration (in minutes): </h5>
          <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <h5>Date: </h5>
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

const mapStateToProps = (state) => (
  //this returns an object containing data needed by this connected component
  // each field in this object will become a prop of this connected component
    {
      user: state.user
    }
)

// mapDispatchToProps can be replaced by imported actions
export default connect(
  mapStateToProps
)(CreateExercise)
