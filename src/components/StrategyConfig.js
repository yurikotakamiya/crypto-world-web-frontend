import React, { useState, useEffect } from 'react'
import axios from 'axios'

const StrategyConfig = () => {
    const [ exchange, setExchange ] = useState([])
    const [ tradingPair, setTradingPair ] = useState([])
    const [ state, setState ] = useState({
        exchange_id: '',
        trading_pair_id: '',
        strategy_id: ''
    })
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
        console.log(state)
    }
    const handleSubmit = e => {
        e.preventDefault()

    }
    useEffect(() => {
        const user_id = localStorage.getItem('id')
        const sid = localStorage.getItem('sid')
        axios.post('http://localhost:9000/api/strategy/get_exchange', {}, {
            headers: {
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {
            setExchange(res.data)
            console.log(exchange)
        })
        .catch(e => console.log('This is error: ', e))

        axios.post('http://localhost:9000/api/strategy/get_trading_pair', {}, {
            headers: {
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {
            setTradingPair(res.data)
        })
        .catch(e => console.log(e))
    
}, [])
    
    return (
        <div className='strategy_config'>
            <form onSubmit={handleSubmit}>
                <label className='register-input'>                                
                    <h3>Exchange Name</h3>
                    <select 
                    name='exchange_id' 
                    onChange={handleChange}
                    value={state.exchange_id}
                    className='register-text-box'
                    >
                        <option value=''>-- Select Exchange --</option>                    
                        {
                            exchange.map((e, idx) => {                                
                                return (
                                    <option key={idx} value={e.exchange_id}>{e.exchange_name}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <label className='register-input'>                                
                    <h3>Trading Pair</h3>
                    <select 
                    name='trading_pair' 
                    onChange={handleChange}
                    value={state.trading_pair_id}
                    className='register-text-box'>
                        <option value=''>-- Select Trading Pair --</option>                        
                        {
                            tradingPair.map((tr, idx) => {
                                return (
                                    <option key={idx} value={tr.trading_pair_id}>{tr.trading_pair_name}</option>                                    
                                )
                            })
                        }
                    </select>
                </label>
            </form>
        </div>
    )
}

export default StrategyConfig