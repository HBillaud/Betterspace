import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp'
import HomePage from './components/HomePage';
import LogIn from './components/LogIn/LogIn';

function AppRouter() {
  return (
    <Router>
       <div>
         <Route path="/" exact component={LogIn} />
         <Route path="/signup" exact component={SignUp} />
         <Route path="/home" exact component={HomePage} />
       </div>
     </Router>
  );
}

export default AppRouter;
