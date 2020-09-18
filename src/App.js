import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Book from './Components/Book/Book';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import NoPathFound from './Components/NoPathFound/NoPathFound';
import Hotel from './Components/Hotel/Hotel';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();




function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <p> name: {loggedInUser.name} </p>
      <p> email: {loggedInUser.email} </p>
      
      <Router>
      <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/book/:name">
            <Book></Book>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/hotel">
            <Hotel></Hotel>
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoPathFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
