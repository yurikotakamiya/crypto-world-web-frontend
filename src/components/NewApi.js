import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewApi = () => {
    const [ state, setState ] = useState({
        exchange_id: '',
        api_key: '',
        secret_key: ''
    })
    const [ error, setError ] = useState('')
    const push = useNavigate(); 

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        const user_id = localStorage.getItem('id')
        const sid = localStorage.getItem('sid')
        axios.post(`https://crypto-world-api.herokuapp.com/api/apis/send`, state, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(() => {
            setState({
                exchange_id: '',
                api_key: '',
                secret_key: ''
            })
            push('/settings/api_config')
        })
        .catch(() => {
            setError('your input was invalid')
        })
    }
    return (
        <div className='ComponentContainer'>
            <div className='ModalContainer'>
                <h1>Add Api Configuration</h1>
                <form className='text-boxes' onSubmit={handleSubmit}>
                    <label>            
                        <div className='required'>
                            <h3>Exchange Name</h3>                            
                            <h5>*</h5>
                        </div>                     
                        <select 
                        name='exchange_id' 
                        onChange={handleChange}
                        value={state.exchange}
                        className='text-box'>
                            <option value=''>-- Select Exchange --</option>
                            <option value='1'>Binance</option>
                            <option value='2'>KuCoin</option>
                            <option value='3'>FTX</option>
                        </select>
                    </label>
                    <label>
                        <div className='required'>                            
                            <h3>API KEY</h3>
                            <h5>*</h5>
                        </div> 
                        <input
                        name='api_key'
                        placeholder='Api key'
                        type='text'
                        className='text-box'
                        onChange={handleChange}
                        value={state.api_key}
                        />
                    </label>
                    <label>
                        <div className='required'>                            
                            <h3>API SECRET KEY</h3>
                            <h5>*</h5>
                        </div> 
                        <input
                        name='secret_key'
                        type='text'
                        placeholder='Secret key'
                        className='text-box'
                        onChange={handleChange}
                        value={state.secret_key}
                        />
                    </label>
                    {
                        error ? <div className='error-message'>{error}</div> : <div></div>
                    }
                    <button className='form-btn'>Submit</button>
                </form>
            </div>
        </div>
    )
}
export default NewApi