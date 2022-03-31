import React from 'react'
import { PropTypes } from 'prop-types'

const OrderHistory = props => {
    const { histories } = props
    return (
        <div>
            <h2>Order History</h2>
            {
                histories.map((history, idx)=> {
                    return (
                        <div key={idx} className='order-history container'>
                            <h3>{history.user_id}</h3>
                            
                        </div>
                    )
                })
            }
            
            </div>
    )
}

export default OrderHistory
OrderHistory.propTypes = {
    histories: PropTypes.array,
}