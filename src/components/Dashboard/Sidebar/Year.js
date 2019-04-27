import React, {Component} from 'react'
import Month from './Month'

class Year extends Component {
    constructor() {
        super()
        this.state = {
            openYear: false
        }
    }

    componentDidMount() {
        this.yearCheck()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentMonth !== this.props.currentMonth) {
            this.yearCheck()
        }
    }
    yearCheck = () => {
        if(this.props.currentMonth && this.props.currentMonth.year === this.props.year) {
            this.setState({openYear: true})
        } else {
            this.setState({openYear: false})
        }
    }

    toggleYear = () => {
        this.setState({openYear: !this.state.openYear})
    }

    render() {
        let months = this.props.months.map(month => {
                return (
                    <Month month={month} key={month.month_id} currentMonth={this.props.currentMonth}/>
                )
            })
        return (
            <div>
                    <h3 onClick={this.toggleYear}>{this.state.openYear ? '-' : '+'} {this.props.year}</h3>
                {this.state.openYear && <div>
                    {months}
                    </div>}

            </div>
        )
    }
}

export default Year