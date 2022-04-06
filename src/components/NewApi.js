import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ApiKeys from './ApiKeys'

const NewApi = () => {
    const [ state, setState ] = useState({
        exchange_id: '',
        api_key: '',
        secret_key: ''
    })
    const [ api, setApi ] = useState([])
    const [ addApi, setAddApi ] = useState(false)
    const [ error, setError ] = useState('')
    const toggleNewApi = () => {
        setAddApi(!addApi)
    }
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        const user_id = localStorage.getItem('id')
        axios.post(`http://localhost:9000/api/setting/send`, state, {
            headers:{
                user_id: user_id,
            }
        })
        .then(res => {
            setApi(res.data)
            setState({
                exchange_id: '',
                api_key: '',
                secret_key: ''
            })
            setAddApi(!addApi)
        })
        .catch(() => {
            setError('your input was invalid')
        })
    }
    useEffect(() => {
        const user_id = localStorage.getItem('id')
        const sid = localStorage.getItem('sid')
        axios.post(`http://localhost:9000/api/setting/confirm`, {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {
            setApi(res.data)
        })
        .catch(e => console.log(e))
    }, [])
    return (
        <div>
            <h1>Your Api Keys</h1>
            {
                api.map(a => <ApiKeys api={a} key={a.exchange_id} />)
            }
            <h3>Add a New Api?</h3>
            <button onClick={toggleNewApi}>ADD</button>
        {addApi ? (
            <form className='api-form' onSubmit={handleSubmit}>
                <label className='register-input'>                                
                    <h3>Exchange Name</h3>
                    <select 
                    name='exchange_id' 
                    onChange={handleChange}
                    value={state.exchange}
                    className='register-text-box'>
                        <option value=''>-- Select Exchange --</option>
                        <option value='1'>Binance</option>
                        <option value='2'>KuCoin</option>
                        <option value='3'>FTX</option>
                    </select>
                </label>
                <label className='register-input'>
                    <h3>API KEY</h3>
                    <input
                    name='api_key'
                    placeholder='Api key'
                    type='text'
                    className='register-text-box'
                    onChange={handleChange}
                    value={state.api_key}
                    />
                </label>
                <label className='register-input'>
                    <h3>API SECRET KEY</h3>
                    <input
                    name='secret_key'
                    type='text'
                    placeholder='Secret key'
                    className='register-text-box'
                    onChange={handleChange}
                    value={state.secret_key}
                    />
                </label>
                {
                    error ? <div className='error-message'>{error}</div> : <div></div>
                }
                <div className='middle-button'><button className='submit-btn'>Submit</button></div>
            </form>) : <div></div>}        
        </div>
    )
}
export default NewApi