import React from 'react'
import { PropTypes } from 'prop-types'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'

const OrderHistory = props => {
    const { histories } = props
    
    return (
        <div className='history-table'>
            {
                histories == 0 ? <h1>You have no order yet.</h1>
                :
                (<div>
                    <h3>Filter out your order by inputting values below each columns.</h3>
                    <ReactFlexyTable data={histories} filterable className='data-table'/>    
               </div>)
            }   
        </div>
    )
}

export default OrderHistory

OrderHistory.propTypes = {
    histories: PropTypes.array,
}