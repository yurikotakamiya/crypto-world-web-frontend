import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const StrategyConfigsEdit = () => {
    const [ state, setState ] = useState({})
    const [ exchange, setExchange ] = useState('')
    const [ tradingPair, setTradingPair ] = useState([])
    const [ strategy, setStrategy ] = useState([])
    const push = useNavigate()
    const { id } = useParams()
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    const [ error, setError ] = useState({})
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        let validated = validate()
        console.log(state)
        if (validated) {
            axios.post('http://localhost:9000/api/strategy/edit', state, {
                headers: {
                    user_id: user_id,
                    sid: sid
                }
            })
            .then(res => {
                console.log('edited :' ,res.data)                
                push('/settings/strategy_configs')           
            })
            .catch(e => console.log(e))
        }
    }
    const validate = () => {
        let input = state
        let errors = {}
        let isValid = true
    
        if (!input['exchange_id']) {
            isValid = false
            errors['exchange_id'] = 'Please select exchange.'
        }    
        if (!input['trading_pair_id']) {
            isValid = false
            errors['trading_pair_id'] = 'Please select trading pair.'
        }                
        if (!input['strategy_id']) {
            isValid = false
            errors['strategy_id'] = 'Please select strategy.'
        }    
        if (input['strategy_id'] == 1) {
            if (!input['param_interval_order_size'] || !input['param_interval_price_interval']
                || !input['param_interval_profit_price_change'] || !input['param_interval_start_price']) {
                    isValid = false
                    errors['params'] = 'Please fill out parameter'
                }
        }
        setError({
            exchange_id: errors['exchange_id'],
            trading_pair_id: errors['trading_pair_id'],
            strategy_id: errors['strategy_id'],
            params: errors['params']            
        })
        return isValid
    }
    useEffect(() => {
        axios.post('http://localhost:9000/api/strategy/get_strategy_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setState(res.data[id]))
        .catch(e => console.log(e))

        axios.post('http://localhost:9000/api/strategy/get_exchange', {}, {
            headers: {
                user_id: user_id,
                sid: sid
            }
        })
            .then(res => {            
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].exchange_id == state.exchange_id) setExchange(res.data[i].exchange_name)                    
                }                
            })
            .catch(e => console.log(e))

        axios.get('http://localhost:9000/api/strategy/get_trading_pair')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].trading_pair_id == state.trading_pair_id) setTradingPair(res.data[i].trading_pair_name)                    
                }                
            })
            .catch(e => console.log(e))
            console.log('tradingPair:' ,tradingPair)
        axios.get('http://localhost:9000/api/strategy/get_strategy')
            .then(res => setStrategy(res.data))
            .catch(e => console.log(e))
    }, [id])
    return (
            <div className='strategy_config'>
            <form onSubmit={handleSubmit}>
                <h3>Exchange Name: {exchange}</h3>               
                <h3>Trading Pair: {tradingPair}</h3>
                <label className='register-input'>                                
                    <h3>Strategy</h3>
                    <select 
                    name='strategy_id' 
                    onChange={handleChange}
                    value={state.strategy_id}
                    className='register-text-box'>
                        <option value=''>-- Select Strategy --</option>                        
                        {
                            strategy.map((st, idx) => {
                                return (
                                    <option key={idx} value={st.strategy_id}>{st.strategy_name}</option>                                    
                                )
                            })
                        }
                    </select>
                </label>
                <div className="error-message">{error.strategy_id}</div>

                {
                    state.strategy_id == 1 ? (<label className='register-input'>
                        <h3>Parameter (REQUIRED)</h3>
                        <h4>Order Size</h4>
                        <input 
                        placeholder='Order size'
                        name='param_interval_order_size'
                        type='number'
                        value={state.param_interval_order_size}
                        onChange={handleChange}
                        className='register-text-box'
                        />
                        <h4>Price Interval</h4>
                        <input 
                        placeholder='Price Interval'
                        name='param_interval_price_interval'
                        type='number'
                        value={state.param_interval_price_interval}
                        onChange={handleChange}
                        className='register-text-box'
                        />
                        <h4>Profit Price Change</h4>
                        <input 
                        placeholder='Profit Price Change'
                        name='param_interval_profit_price_change'
                        type='number'
                        value={state.param_interval_profit_price_change}
                        onChange={handleChange}
                        className='register-text-box'
                        />
                        <h4>Start Price</h4>
                        <input 
                        placeholder='Start Price'
                        name='param_interval_start_price'
                        type='number'
                        value={state.param_interval_start_price}
                        onChange={handleChange}
                        className='register-text-box'
                        />
                    </label> ) : <div></div>
                }
                <div className="error-message">{error.params}</div>

                <button className='api-edit-btn'>Submit</button>
            </form>
        </div>
    )
}
export default StrategyConfigsEdit