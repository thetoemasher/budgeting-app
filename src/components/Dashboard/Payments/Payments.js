import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateStore} from '../../../redux/reducer'
import Modal from '../../shared/Modal'
import Payment from './Payment'

class Payments extends Component{
    constructor() {
        super()
        this.state = {
            toggleEditModal: false,
            clicks: 0,
            clickedId: null,
            toggleAddModal: false,
        }
    }
    
    handleDoubleClick = (id) => {
        let {clicks, clickedId} = this.state
        clicks += 1
        if(clickedId === id) {
            if(clicks >= 2) {
                this.setState({toggleEditModal: true, clicks})
            } else {
                this.setState({clicks})
            }
        } else {
            this.setState({clickedId: id, clicks: 1})
        }
        setTimeout(() => {
            if(this.state.clicks <2) {
                this.setState({toggleEditModal: false, clickedId: null, clicks: 0})
            }
        }, 500)
    } 
    
    handleCloseEditModal = () => {
        this.setState({toggleEditModal: false, clickedId: null, clicks: 0})
    }

    handleAddModal = () => {
        this.setState({toggleAddModal: !this.state.toggleAddModal})
    }
    
    render() {
        const {payments} = this.props
        let paymentsMap = payments.map(p => {
            let date = p.payment_date.split('-')
            let newDate = `${date[1]}-${date[2]}-${date[0]}`

            return (
                <div 
                    key={p.payment_id} 
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}
                    onClick={() => this.handleDoubleClick(p.payment_id)}>
                    <p>{newDate}</p>
                    <p>${p.payment_amount}</p>
                    <p>{p.category_name}</p>
                    <p>{p.payment_type}</p>
                    <p>{p.payment_desc}</p>
                    <div onClick={e => e.stopPropagation()}>
                        <Modal
                            toggle={this.state.toggleEditModal && p.payment_id === this.state.clickedId}
                            close={this.handleCloseEditModal}>
                            <Payment 
                                close={this.handleCloseEditModal}
                                edit={true}
                                payment={p}/>

                        </Modal>
                    </div>
                </div>
            )
        })
        return (
            <div>
                
                <h2>Payments</h2>
                <button onClick={this.handleAddModal}>Add</button>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <h3>Date</h3>
                        <h3>Amount</h3>
                        <h3>Category</h3>
                        <h3>Type</h3>
                        <h3>Description</h3>
                    </div>
                    {paymentsMap}
                </div>
                <Modal
                    toggle={this.state.toggleAddModal}
                    close={this.handleAddModal}>
                    <Payment 
                        close={this.handleAddModal}/>
                </Modal>
            </div>
        )
    }

}

export default connect(null, {updateStore})(Payments)