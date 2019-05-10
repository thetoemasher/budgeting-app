import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateStore} from '../redux/reducer'
import {Link, withRouter} from 'react-router-dom'

function logout(props) {
    axios.get('/auth/logout').then(results => {
        props.updateStore({user: null})
        props.history.push('/')
    })
}

function Nav(props) {
    const {user} = props
    return (
        <div className='nav-header'>
            <h1>Budgeting App Woo</h1>
            {
                user ? 
                <p onClick={() => logout(props)}>Logout</p> :
                <Link to='/'><p>Login</p></Link>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, {updateStore})(Nav))