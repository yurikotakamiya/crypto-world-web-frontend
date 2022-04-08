import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const StrategyConfigsEdit = () => {
    const [ state, setState ] = useState({})
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
        
        if (validated) {
            axios.post('http://localhost:9000/api/strategy/edit', state, {
                headers: {
                    user_id: user_id,
                    sid: sid
                }
            })
            .then(() => push('/settings/strategy_configs'))
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
        .then(res => setState(res.data[id - 1]))
        .catch(e => console.log(e))

        axios.get('http://localhost:9000/api/strategy/get_strategy')
            .then(res => setStrategy(res.data))
            .catch(e => console.log(e))
    }, [])
    return (
        <div className='ComponentContainer'>
            <div className='ModalContainer'>
                <h1>Edit your Strategy</h1>
                <form onSubmit={handleSubmit} className='text-boxes'>
                    <hr width='500'/>
                    <h2>Exchange Name: {state.exchange_name}</h2>               
                    <h2>Trading Pair: {state.trading_pair}</h2>
                    <hr width='500'/>
                    <label>              
                        <div className='required'>                            
                            <h3>Strategy</h3>
                            <h5>*</h5>
                        </div>                    
                        <select 
                        name='strategy_id' 
                        onChange={handleChange}
                        value={state.strategy_id}
                        className='text-box'>
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
                        state.strategy_id == 1 ? (<label>
                            <h2>Parameter</h2>
                            <div className='required'>
                                <h3>Order Size</h3>                            
                                <h5>*</h5>
                            </div>  
                            <input 
                            placeholder='Order size'
                            name='param_interval_order_size'
                            type='number'
                            value={state.param_interval_order_size}
                            onChange={handleChange}
                            className='text-box'
                            />
                            <div className='required'>
                                <h3>Price Interval</h3>                                
                                <h5>*</h5>
                            </div>  
                            <input 
                            placeholder='Price Interval'
                            name='param_interval_price_interval'
                            type='number'
                            value={state.param_interval_price_interval}
                            onChange={handleChange}
                            className='text-box'
                            />
                            <div className='required'>                            
                                <h3>Profit Price Change</h3>
                                <h5>*</h5>
                            </div>  
                            <input 
                            placeholder='Profit Price Change'
                            name='param_interval_profit_price_change'
                            type='number'
                            value={state.param_interval_profit_price_change}
                            onChange={handleChange}
                            className='text-box'
                            />
                            <div className='required'>
                                <h3>Start Price</h3>                                
                                <h5>*</h5>
                            </div>  
                            <input 
                            placeholder='Start Price'
                            name='param_interval_start_price'
                            type='number'
                            value={state.param_interval_start_price}
                            onChange={handleChange}
                            className='text-box'
                            />
                        </label> ) : <div></div>
                    }
                    <div className="error-message">{error.params}</div>

                    <button className='form-btn'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default StrategyConfigsEdit