import React, { Component } from 'react';
import Categories from './Categories/Categories'
// import Payments from './Payments'
import Sidebar from './Sidebar/Sidebar'
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
        axios.get('/api/months').then(results => {
            this.props.updateStore({months: results.data})
        })
        let {month, year} = this.getCurrentMonth()
        axios.get(`/api/months/03/2019`).then(results => {
            this.props.updateStore({currentMonth: results.data})
        })
        // axios.get(`/api/months/${month}/${year}`).then(results => {
        //     this.props.updateStore({currentMonth: results.data})
        // })
        axios.get('/api/categories').then(results => {
            this.props.updateStore({categories: results.data})
        })
    }
    
    getCurrentMonth() {
        let date = new Date()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return {
            month: month > 10 ? month : '0' + month,
            year
        }
    }

    handleInput = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

  render() {
    // console.log(this.props)
    const {monthly_categories, month_name, month_amount, month_total, month_diff} = this.props.currentMonth
    return (
        <div>
            {/* <Sidebar currentMonth={currentMonth}/> */}
            <div>
                <h1>Monthly Budget for {month_name ? month_name : ''}</h1>
                <Categories 
                    monthly_categories={monthly_categories} 
                    month_amount={month_amount} 
                    month_total={month_total} 
                    month_diff={month_diff} />
            </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {updateStore})(Dashboard);
