import React, { Component } from 'react';
import Modal from '../shared/Modal'
import {amountFormater} from '../../_utils/formaters'

class Payments extends Component {
    constructor() {
        super()
        this.state = {
            payments: [],
            addPayment: false,
            paymentDate: '',
            paymentAmount: 0,
            paymentType: '',
            paymentCategory: '',
            paymentDescription: '',
            catOptions: []
        }
    }
    componentDidMount() {
        this.updateCatOptions()
    }

    componentDidUpdate(prevProps) {
        if(this.props.categories !== prevProps.categories) {
            this.updateCatOptions()
        }
    }

    updateCatOptions = () => {
        let catOptions = this.props.categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))
        this.setState({catOptions})
    }
    
    handleInput = e => {
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    toggleAddpayment = () => {
        this.setState({addPayment: !this.state.addPayment})
    }

    savePayment = () => {
        const {
            paymentDate,
            paymentAmount,
            paymentType,
            paymentCategory,
            paymentDescription
        } = this.state
        let id = 1
        let payments = this.props.payments.slice()
        if(payments.length) {
            id = payments[payments.length - 1].id + 1
        }
        let payment = {
            id: id,
            date: paymentDate,
            amount: amountFormater(paymentAmount),
            type: paymentType,
            category: paymentCategory,
            description: paymentDescription
        }
        payments.push(payment)
        this.props.updateStore({payments})
        this.setState({
            paymentDate: '',
            paymentAmount: 0,
            paymentType: '',
            paymentCategory: '',
            paymentDescription: '',
            addPayment: false
        })
    }

    

  render() {
    const {
        addPayment, 
        paymentDate,
        paymentAmount,
        paymentType,
        paymentCategory,
        paymentDescription,
        catOptions
    } = this.state
    const {payments} = this.props
    let pays = payments.map(payment => {
        return (
            <div style={styles.payments} key={payment.id}>
                <p>{payment.date}</p>
                <p>{payment.amount}</p>
                <p>{payment.type}</p>
                <p>{payment.category}</p>
                <p>{payment.description}</p>
            </div>
        )
    })
    return (
        <div style={{border: '1px solid gray', minHeight: '150px'}}>
            <div>
                <div style={styles.payments}>
                    <p>Date</p>
                    <p>Amount</p>    
                    <p>Type</p>    
                    <p>Category</p>    
                    <p>Description</p>    
                </div>
                {pays}
            </div>
            <button onClick={this.toggleAddpayment}>Add payment</button>
            {addPayment && (
                <Modal 
                    close={this.toggleAddpayment}>
                    <input name='paymentDate' type='date' value={paymentDate} onChange={this.handleInput} placeholder='Date'/>
                    <input name='paymentAmount' type='number' value={paymentAmount} onChange={this.handleInput} placeholder='Amount'/>
                    <input name='paymentType' type='Text' value={paymentType} onChange={this.handleInput} placeholder='Type'/>
                    <select value={paymentCategory} onChange={(e) => {
                        e.target.name = 'paymentCategory'
                        this.handleInput(e)}}>
                        <option value=''>Select One</option>
                        {catOptions}
                    </select>
                    <input name='paymentDescription' type='test' value={paymentDescription} onChange={this.handleInput} placeholder='Description'/>
                    <button onClick={this.savePayment}>Save</button>
                </Modal>
            )}
        </div>
    );
  }
}

let styles = {
    payments: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

export default Payments;