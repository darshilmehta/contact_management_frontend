import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import HomePage from "./components/homePage/HomePage";
import AddContactForm from "./components/forms/AddContactForm";
import EditContactForm from "./components/forms/EditContactForm";
import ErrorPage from "./components/errorPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route 
              exact 
              path="/" 
              component={HomePage} 
            />
            <Route 
              exact 
              path="/edit/:id" 
              component={EditContactForm} 
            />
            <Route 
              exact 
              path="/add" 
              component={AddContactForm} 
            />
            <Route 
              exact 
              path="/login" 
              component={Login} 
            />
            <Route 
              exact 
              path="/register" 
              component={Register} 
            />
            <Route
              path="/"
              component={ErrorPage}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
