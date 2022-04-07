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
            <div className='setting-title'>
                <h1>Settings</h1>
            </div>            
            <hr width='500' />
            
            <UserInfo user={user} />
            
            <hr width='500' />
            <div className='configs'>
                <h2>Configurations</h2>
                <div className='config-setting'>
                    <h3>Api Configuration</h3>
                    <Link to={'/settings/api_config'} >
                    <input type='button' className='api-edit-btn' value="Edit"/>
                    </Link>
                </div>
                <div className='config-setting'>
                    <h3>Strategy Configuration</h3>
                    <Link to={'/settings/strategy_configs'} className='edit'>
                        <input type='button' className='api-edit-btn' value="Edit"/>
                    </Link>
                </div>
                <div className='config-setting'>
                    <h3>Monitor Configuration</h3>
                    <Link to={'/settings/monitor_configs'} >
                    <input type='button' className='api-edit-btn' value="Edit"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Settings