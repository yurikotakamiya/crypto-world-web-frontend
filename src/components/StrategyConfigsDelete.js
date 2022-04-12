import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const StrategyConfigsDelete = () => {
    const push = useNavigate()
    const { id } = useParams()
    const [ toDelete, setToDelete ] = useState({})
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    const handleDelete = () => {
        axios.post('https://crypto-world-api.herokuapp.com/api/strategy/delete', toDelete)
            .then(() => push('/settings/strategy_configs'))
            .catch(e => console.log(e))
    }
    useEffect(() => {
        axios.post('https://crypto-world-api.herokuapp.com/api/strategy/get_strategy_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setToDelete(res.data[id - 1]))
        .catch(e => console.log(e))
    }, [])
    return (
        <div className='ComponentContainer'>
            <div className='ModalContainer'>
                <h1>Are you sure to delete?</h1>
                <hr width='500' />
                <p>Strategy Name: {toDelete.strategy_name}</p>
                <p>Exchange Name: {toDelete.exchange_name}</p>
                <p>Trading Pair: {toDelete.trading_pair}</p>
                {
                    toDelete.strategy_name == 'INTERVAL' ? 
                    (<div>
                        <p>Order size: {toDelete.param_interval_order_size}</p>
                        <p>Price Interval: {toDelete.param_interval_price_interval}</p>
                        <p>Profit Price Change: {toDelete.param_interval_profit_price_change}</p>
                        <p>Start Price: {toDelete.param_interval_start_price}</p>
                    </div>)
                    :
                    <div></div>
                }
                <button className='form-btn' onClick={handleDelete}>Yes, I am sure. Delete it.</button>
                <Link to={'/settings'}>
                    <button className='form-cancel-btn'>GO BACK TO STRATEGY CONFIGURATIONS</button>
                </Link> 
            </div>
        </div>
    )
}

export default StrategyConfigsDelete