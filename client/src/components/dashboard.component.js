import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

// this Exercise-component exists within the exercises-list-component
// this is an Functional React Component, it doesn't have state, and lifecycle methods.
// used for accepting props, and returning JSX
// const Exercise = props => (
  function Exercise(props){
    // console.log(props.exercise._id);
    return(
      <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
          {/* <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a> */}
          <Button href={"/edit/"+props.exercise._id}>Edit</Button> | <Button onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</Button>
        </td>
      </tr>
    )
  }

// this is a class component
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
    console.log(props);
    console.log(props.userId);
  }

  componentDidMount() {
    axios.get('/exercises')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

    // axios.get('/users/user')
    //     .then(res => {
    //         // console.log('logged in user data');
    //         console.log(res.data)
    //     })
    //     .catch((err) => 
    //         console.log(err)
    //     )
  }

  deleteExercise(id) {
    axios.delete('/exercises/'+id)
      .then(response => { console.log(response.data)});

    // after deleting this exercise from the databse,
    // we also need to delete it from the page
    this.setState({
      // only render the item if the element id is not equal to the id deleted
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    // for every element called currentexercise in the exercises array
    // it will return an Exercise Component
    return this.state.exercises.map(currentexercise => {
      // each component will be a row of a table
      // while calling the Exercise Component, we passed in these 3 keys as "props", which will be used in the Exercise Component
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  // the body here will call the "exerciseList() method"
  render() {
    return (
      <div>
        <h3>Exercise Log</h3>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
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
