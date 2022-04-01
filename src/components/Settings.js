import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ApiKeys from './ApiKeys'

const Settings = () => {
    const [ state, setState ] = useState({
        exchange_id: '',
        api_key: '',
        secret_key: ''
    })
    const [ api, setApi ] = useState([])
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
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
            console.log(res.data)
            setApi(res.data)
        })
        .catch(e => console.log(e))

    }
    useEffect(() => {
        const user_id = localStorage.getItem('id')
        axios.post(`http://localhost:9000/api/setting/confirm`, {}, {
            headers:{
                user_id: user_id,
            }
        })
        .then(res => setApi(res.data))
        .catch(e => console.log(e))
    }, [])
    return (
        <div>
            <h1>Setting</h1>
            <form className='api-form' onSubmit={handleSubmit}>
                <label>                                
                    Exchange Name
                    <select 
                    name='exchange_id' 
                    onChange={handleChange}
                    value={state.exchange}>
                        <option value=''>-- Select Exchange --</option>
                        <option value='1'>Binance</option>
                        <option value='2'>Ku Coin</option>
                        <option value='3'>FTX</option>
                    </select>
                </label>
                <label>
                    API KEY
                    <input
                    name='api_key'
                    type='text'
                    onChange={handleChange}
                    value={state.api_key}
                    />
                </label>
                <label>
                    API SECRET KEY
                    <input
                    name='secret_key'
                    type='text'
                    onChange={handleChange}
                    value={state.secret_key}
                    />
                </label>
                <button>Submit</button>
            </form>
            <ApiKeys api={api} />
        </div>
    )
}
export default Settings