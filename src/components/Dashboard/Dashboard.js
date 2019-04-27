import React, { Component } from 'react';
import Categories from './Categories/Categories'
import Payments from './Payments/Payments'
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
        this.getCurrnetInfo()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params !== this.props.match.params) {
            this.getCurrnetInfo()
        }
    }

    getCurrnetInfo = () => {
        axios.get('/api/months').then(results => {
            this.props.updateStore({months: results.data})
        })
        let date = {}
        if(this.props.match.params.month && this.props.match.params.year) {
            date = this.props.match.params
        } else {
            date = this.getCurrentMonth()
        }
        axios.get(`/api/months/${date.month}/${date.year}`).then(results => {
            this.props.updateStore({currentMonth: results.data})
        })
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
    const {monthly_categories, month_name, month_amount, month_total, month_diff, payments} = this.props.currentMonth
    return (
        <div>
            <Sidebar currentMonth={this.props.currentMonth}/> 
            <div>
                <h1>Monthly Budget for {month_name ? month_name : ''}</h1>

                <Categories 
                    monthly_categories={monthly_categories} 
                    month_amount={month_amount} 
                    month_total={month_total} 
                    month_diff={month_diff} />
                <hr/>
                {payments && <Payments 
                    payments={payments}/>
                }
            </div>
        </div>
    );
  }
}
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {updateStore})(Dashboard);
