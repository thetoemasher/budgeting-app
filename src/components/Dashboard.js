import React, { Component } from 'react';
import Categories from './Categories'
import Payments from './Payments'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            currentMonth: ''
        }
    }
    componentDidMount() {
        this.getCurrentMonth()
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
            <h1>Monthly Budget for {currentMonth}</h1>
            <Categories />
            <Payments />
        </div>
    );
  }
}

export default Dashboard;
