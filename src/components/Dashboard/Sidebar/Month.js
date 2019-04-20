import React, {Component} from 'react'

class Month extends Component {
    constructor() {
        super()
        this.state = {
            openMonth: false
        }
    }

    toggleMonth = () => {
        this.setState({openMonth: !this.state.openMonth})
    }

    render() {
        const {month} = this.props
        return (
            <div>
                {this.state.openMonth ? <h5>-</h5> : <h5>+</h5>}
                <h5 onClick={this.toggleMonth}>{month.month_name}</h5>
                {this.state.openMonth && (
                    <div>
                        <p>Monthly Budget: ${month.month_amount}</p>
                    </div>
                )}

            </div>
        )
    }
}

export default Month