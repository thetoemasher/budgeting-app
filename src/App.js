import React, { Component } from 'react';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom'
import Login from './components/Auth/Login.js'
import Dashboard from './components/Dashboard/Dashboard'
import LoginCheck from './components/Auth/LoginCheck.js'
// import Nav from './components/Nav.js'
import Register from './components/Auth/Register';

class App extends Component {
  render() {
    const {pathname} = this.props.location
    return (
      <div>
        {/* {pathname !== '/' && pathname !== '/register' && <Nav/>} */}
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <LoginCheck>
            <Route path='/dashboard' component={Dashboard}/>
          </LoginCheck>
        </Switch>
      </div>
    );
  }
}



export default withRouter(App);
