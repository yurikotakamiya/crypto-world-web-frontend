import React from 'react'
import { PropTypes } from 'prop-types'
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"

const TradeHistory = props => {
    const { histories } = props
    
    return (
        <div className='history-table'>
            {
                histories == 0 ? <h1>You have no trade history</h1>
                :
                <div>
                    <h3>Filter out your trade by inputting values below each columns.</h3>
                    <ReactFlexyTable data={histories} filterable className='data-table'/>    
                </div>
            }
        </div>
    )
}

export default TradeHistory

TradeHistory.propTypes = {
    histories: PropTypes.array,
}