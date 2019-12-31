import React, { Component } from 'react'; //used for loding components
// import { Link } from 'react-router-dom';  //linking different routes
import Navbar from 'react-bootstrap/Navbar'; 
import Nav from 'react-bootstrap/Nav'; 
// import Image from 'react-bootstrap/Image'

//create a class with the class name being the name of Component
export default class NavbarReact extends Component {

  // all Components must return something
  // <Link> here does the same thing as <a> but for react-router
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          Fitness Tracker
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Exercises</Nav.Link>
          <Nav.Link href="/create">Create New Log</Nav.Link>
          <Nav.Link href="/user">Create New User</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
