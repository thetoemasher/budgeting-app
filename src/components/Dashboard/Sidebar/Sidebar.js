import React, { Component } from 'react';
import {connect} from 'react-redux'
import Year from './Year'

function Sidebar(props) {
    let monthsStuff = []
    console.log(props.months)
    for(let prop in props.months) {
        let months = props.months[prop]
        monthsStuff.push(
            <div>
                <Year year={prop} months={months} key={prop}/>
            </div>
        )
    }

    return (
        <div>
            {monthsStuff}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        months: state.months
    }
}

export default connect(mapStateToProps)(Sidebar);
