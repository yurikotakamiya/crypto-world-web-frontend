import React from 'react'
import { PropTypes } from 'prop-types'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const OrderHistory = props => {
    const { histories } = props
    
    return (
        <div className='history-table'>
            <ReactFlexyTable data={histories} filterable className='data-table'/>    
        </div>
    )
}

export default OrderHistory

OrderHistory.propTypes = {
    histories: PropTypes.array,
}