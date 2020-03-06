import React, { useState } from 'react';
import './App.css';
import {Switch, Route, withRouter} from 'react-router-dom'
import Login from './components/Auth/Login.js'
import Dashboard from './components/Dashboard/Dashboard.js'
import LoginCheck from './components/Auth/LoginCheck.js'
import Nav from './components/Nav.js'
import Register from './components/Auth/Register';

function App (props) {
  const [user, setUser] = useState(null)
    const {pathname} = props.location
    return (
      <div>
        {pathname !== '/' && pathname !== '/register' && <Nav user={user} setUser={setUser}/>}
        <Switch>
          <Route exact path='/' render={() => <Login user={user} setUser={setUser}/>}/>
          <Route exact path='/register' render={() => <Register user={user} setUser={setUser}/>}/>
          <LoginCheck user={user} setUser={setUser}>
            <Route path='/dashboard' render={() => <Dashboard user={user} setUser={setUser}/>}/>
          </LoginCheck>
        </Switch>
      </div>
    );
}



export default withRouter(App);
