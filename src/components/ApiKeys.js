import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// import ReactFlexyTable from 'react-flexy-table'
// import 'react-flexy-table/dist/index.css'
// import * as AiIcons from 'react-icons/ai'

const ApiKeys = props => {
    const { exchange_id } = props.api
    const [ exchange_name, setExchange_name] = useState('')
    useEffect(() => {
        if(exchange_id == 1) setExchange_name('BINANCE')
        if(exchange_id == 2) setExchange_name('KUCOIN')
        if(exchange_id == 3) setExchange_name('FTX')
    }, [])

    return (
        <div key={exchange_id}>
            <div>Exchange Name: {exchange_name}</div>
            <div>Api Key: ********************</div>
            <div>Secret Key: ********************</div>
            <div>
            <Link to={`/settings/${exchange_id}`} className='edit'>
                <input type='button' className='api-edit-button' value="Edit"/>
            </Link>
            </div>
        </div>    
        )
    }
    
export default ApiKeys

ApiKeys.propTypes = {
    api: PropTypes.array,
}