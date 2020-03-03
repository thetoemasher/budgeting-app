import React, { Component } from 'react';
import Categories from './Categories'
import Payments from './Payments'
import {getMonthName} from '../_utils/formaters'
import axios from 'axios'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            currentMonth: '',
            categories: [],
            userMonths: [],
            monthlyCategories: [],
        }
    }
    async componentDidMount() {
        let userMonthsRes = await axios.get('/api/months')
        let currentMonthsRes = {}
        if(this.props.location.pathname === '/dashboard') {
            currentMonthsRes = await axios.get('/api/months/current')
        }
        const categoriesRes = await axios.get('/api/categories')
        this.setState({userMonths: userMonthsRes.data, currentMonth: currentMonthsRes.data, categories: categoriesRes.data})
        this.getMonthlyCategories();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.currentMonth.month_id !== this.state.currentMonth.month_id) {
            this.getMonthlyCategories();
        }
    }

    async getMonthlyCategories() {
        const {currentMonth} = this.state
        if(currentMonth) {
            this.setState({monthlyCategories: []})
            const monthlyCategoriesRes = await axios.get('/api/month/' + this.state.currentMonth.month_id + '/categories')
            this.setState({monthlyCategories: monthlyCategoriesRes.data})
        }
    }
    
    recalculateMonthsAndUpdateCurrentMonth = async () => {
        const {month_id, year} = this.state.currentMonth
        try {
            const userMonthsRes = await axios.get('/api/months/recalculate')
            
            const currentMonth = userMonthsRes.data[year].find(m => m.month_id === month_id)
            this.setState({currentMonth: currentMonth, userMonths: userMonthsRes.data})
        } catch (err) {
            console.log('error', err)
        }
    }



    selectMonth = m => {
        this.setState({currentMonth: m})
    }

    months() {
        const {userMonths, currentMonth} = this.state
        const yearAndMonths = []
        for(let year in userMonths) {
            const monthMap = userMonths[year].map(m => {
                let color = 'black'
                if(m.month === currentMonth.month && m.year === currentMonth.year) {
                    color = 'red'
                }
                return <div style={{marginLeft: 15, color}} key={m.month_id} onClick={() => this.selectMonth(m)}>{m.month_name}</div>
            })
            yearAndMonths.push(<div key={year}>{year}{monthMap}</div>)
        }
        return yearAndMonths
    }
    updateState = (obj) => {
        this.setState(obj)
    }

    render() {
        const {currentMonth, userMonths, categories, monthlyCategories} = this.state
        const currentMonthName = currentMonth ? getMonthName(currentMonth.month) : ''
        // console.log(userMonths)
        // console.log('categories', categories)
        // console.log('monthlyCategories', monthlyCategories)
        return (
            <div>
                <div>{this.months()}</div>
                <h1>Budget for {currentMonthName}, {currentMonth.year}</h1>
                <Categories 
                    currentMonth={currentMonth} 
                    monthlyCategories={monthlyCategories} 
                    categories={categories}
                    updateState={this.updateState}
                    recalculateMonthsAndUpdateCurrentMonth={this.recalculateMonthsAndUpdateCurrentMonth} />
                    <button onClick={this.recalculateMonthsAndUpdateCurrentMonth}>Recalculate</button>
                <Payments currentMonth={currentMonth}/>
            </div>
        );
    }
}

export default Dashboard;
