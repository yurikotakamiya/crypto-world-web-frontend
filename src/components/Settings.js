import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserInfo from './UserInfo'
import { Link } from 'react-router-dom'

const Settings = () => {
    
    const [ user, setUser ] = useState({})
    
    useEffect(() => {
        const user_id = localStorage.getItem('id')
        const sid = localStorage.getItem('sid')

        axios.post(`http://localhost:9000/api/user/user_info`, {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setUser(res.data))
        .catch(e => console.log(e))
    }, [])
    
    return (
        <div className='setting'>
            <div className='setting-container'>
                <h1>Settings</h1>
            </div>
            <div className='user-info'>
                <h3>General</h3>
                <UserInfo user={user} />
            </div>
            <div className='api-setting'>
                <h3>Api Configuration</h3>
                <Link to={'/settings/api_config'} >
                    <input type='button' className='api-edit-btn' value='edit' />
                </Link>
            </div>
            <div className='strategy-setting'>
                <h3>Strategy Configuration</h3>
                <Link to={'/settings/strategy_config'} >
                    <input type='button' className='api-edit-btn' value='edit' />                    
                </Link>
            </div>
        </div>
    )
}
export default Settings