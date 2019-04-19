import React, { Component } from 'react';
import axios from 'axios'
import {updateStore} from '../redux/reducer'
import {connect} from 'react-redux'
import {emailCheck, passwordCheck} from '../_utils/formValidation'
import {Link} from 'react-router-dom'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: 'tomeschcody@gmail.com',
            password: 'Password06',
            error: ''
        }
    }

    componentDidMount() {
      axios.get('/auth/user').then(results => {
        if(results.data.user) {
          this.props.updateStore({user: results.data.user})
          this.props.history.push('/dashboard')
        }
      })
    }

    handleInput = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleLogin = (e) => {
      e.preventDefault()
      const {email, password} = this.state
      let emailTest = emailCheck(email)
      let passwordTest = passwordCheck(password)

      if(!email || !emailTest) {
        return this.setState({error: "Must enter a valid email"})
      }
      if(!password || !passwordTest) {
        return this.setState({error: "Password must include be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number"})
      }
      if(email && password) {
        axios.post('/auth/login', this.state).then(results => {
          if(results.data.user) {
            this.props.updateStore({user: results.data.user})
            this.props.updateStore({months: results.data.months})
            this.props.history.push('/dashboard')
          } else if (results.data.error) {
            this.setState({error: results.data.error})
          }
        })

      }
    }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form>
            <input name='email' onChange={this.handleInput} value={this.state.email} placeholder='Email'/>
            <input name='password' onChange={this.handleInput} value={this.state.password} placeholder='Password'/>
            <button onClick={this.handleLogin}>Login</button>
        </form>
        <Link to='/register'><button>Register</button></Link>


      </div>
    );
  }
}

export default connect(null, {updateStore})(Login);
