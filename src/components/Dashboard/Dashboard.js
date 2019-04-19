import React, { Component } from 'react';
// import Categories from './Categories'
// import Payments from './Payments'
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateStore} from '../../redux/reducer'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            currentMonth: ''
        }
    }
    componentDidMount() { 
        
    }
    
    getCurrentMonth() {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let currentMonth = months[new Date().getMonth()]
        this.setState({currentMonth})
    }

    handleInput = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

  render() {
    const {currentMonth} = this.state
    return (
        <div>
            <Sidebar currentMonth={currentMonth}/>
            <div>
                <h1>Monthly Budget for {currentMonth}</h1>
            </div>
        </div>
    );
  }
}

export default connect(null, {updateStore})(Dashboard);
