import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

const ApiKeys = props => {
    const { exchange_id } = props.api
    const [ exchange_name, setExchange_name] = useState('')
    useEffect(() => {
        if(exchange_id == 1) setExchange_name('BINANCE')
        if(exchange_id == 2) setExchange_name('KUCOIN')
        if(exchange_id == 3) setExchange_name('FTX')
    }, [])

    return (
        <div className='api-keys' key={exchange_id}>
            <h3>Exchange Name: {exchange_name}</h3>
            <h3>Api Key: ********************</h3>
            <h3>Secret Key: ********************</h3>
            <div>
            <Link to={`/settings/${exchange_id}`} className='edit'>
                <input type='button' className='api-edit-btn' value="Edit"/>
            </Link>
            </div>
        </div>    
        )
    }
    
export default ApiKeys

ApiKeys.propTypes = {
    api: PropTypes.array,
}