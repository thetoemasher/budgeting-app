import React, { useState, useEffect } from 'react';
import Categories from './Categories'
import Payments from './Payments'
import {getMonthName} from '../../_utils/formaters'
import axios from 'axios'


function Dashboard(props) {
    const [currentMonth, setCurrentMonth] = useState('');
    const [categories, setCategories] = useState([]);
    const [userMonths, setUserMonths] = useState([]);
    const [monthlyCategories, setMonthlyCategories] = useState([]);
    const [payments, setPayments] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if(firstLoad) {
                try {
                        const userMonthsRes = await axios.get('/api/months')
                        setUserMonths(userMonthsRes.data)
                        const categoriesRes = await axios.get('/api/categories')
                        setCategories(categoriesRes.data)
                        const currentMonthsRes = await axios.get('/api/months/current')
                        setCurrentMonth(currentMonthsRes.data)
                        setFirstLoad(false)
                } catch (err) {
                    console.log('error', err)
                }
            }
        }
        fetchData()
    }, [firstLoad]) 
    // console.log('current', currentMonth)

    useEffect(() => {
        async function fetchData() {
            try {
                if(currentMonth) {
                    setMonthlyCategories([])
                    const monthlyCategoriesRes = await axios.get(`/api/month/${currentMonth.month_id}/categories`)
                    setMonthlyCategories(monthlyCategoriesRes.data)
                    setPayments([])
                    const paymentsRes = await axios.get(`/api/month/${currentMonth.month_id}/payments`)
                    setPayments(paymentsRes.data)
                }
            } catch (err) {
                console.log('error', err)
            }
        }
        fetchData()
    }, [currentMonth])

    const recalculateMonthsAndUpdateCurrentMonth = async () => {
        const {month_id, year} = currentMonth
        try {
            const userMonthsRes = await axios.get('/api/months/recalculate')            
            const newCurrentMonth = userMonthsRes.data[year].find(m => m.month_id === month_id)
            setCurrentMonth(newCurrentMonth)
            setUserMonths(userMonthsRes.data)
        } catch (err) {
            console.log('error', err)
        }
    }
    const months = () => {
        const yearAndMonths = []
        for(let year in userMonths) {
            const monthMap = userMonths[year].map(m => {
                let color = 'black'
                if(m.month === currentMonth.month && m.year === currentMonth.year) {
                    color = 'red'
                }
                const monthName = getMonthName(m.month)
                return <div style={{marginLeft: 15, color}} key={m.month_id} onClick={() => setCurrentMonth(m)}>{monthName}</div>
            })
            yearAndMonths.push(<div key={year}>{year}{monthMap}</div>)
        }
        return yearAndMonths
    }
        const currentMonthName = currentMonth ? getMonthName(currentMonth.month) : ''
        return (
            <div>
                <div>{months()}</div>
                <h1>Budget for {currentMonthName}, {currentMonth.year}</h1>
                <Categories 
                    currentMonth={currentMonth} 
                    monthlyCategories={monthlyCategories} 
                    categories={categories}
                    setCategories={setCategories}
                    setMonthlyCategories={setMonthlyCategories}
                    recalculateMonthsAndUpdateCurrentMonth={recalculateMonthsAndUpdateCurrentMonth} />
                <Payments 
                    currentMonth={currentMonth} 
                    payments={payments}
                    monthlyCategories={monthlyCategories} 
                    setMonthlyCategories={setMonthlyCategories}
                    setPayments={setPayments}
                    />
            </div>
        );

}

export default Dashboard;
