import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    exchange_id: '',
    trading_pair_id: '',
    monitor_id: '',    
    param_rsi_high_threshold: 0,
    param_rsi_low_threshold: 0,
}

const NewMonitorConfig = () => {
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    const [ exchange, setExchange ] = useState([])
    const [ tradingPair, setTradingPair ] = useState([])
    const [ monitor, setMonitor ] = useState([])
    const [ state, setState ] = useState(initialState)
    const [ error, setError ] = useState({})
    const push = useNavigate(); 

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
            axios.post('http://localhost:9000/api/monitor/send', state, {
                headers: {
                    user_id: user_id,
                    sid: sid
                }
            })
            .then(() => {                
                setState(initialState)
                push('/settings/monitor_configs')           
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
        if (!input['monitor_id']) {
            isValid = false
            errors['monitor_id'] = 'Please select monitor name.'
        }    
        if (input['monitor_id'] == 1) {
            if (!input['param_rsi_low_threshold'] || !input['param_rsi_high_threshold']) {
                    isValid = false
                    errors['params'] = 'Please fill out parameter'
                }
        }
        setError({
            exchange_id: errors['exchange_id'],
            trading_pair_id: errors['trading_pair_id'],
            monitor_id: errors['monitor_id'],
            params: errors['params']            
        })
        return isValid
    }

    useEffect(() => {
        axios.get('http://localhost:9000/api/monitor/get_exchange')
            .then(res => setExchange(res.data))
            .catch(e => console.log(e))

        axios.get('http://localhost:9000/api/strategy/get_trading_pair')
            .then(res => setTradingPair(res.data))
            .catch(e => console.log(e))
    
        axios.get('http://localhost:9000/api/monitor/get_monitors')
        .then(res => setMonitor(res.data))
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
                                    <option key={idx} value={e.exchange_id}>{e.description}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <div className="error-message">{error.exchange_id}</div>

                <label className='register-input'>                                
                    <h3>Trading Pair</h3>
                    <select 
                    name='trading_pair_id' 
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
                <div className="error-message">{error.trading_pair_id}</div>

                <label className='register-input'>                                
                    <h3>Monitor</h3>
                    <select 
                    name='monitor_id' 
                    onChange={handleChange}
                    value={state.monitor_id}
                    className='register-text-box'>
                        <option value=''>-- Select Monitor --</option>                        
                        {
                            monitor.map((st, idx) => {
                                return (
                                    <option key={idx} value={st.monitor_id}>{st.monitor_name}</option>                                    
                                )
                            })
                        }
                    </select>
                </label>
                <div className="error-message">{error.strategy_id}</div>

                {
                    state.monitor_id == 1 ? (<label className='register-input'>
                        <h3>Parameter (REQUIRED)</h3>
                        <h4>Low Threshold</h4>
                        <input 
                        placeholder='Low Threshold'
                        name='param_rsi_low_threshold'
                        type='number'
                        value={state.param_rsi_low_threshold}
                        onChange={handleChange}
                        className='register-text-box'
                        />
                        <h4>High Threshold</h4>
                        <input 
                        placeholder='High Threshold'
                        name='param_rsi_high_threshold'
                        type='number'
                        value={state.param_rsi_high_threshold}
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

export default NewMonitorConfig