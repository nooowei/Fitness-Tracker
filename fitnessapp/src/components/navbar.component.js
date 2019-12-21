import React, { Component } from 'react'; //used for loding components
import { Link } from 'react-router-dom';  //linking different routes

//create a class with the class name being the name of Component
export default class Navbar extends Component {

  // all Components must return something
  // <Link> here does the same thing as <a> but for react-router
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
