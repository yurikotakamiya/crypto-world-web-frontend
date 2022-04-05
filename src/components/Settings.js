import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ApiKeys from './ApiKeys'
import UserInfo from './UserInfo'

const Settings = () => {
    const [ state, setState ] = useState({
        exchange_id: '',
        api_key: '',
        secret_key: ''
    })
    const [ api, setApi ] = useState([])
    const [ user, setUser ] = useState({})
    const [ error, setError ] = useState('')
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
            }
        })
        .then(res => {
            setApi(res.data)
        })
        .catch(e => console.log(e))

        axios.post(`http://localhost:9000/api/user/user_info`, {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {
            setUser(res.data)
        })
        .catch(e => console.log(e))
    }, [])
    
    return (
        <div className='setting'>
            <div className='setting-container'>
                <h1>Settings</h1>
            </div>
            <div className='user-info'>
                <UserInfo user={user} />
            </div>
                {api.length == 0 ? (<form className='api-form' onSubmit={handleSubmit}>
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
            <div >
            {
                api.map(a => <ApiKeys api={a} key={a.exchange_id} />)
            }
            </div>
            
        </div>
    )
}
export default Settings