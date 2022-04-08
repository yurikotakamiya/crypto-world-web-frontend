import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const MonitorConfigsEdit = () => {
    const [ state, setState ] = useState({})
    const [ interval, setInterval ] = useState([])
    const [ monitor, setMonitor ] = useState([])
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
            axios.post('http://localhost:9000/api/monitor/edit', state, {
                headers: {
                    user_id: user_id,
                    sid: sid
                }
            })
            .then(() => push('/settings/monitor_configs'))
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
            if (!input['param_rsi_low_threshold'] || !input['param_rsi_high_threshold'] || !input['param_rsi_time_interval']) {
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
        axios.post('http://localhost:9000/api/monitor/get_monitor_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setState(res.data[id - 1]))
        .catch(e => console.log(e))
               
        axios.get('http://localhost:9000/api/monitor/get_monitors')
            .then(res => setMonitor(res.data))
            .catch(e => console.log(e))

        axios.get('http://localhost:9000/api/monitor/get_interval')
        .then(res => setInterval(res.data))
        .catch(e => console.log(e))     
    }, [])
    return (
        <div className='ComponentContainer'>
        <div className='ModalContainer'>
            <form onSubmit={handleSubmit} className='text-boxes'>
                <h3>Exchange Name: {state.exchange_name}</h3>               
                <h3>Trading Pair: {state.trading_pair}</h3>
                <label>                       
                    <div className='required'>
                        <h3>Monitor Method</h3>
                        <h5>*</h5>
                    </div>                                 
                    <select 
                    name='monitor_id' 
                    onChange={handleChange}
                    value={state.monitor_id}
                    className='text-box'>
                        <option value=''>-- Select Strategy --</option>                        
                        {
                            monitor.map((st, idx) => {
                                return (
                                    <option key={idx} value={st.monitor_id}>{st.monitor_name}</option>
                                )
                            })
                        }
                    </select>
                </label>
                <div className="error-message">{error.monitor_id}</div>

                {
                    state.monitor_id == 1 ? (<label>
                        <h2>Parameter</h2>
                        <div className='required'>
                            <h3>Low Threshold</h3>
                            <h5>*</h5>
                        </div>                            
                        <input 
                        placeholder='Low Threshold'
                        name='param_rsi_low_threshold'
                        type='number'
                        value={state.param_rsi_low_threshold}
                        onChange={handleChange}
                        className='text-box'
                        />
                        <div className='required'>
                            <h3>High Threshold</h3>
                            <h5>*</h5>
                        </div>                            
                        <input 
                        placeholder='High Threshold'
                        name='param_rsi_high_threshold'
                        type='number'
                        value={state.param_rsi_high_threshold}
                        onChange={handleChange}
                        className='text-box'
                        />
                        <div className='required'>
                            <h3>Time Interval</h3>
                            <h5>*</h5>
                        </div>
                        <select
                        name='param_rsi_time_interval'
                        type='number'
                        value={state.param_rsi_time_interval}
                        onChange={handleChange}
                        className='text-box'
                        >
                            <option value=''>-- Select Interval Time --</option>                        
                        {
                            interval.map((i, idx) => {
                                return (
                                    <option key={idx} value={i.candlestick_interval_id}>{i.description}</option>
                                )
                            })
                        }
                        </select>
                    </label> ) : <div></div>
                }
                <div className="error-message">{error.params}</div>

                <button className='form-btn'>Submit</button>
            </form>
        </div>
        </div>
    )
}
export default MonitorConfigsEdit