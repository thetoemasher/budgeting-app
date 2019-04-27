import React, { Component } from 'react';
import {connect} from 'react-redux'
import Year from './Year'

function Sidebar(props) {
    let monthsStuff = []
    for(let prop in props.months) {
        let months = props.months[prop]
        monthsStuff.push(
            <div key={prop}>
                <Year year={prop} months={months} currentMonth={props.currentMonth} key={prop}/>
            </div>
        )
    }
console.log(props.currentMonth)
    return (
        <div>
            {monthsStuff}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        months: state.months,
        currentMonth: state.currentMonth
    }
}

export default connect(mapStateToProps)(Sidebar);
