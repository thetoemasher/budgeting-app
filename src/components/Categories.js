import React, { Component } from 'react';
import Modal from './shared/Modal'
import {amountFormater} from '../_utils/formaters'
import {connect} from 'react-redux'
import {updateStore} from '../redux/reducer'
import axios from 'axios'

class Categories extends Component {
    constructor() {
        super()
        this.state = {
            addCategory: false,
            monthly_category_id: '',
            category_amount: 0,
            new_category: ''
        }
    }
    
    handleInput = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    toggleAddCategory = () => {
        this.setState({addCategory: !this.state.addCategory})
    }

    saveCategory = () => {
        axios.post('/api/new-monthly-category', {category: this.state}).then(results => {
            const {categories, monthlyCategories} = results.data
            this.props.updateStore({categories})
            this.props.updateStore({monthlyCategories})
            this.toggleAddCategory()

        })
    }

    // getCategoryTotal = (category) => {
    //     let total = this.props.payments.reduce((tot, cur) => {
    //         if(cur.category === category) {
    //             return tot += +cur.amount
    //         }
    //         return tot
    //     }, 0)
    //     return amountFormater(total)
    // }
    

  render() {
    const {addCategory, monthly_category_id, category_amount, new_category} = this.state
    const {monthlyCategories, categories} = this.props
    let cats = monthlyCategories.map(category => {
        // let spent = this.getCategoryTotal(category.name)
        // let diff = +category.amount - +spent
        return (
            <div style={styles.categories} key={category.category_id}>
                <p>{category.category_name}</p>
                <p>${category.category_amount}</p>
                <p>${category.category_total}</p>
                <p>${category.category_diff}</p>
            </div>
        )
    })

    let categoryOptions = []
    for(let i = 0; i < categories.length; i++) {
        if(monthlyCategories.findIndex(cat => cat.category_id === categories[i].category_id) === -1) {
            categoryOptions.push(<option value={categories[i].category_id} key={categories[i].category_id}>{categories[i].category_name}</option>)
        }
    }
    return (
        <div style={{border: '1px solid gray', minHeight: '150px'}}>
            <div>
                <div style={styles.categories}>
                    <p>Category</p>
                    <p>Amount</p>    
                    <p>Spent</p>    
                    <p>Difference</p>    
                </div>
                {cats}
            </div>
            <button onClick={this.toggleAddCategory}>Add Category</button>
            {addCategory && (
                <Modal 
                    close={this.toggleAddCategory}>
                    <select name='monthly_category_id' value={monthly_category_id} onChange={this.handleInput}>
                        <option value=''>Select A Category</option>
                        {categoryOptions}
                        <option value='New'>New Category</option>
                    </select>
                    {monthly_category_id==='New' && <input value={new_category} name='new_category' onChange={this.handleInput} placeholder='Enter Category Name'/>}
                    <input name='category_amount' type='number' value={category_amount} onChange={this.handleInput} placeholder='Amount'/>
                    <button onClick={this.saveCategory}>Save</button>
                </Modal>
            )}
        </div>
    );
  }
}

let styles = {
    categories: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

function mapStateToProps(state) {
    return {
        monthlyCategories: state.monthlyCategories,
        categories: state.categories,
        payments: state.payments
    }
}

export default connect(mapStateToProps, {updateStore})(Categories);
