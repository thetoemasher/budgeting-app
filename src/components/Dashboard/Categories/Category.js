import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateStore} from '../../../redux/reducer'

class Category extends Component {
    constructor() {
        super() 
        this.state = {
            category_id: '', 
            new_category_name: '', 
            category_amount: ''
        }
    }

    componentDidMount() {
        const {edit, monthly_category} = this.props
        const {category_id, category_amount} = monthly_category
        if(edit) {
            this.setState({category_id, category_amount})
        }
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        const {edit, month_id, clickedId, updateStore, close} = this.props
        if(edit) {
            await axios.put(`/api/months/${month_id}/categories/${clickedId}`, this.state)
        } else {
            await axios.post(`/api/months/${month_id}/categories`, this.state)
        }
        const monthsResults = await axios.get(`/api/months/${month_id}`)
        updateStore({currentMonth: monthsResults.data})
        if(this.state.category_id === 'New') {
            const categoriesResults = await axios.get('/api/categories')
            updateStore({categories: categoriesResults.data})
        }
        close()
    }
    
    handleDelete = async () => {
        const {month_id, clickedId, updateStore, close} = this.props
        await axios.delete(`/api/months/${month_id}/categories/${clickedId}`)
        const monthsResults = await axios.get(`/api/months/${month_id}`)
        updateStore({currentMonth: monthsResults.data})
        close()
    }

    render() {
        console.log(this.props.monthly_category)
        const {category_amount, category_id, new_category_name} = this.state
        const {handleChange} = this
        const {monthly_categories, clickedId, edit} = this.props
        let cat = monthly_categories.find(mc => mc.monthly_category_id === clickedId)
        let categoriesMap = this.props.categories.filter(c => {
            let index = monthly_categories.findIndex(mc => mc.category_id === c.category_id)
            const editCheck = edit ? cat ? c.category_id === cat.category_id : false : false
            return index === -1 || editCheck
        }).map(c => {
            return (
                <option key={c.category_id} value={c.category_id}>{c.category_name}</option>
            )
        })
        return (
            <div>
                <select onChange={handleChange} value={category_id} name='category_id'>
                    <option value=''>Select a Category</option>
                    {categoriesMap}
                    <option value='New'>New Category</option>
                </select>
                {category_id === 'New' && <input name='new_category_name' value={new_category_name} onChange={handleChange} placeholder='New Category Name' type='text'/>}
                <input name='category_amount' value={category_amount} onChange={handleChange} placeholder='Category Budget' type='number'/>
                <button onClick={this.handleSubmit}>Save</button>
                <button onClick={this.props.close}>Cancel</button>
                {edit && <button onClick={this.handleDelete}>Delete</button>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        month_id: state.currentMonth.month_id,
        monthly_categories: state.currentMonth.monthly_categories
    }
}

export default connect(mapStateToProps, {updateStore})(Category)