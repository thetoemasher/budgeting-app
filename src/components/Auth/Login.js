import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {emailCheck, passwordCheck} from '../../_utils/formValidation'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

function Login (props) {
  const [email, setEmail] = useState('tomeschcody@gmail.com')
  const [password, setPassword] = useState('Concert06')
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      const userRes = await axios.get('/auth/user')
      if(userRes.data.user) {
        props.setUser(userRes.data.user) 
        props.history.push('/dashboard')
      }
    }
    fetchData()
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    let trimEmail = email.trim();
    let emailTest = emailCheck(trimEmail)
    let passwordTest = passwordCheck(password)

    if(!trimEmail || !emailTest) {
    return setError("Must enter a valid email")
    }
    if(!password || !passwordTest) {
      return setError("Password must include be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number")
    }
    if(email && password) {
      const loginRes = await axios.post('/auth/login', {email: trimEmail, password})
        if(loginRes.data.user) {
          props.setUser(loginRes.data.user)
          props.history.push('/dashboard')
        } else if (loginRes.data.error) {
          console.log('asdfadsf', loginRes.data.error)
          setError(loginRes.data.error)
        }
    }
  }
  return (
    <div>
      {error && <p>{error}</p>}
      <form>
          <input name='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='Email'/>
          <input name='password' onChange={e => setPassword(e.target.value)} value={password} placeholder='Password'/>
          <button onClick={handleLogin}>Login</button>
      </form>
      <Link to='/register'><button>Register</button></Link>


    </div>
  );
}

export default withRouter(Login);
