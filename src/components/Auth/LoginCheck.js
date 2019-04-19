import React, { Component } from 'react';
import axios from 'axios'
import {updateStore} from '../../redux/reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class LoginCheck extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false
        }
    }


    componentDidMount() {
        if(this.props.user) {
            return this.setState({loggedIn: true})
        }
        axios.get('/auth/user').then(results => {
            console.log(results.data)
            if(results.data.user) {
                this.props.updateStore({user: results.data.user})
                this.props.updateStore({months: results.data.months})
                this.setState({loggedIn: true})
            }
        })
    }

  render() {
    return (
      <div>
          {
              this.state.loggedIn ? 
              <div>
                  {this.props.children}
              </div> :
              <div>
                  You must be logged in to view this page
                  <Link to='/'>Login</Link>
              </div>
          }
        
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {updateStore})(LoginCheck);
