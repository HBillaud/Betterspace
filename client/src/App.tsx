import React, { Component, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp'
import HomePage from './components/HomePage';
import LogIn from './components/LogIn/LogIn';
import ProfHomePage from './components/ProfHomePage';

function PrivateRoute({component, path}: any) {
    return (
      <Route exact
      path={path}
      render ={() => sessionStorage.getItem('token') !== null ?
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
          <PrivateRoute path={["/v1/student/:id","/"]} exact component={HomePage}  /> 
          <PrivateRoute path={["/v1/professor/:id"]} exact component={ProfHomePage} />
     </Router>
  );
}

export default AppRouter;
