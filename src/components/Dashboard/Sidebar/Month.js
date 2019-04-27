import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Month extends Component {
    constructor() {
        super()
        this.state = {
            openMonth: false
        }
    }
    
    componentDidMount() {
        this.monthCheck()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentMonth !== this.props.currentMonth) {
            this.monthCheck()
        }
    }
    monthCheck = () => {
        if(this.props.currentMonth && this.props.currentMonth.month === this.props.month.month) {
            this.setState({openMonth: true})
        } else {
            this.setState({openMonth: false})
        }
    }

    toggleMonth = () => {
        this.setState({openMonth: !this.state.openMonth})
    }

    render() {
        const {month} = this.props
        return (
            <div>
                    <h5 onClick={this.toggleMonth}>{this.state.openMonth ? '-' : '+'} {month.month_name}</h5>
                {this.state.openMonth && (
                    <div>
                        <Link to={`/dashboard/${month.month}/${month.year}`}><p>Monthly Budget: ${month.month_amount}</p></Link>
                    </div>
                )}

            </div>
        )
    }
}

export default Month