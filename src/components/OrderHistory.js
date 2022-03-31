import React from 'react'
import { PropTypes } from 'prop-types'

const OrderHistory = props => {
    const { histories } = props
    return (
        <div className='history-table'>
            <h2>Order History</h2>
            <div className='history-header'>
                <h2>Trading Pair</h2>
                <h2>Order Side</h2>
                <h2>Order State</h2>
                <h2>Strategy</h2>
                <h2>Price</h2>
                <h2>Size</h2>
                <h2>Created at</h2>
                <h2>Updated at</h2>
            </div>
            {
                histories.map((history, idx)=> {
                    return (
                        <div key={idx} className='history-row'>
                            <h3>{history.trading_pair}</h3>
                            <h3>{history.order_side}</h3>
                            <h3>{history.order_state}</h3>
                            <h3>{history.strategy}</h3>
                            <h3>{history.order_price}</h3>
                            <h3>{history.order_size}</h3>                            
                            <h3>{history.update_time}</h3>
                            <h3>{history.create_time}</h3>
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