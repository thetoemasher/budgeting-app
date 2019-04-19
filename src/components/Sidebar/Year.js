import React, {Component} from 'react'
import Month from './Month'

class Year extends Component {
    constructor() {
        super()
        this.state = {
            openYear: false
        }
    }

    toggleYear = () => {
        this.setState({openYear: !this.state.openYear})
    }

    render() {
        let months = this.props.months.map(month => {
                return (
                    <Month month={month} key={month.month_id}/>
                )
            })
        return (
            <div>
                {this.state.openYear ? <h3>-</h3> : <h3>+</h3>}
                <h3 onClick={this.toggleYear}>{this.props.year}</h3>
                {this.state.openYear && <div>
                    {months}
                    </div>}

            </div>
        )
    }
}

export default Year