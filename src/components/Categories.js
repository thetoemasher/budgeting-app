import React, { Component } from 'react';
import Modal from './shared/Modal'
import {amountFormater} from '../_utils/formaters'
import {connect} from 'react-redux'
import {updateStore} from '../redux/reducer'

class Categories extends Component {
    constructor() {
        super()
        this.state = {
            addCategory: false,
            categoryName: '',
            categoryAmount: 0
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
        let id = 1
        let categories = this.props.categories.slice()
        if(categories.length) {
            id = categories[categories.length - 1].id + 1
        }
        let category = {
            id: id,
            name: this.state.categoryName,
            amount: amountFormater(this.state.categoryAmount)
        }
        categories.push(category)
        this.props.updateStore({categories})
        this.setState({
            categoryName: '',
            categoryAmount: 0,
            addCategory: false
        })
    }

    getCategoryTotal = (category) => {
        let total = this.props.payments.reduce((tot, cur) => {
            if(cur.category === category) {
                return tot += +cur.amount
            }
            return tot
        }, 0)
        return amountFormater(total)
    }
    

  render() {
    const {addCategory, categoryName, categoryAmount} = this.state
    const {categories} = this.props
    let cats = categories.map(category => {
        let spent = this.getCategoryTotal(category.name)
        let diff = +category.amount - +spent

        return (
            <div style={styles.categories} key={category.id}>
                <p>{category.name}</p>
                <p>${category.amount}</p>
                <p>${spent}</p>
                <p>${amountFormater(diff)}</p>
            </div>
        )
    })
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
                    <input name='categoryName' type='text' value={categoryName} onChange={this.handleInput} placeholder='Category'/>
                    <input name='categoryAmount' type='number' value={categoryAmount} onChange={this.handleInput} placeholder='Amount'/>
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
        categories: state.categories,
        payments: state.payments
    }
}

export default connect(mapStateToProps, {updateStore})(Categories);
