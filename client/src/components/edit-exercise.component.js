import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import {loadLogs} from '../actions/userAction';

class EditExercise extends Component {
  constructor(props) {
    super(props);

    // this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    // this.props.match.params.id gets the id directly from the URL
    axios.get('/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    // axios.get('/users')
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         users: response.data.map(user => user.username),
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

  }

  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   })
  // }

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
    e.preventDefault();

    const exercise = {
      username: this.props.user.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    //update the user data by reloading the user exercises
    axios.post('/exercises/user', {username:this.props.user.username})
    .then(res => {
      // console.log(res.data);
      this.props.loadLogs(res.data);
    })
    .catch((error) => {
      console.log(error);
    })

    axios.post('/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    

    this.props.history.push('/dashboard');
  }

  render() {
    return (
    <div align="left">
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username: </label>
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
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
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

const mapDispatchToProps = dispatch => ({
  loadLogs: logs => dispatch(loadLogs(logs))
})

// mapDispatchToProps can be replaced by imported actions
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExercise)
