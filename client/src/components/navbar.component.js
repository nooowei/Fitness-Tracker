import React, { Component } from 'react'; //used for loding components
import { Link } from 'react-router-dom';  //linking different routes
import Navbar from 'react-bootstrap/Navbar'; 
import Nav from 'react-bootstrap/Nav'; 
// import Image from 'react-bootstrap/Image'
import { BrowserView, MobileView} from "react-device-detect";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


//create a class with the class name being the name of Component
export default class NavbarReact extends Component {
  // constructor(props){
  //   super(props);

  // this.redirectHome = this.redirectHome.bind(this);
  // }

  // redirectHome(e){
  //   this.props.history.push('/')
  // }

  
  // all Components must return something
  // <Link> here does the same thing as <a> but for react-router
  render() {
    return (
      <React.Fragment>
        <BrowserView>
          <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">
                Fitness Tracker
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Link class="nav-link" to="/">View All</Link>
                {/* <Nav.Link onClick={() => this.redirectHome()}>Exercises</Nav.Link> */}
                <Link class="nav-link" to="/create">Create New Log</Link>
                <Link class="nav-link" to="/login">Sign In</Link>
              </Nav>
          </Navbar>
        </BrowserView>
        <MobileView>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Fitness Tracker</Navbar.Brand>
            <DropdownButton id="dropdown-basic-button" title="Menu" >
              <Dropdown.Item href="/">Exercises</Dropdown.Item>
              <Dropdown.Item href="/create">Create New Log</Dropdown.Item>
              {/* <Dropdown.Item href="/user">Create New User</Dropdown.Item> */}
              <Dropdown.Item href="/login">Sign In</Dropdown.Item>
            </DropdownButton>
          </Navbar>
        </MobileView>
      </React.Fragment>
    );
  }
}
