import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateStore} from '../../../redux/reducer'

class Category extends Component {
    constructor() {
        super() 
        this.state = {
            payment_date: '',
            payment_amount: '',
            monthly_category_id: '',
            payment_type: '',
            payment_desc: ''
        }
    }

    componentDidMount() {
        if(this.props.edit) {
            this.setState(this.props.payment)

        } else {
            let date = new Date()
            let mm = date.getMonth() + 1
            mm = mm < 10 ? '0' + mm : mm
            let dd = date.getDate()
            dd = dd < 10 ? '0' + dd : dd
            let yyyy = date.getFullYear()
            
            this.setState({payment_date: `${yyyy}-${mm}-${dd}`})
        }
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        const {month_id, edit, close, payment, updateStore} = this.props 
        const {payment_date, payment_amount, monthly_category_id, payment_type, payment_desc} = this.state
        if(payment_date && payment_amount && monthly_category_id && payment_type && payment_desc) {
            if(edit) {
                await axios.put(`/api/months/${month_id}/payments/${payment.payment_id}`, this.state)
    
            } else {
                await axios.post(`/api/months/${month_id}/payments`, this.state)
                
            }
            const monthsResults = await axios.get(`/api/months/${month_id}`)
            console.log(monthsResults)
            updateStore({currentMonth: monthsResults.data})
            close()
        }  else {
            alert("Fill out the thing, yo!")
        }
    }
    
    handleDelete = async () => {
        const {updateStore, close, month_id, payment} = this.props
        await axios.delete(`/api/months/${month_id}/payments/${payment.payment_id}`)
        const monthsResults = await axios.get(`/api/months/${month_id}`)
        updateStore({currentMonth: monthsResults.data})
        close()
    }

    render() {
        const {payment_date, payment_amount, monthly_category_id, payment_type, payment_desc} = this.state
        let categoriesMap = this.props.monthly_categories.filter(mc => mc.category_name !== 'Not Categorized').map(mc => {
            return (
                <option key={mc.monthly_category_id} value={mc.monthly_category_id}>{mc.category_name}</option>
            )
        })
        return (
            <div>
                <input value={payment_date} name='payment_date' type='date' onChange={this.handleChange}/>
                <input value={payment_amount} name='payment_amount' placeholder='Amount' type='number' onChange={this.handleChange}/>
                <select onChange={this.handleChange} name='monthly_category_id' value={monthly_category_id}>
                    <option value=''>Select A Category</option>
                    {categoriesMap}
                </select>
                <input value={payment_type} name='payment_type' placeholder='Type' type='text' onChange={this.handleChange}/>
                <textarea value={payment_desc} name='payment_desc' placeholder='Description' type='text' onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Save</button>
                <button onClick={this.props.close}>Cancel</button>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        month_id: state.currentMonth.month_id,
        monthly_categories: state.currentMonth.monthly_categories
    }
}

export default connect(mapStateToProps, {updateStore})(Category)