import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateStore} from '../../../redux/reducer'

class Categories extends Component{
    constructor() {
        super()
        this.state = {
            toggleModal: false,
            clicks: 0,
            clickedId: null
        }
    }
    
    handleDoubleClick = (id) => {
        let {clicks, clickedId} = this.state
        clicks += 1
        if(clickedId === id) {
            if(clicks >= 2) {
                this.setState({toggleModal: true})
            } else {
                this.setState({clicks})
            }
        } else {
            this.setState({clickedId: id, clicks: 1})
        }
    } 
    handleCloseModal = () => {
        this.setState({toggleModal: false, clickedId: null, clicks: 0})
    }
    render() {
        console.log(this.state)
        let {toggleModal} = this.state
        let {monthly_categories, month_amount, month_total, month_diff} = this.props
        monthly_categories = monthly_categories ? monthly_categories : []
        let monthlyCategoriesMap = monthly_categories.map(mc => {
            return (
                <div 
                    key={mc.monthly_category_id} 
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}
                    onClick={() => this.handleDoubleClick(mc.monthly_category_id)}>
                    <p>{mc.category_name}</p>
                    <p>{mc.category_amount}</p>
                    <p>{mc.category_total}</p>
                    <p>{mc.category_diff}</p>
                </div>
            )
        })
        return (
            <div>
                <h2>Categories</h2>
                {toggleModal && <div onClick={this.handleCloseModal}>Modal Open!</div>}
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <h3>Name</h3>
                        <h3>Amount</h3>
                        <h3>Total</h3>
                        <h3>Diff</h3>
                    </div>
                    {monthlyCategoriesMap}
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <p>Total</p>
                        <p>{month_amount}</p>
                        <p>{month_total}</p>
                        <p>{month_diff}</p>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {updateStore})(Categories)