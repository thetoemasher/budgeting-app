import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'


function LoginCheck(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        async function fetchData() {
            if(props.user) {
                setLoggedIn(true)
            } else {
                try {
                    const userRes = await axios.get('/auth/user')
                    props.setUser(userRes.data.user)
                    setLoggedIn(true)
                } catch (err) {
                    console.log('error', err)
                }
            }
        }
        fetchData()
    })

    return (
        <div>
            {
                loggedIn ? 
                <div>
                    {props.children}
                </div> :
                <div>
                    You must be logged in to view this page
                    <Link to='/'>Login</Link>
                </div>
            }
          
        </div>
      );
}

// class LoginCheck extends Component {
//     constructor() {
//         super()
//         this.state = {
//             loggedIn: false
//         }
//     }


//     componentDidMount() {
//         if(this.props.user) {
//             return this.setState({loggedIn: true})
//         }
//         axios.get('/auth/user').then(results => {
//             if(results.data.user) {
//                 this.props.updateStore({user: results.data.user})
//                 this.setState({loggedIn: true})
//             }
//         })
//     }

//   render() {
//     return (
//       <div>
//           {
//               this.state.loggedIn ? 
//               <div>
//                   {this.props.children}
//               </div> :
//               <div>
//                   You must be logged in to view this page
//                   <Link to='/'>Login</Link>
//               </div>
//           }
        
//       </div>
//     );
//   }
// }

export default withRouter(LoginCheck);
