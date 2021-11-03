import React, { Component, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp'
import HomePage from './components/HomePage';
import LogIn from './components/LogIn/LogIn';

function PrivateRoute({component, path}: any) {
    console.log(sessionStorage.getItem('token'));
    return (
      <Route exact
      path={path}
      render ={() => localStorage.getItem('token') ?
      <div>
      {React.createElement(component)}
    </div>
    :
        <Redirect to={{pathname:'/login'}}/>}
        />
    )

}
function AppRouter() {
  return (
    <Router>
         <Route path="/login" exact >
           <LogIn />
          </Route>
          <Route path="/signup" exact >
           <SignUp />
          </Route>
          <PrivateRoute path="/home" exact component={HomePage}  /> 
     </Router>
  );
}

export default AppRouter;
