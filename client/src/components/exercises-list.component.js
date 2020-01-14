import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux'

import {loadUsers, loadLogs} from '../actions/userAction';

// this Exercise-component exists within the exercises-list-component
// this is an Functional React Component, it doesn't have state, and lifecycle methods.
// used for accepting props, and returning JSX
// const Exercise = props => (
  function Exercise(props){
    // console.log("Exercise View Component print: ");
    // console.log(props.exercise);
    return(
      <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        
      </tr>
    )
  }

// this is a class component
class ExercisesList extends Component {
  constructor(props) {
    super(props);

    // this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('/exercises')
      .then(res => {
        // console.log("ex-list-comp line53: ");
        // console.log(res.data);
        this.props.loadLogs(res.data);  // sent to global store - works, verified in Redux Dev Tool
      })
      .catch((error) => {
        console.log(error);
      })
    // console.log("ex-list-comp line60 this.props.logs: ")
    // console.log(this.props.logs) // got the 
  }

  

  // deleteExercise(id) {
  //   axios.delete('/exercises/'+id)
  //     .then(response => { console.log(response.data)});

  //   // replace this with rerendering instead of setState

  //   // // after deleting this exercise from the databse,
  //   // // we also need to delete it from the page
  //   // this.setState({
  //   //   // only render the item if the element id is not equal to the id deleted
  //   //   exercises: this.state.exercises.filter(el => el._id !== id)
  //   // })
  // }

  exerciseList() {
    // for every element called currentexercise in the exercises array
    // it will return an Exercise Component
    // console.log("ex-list-comp line 78: ");
    // console.log(this.props.logs)
    return this.props.logs.map(log => {
      // each component will be a row of a table
      // while calling the Exercise Component, we passed in these 3 keys as "props", which will be used in the Exercise Component
      return <Exercise exercise={log} key={log._id}/>;
    })
  }

  // the body here will call the "exerciseList() method"
  render() {
    return (
      <div>
        <h3>View All Logs</h3>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </Table>
      </div>
    )
  }
}

// the "state" argument being passed in is the ENTIRE Redux Store State
// passing global state.users to this class
// to be used as this.props.users in ExerciseList class
// ownProps is optional, if we want to pass this component's prop to the state
// anytime store is updated, mapStateToProps will be called
const mapStateToProps = (state) => (
  //this returns an object containing data needed by this connected component
  // each field in this object will become a prop of this connected component
    {
      userArr: state.userArr,
      logs: state.logs
    }
)

// give this class access to actions
// props.loadUsers(users)
// loadUsers saves userArr to store
// loadLogs saves logsArr to store
const mapDispatchToProps = dispatch => ({
  loadUsers: users => dispatch(loadUsers(users)),
  loadLogs: logs => dispatch(loadLogs(logs))
})


// mapDispatchToProps can be replaced by imported actions
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisesList)
