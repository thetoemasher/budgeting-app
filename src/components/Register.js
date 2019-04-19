import React, { Component } from 'react';
import axios from 'axios'
import {updateStore} from '../redux/reducer'
import {connect} from 'react-redux'
import {emailCheck, passwordCheck} from '../_utils/formValidation'
import {Link} from 'react-router-dom'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
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

    handleRegister = (e) => {
        e.preventDefault()
        const {email, password, confirm_password, first_name, last_name} = this.state
        let emailTest = emailCheck(email)
        let passwordTest = passwordCheck(password)

        if(!email || !emailTest) {
        return this.setState({error: "Must enter a valid email"})
        }
        if(!password || !passwordTest) {
            return this.setState({error: "Password must include be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number"})
        }
        if(password !== confirm_password) {
            return this.setState({error: "Passwords don't match"})
        }
        if(!first_name || !last_name) {
            return this.setState({error: "Please enter in a first and last name"})        
        }
        if(email && password && confirm_password && first_name && last_name) {
          axios.post('/auth/register', this.state).then(results => {
            if(results.data.user) {
              this.props.updateStore({user: results.data.user})
              this.props.updateStore({months: results.data.months})
              this.props.history.push('/dashboard')
            } else if (results.data.error) {
              console.log('asdfadsf', results.data.error)
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
            <input name='confirm_password' onChange={this.handleInput} value={this.state.confirm_password} placeholder='Confirm Password'/>
            <input name='first_name' onChange={this.handleInput} value={this.state.first_name} placeholder='First Name'/>
            <input name='last_name' onChange={this.handleInput} value={this.state.last_name} placeholder='Last Name'/>
            <button onClick={this.handleRegister}>Register</button>
        </form>
        <Link to='/'><button>Login</button></Link>

      </div>
    );
  }
}

export default connect(null, {updateStore})(Register);
