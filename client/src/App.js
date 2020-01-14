import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

//importing the components from the folder
import NavbarReact from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UserAuth from "./components/user-auth.component";
import Dashboard from "./components/dashboard.component";

// react-redux package binds react and redux together
import { Provider } from 'react-redux';
// store file is where we store the global state with redux
import store from './store';

// using Router to determind which component to load into the div
// the Provider Tag allows us to share and access state from components,
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <NavbarReact />
          <br/>
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
          <Route path="/login" component={UserAuth} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
