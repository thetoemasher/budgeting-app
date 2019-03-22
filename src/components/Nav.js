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
    console.log(props)
    return (
        <div>
            <h1>Budgeting App Woo</h1>
            {
                user ? 
                <button onClick={() => logout(props)}>Logout</button> :
                <Link to='/'><button>Login</button></Link>
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