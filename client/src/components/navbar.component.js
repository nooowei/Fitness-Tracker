import React, { Component } from 'react'; //used for loding components
import { Link } from 'react-router-dom';  //linking different routes
import { connect } from 'react-redux'
import {userSignOut} from '../actions/userAction';


//create a class with the class name being the name of Component
class NavbarReact extends Component {
  checkSignedIn(){
    let signInButton = <li className="navbar-item"><Link class="nav-link" to="/login">Sign In</Link></li>;

    let signOutButton = 
    <React.Fragment>
      <li className="navbar-item"><Link className="nav-link" to="/create">Create New Log</Link></li>
      <li className="navbar-item"><Link className="nav-link" to="/dashboard">Profile</Link></li>
      <li className="navbar-item"><a className="nav-link" href="/">Sign Out</a></li>
    </React.Fragment>
    

    const isSignedIn = (this.props.user.username === "") ? signInButton : signOutButton;
    return isSignedIn;
  }
  
  // all Components must return something
  // <Link> here does the same thing as <a> but for react-router
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">FitnessTracker</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link class="nav-link" to="/">View All</Link>
            </li>
            {this.checkSignedIn()}
          </ul>
        </div>
        </nav>
    );
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
  userSignOut: () => dispatch(userSignOut())
})

// mapDispatchToProps can be replaced by imported actions
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarReact)
