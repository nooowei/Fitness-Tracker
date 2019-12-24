import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// this Exercise-component exists within the exercises-list-component
// this is an Functional React Component, it doesn't have state, and lifecycle methods.
// used for accepting props, and returning JSX
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

// this is a class component
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('/exercises')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
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
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
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
        </table>
      </div>
    )
  }
}
