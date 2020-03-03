import React from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

async function logout(props) {
    const logoutRes = await axios.get('/auth/logout')
    props.setUser(null)
    props.history.push('/')
}

function Nav(props) {
    const {user} = props
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

export default withRouter(Nav)