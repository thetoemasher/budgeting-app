import React, { useState, useEffect  } from 'react';
import axios from 'axios'
import {emailCheck, passwordCheck} from '../../_utils/formValidation'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
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

  const handleRegister = async (e) => {
    e.preventDefault()
    let emailTest = emailCheck(email)
    let passwordTest = passwordCheck(password)

    if(!email || !emailTest) {
    return setError("Must enter a valid email")
    }
    if(!password || !passwordTest) {
        return setError("Password must include be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number")
    }
    if(password !== confirm_password) {
        return setError("Passwords don't match")
    }
    if(!first_name || !last_name) {
        return setError("Please enter in a first and last name")        
    }
    if(email && password && confirm_password && first_name && last_name) {
      const body = {email, password, confirm_password, first_name, last_name}
      const registerRes = await axios.post('/auth/register', body)
      if(registerRes.data.user) {
        props.setUser(registerRes.data.user)
        props.history.push('/dashboard')
      } else if (registerRes.data.error) {
        console.log('asdfadsf', registerRes.data.error)
        setError(registerRes.data.error)
      }
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <form>
          <input name='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='Email'/>
          <input name='password' onChange={e => setPassword(e.target.value)} value={password} placeholder='Password'/>
          <input name='confirm_password' onChange={e => setConfirm_password(e.target.value)} value={confirm_password} placeholder='Confirm Password'/>
          <input name='first_name' onChange={e => setFirst_name(e.target.value)} value={first_name} placeholder='First Name'/>
          <input name='last_name' onChange={e => setLast_name(e.target.value)} value={last_name} placeholder='Last Name'/>
          <button onClick={handleRegister}>Register</button>
      </form>
      <Link to='/'><button>Login</button></Link>

    </div>
  );
}

export default withRouter(Register);
