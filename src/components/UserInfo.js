import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserInfo = () => {
    const [ user, setUser ] = useState({})
    
    useEffect(() => {
        const user_id = localStorage.getItem('id')
        const sid = localStorage.getItem('sid')
        axios.post(`https://crypto-world-api.herokuapp.com/api/user/user_info`, {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setUser(res.data))
        .catch(e => console.log(e))
    }, [])

    return (
        <div className='configs' key={user.user_id}>
            <h2>General</h2>
            <div className='config-setting'>
                <h3>User Name: {user.username}</h3>
                <Link to={`/settings/username/${user.user_id}`} className='edit'>
                    <input type='button' className='api-edit-btn' value="Edit"/>
                </Link>
            </div>
            <div className='config-setting'>
                <h3>Email : {user.email}</h3>
                <Link to={`/settings/email/${user.user_id}`} className='edit'>
                    <input type='button' className='api-edit-btn' value="Edit"/>
                </Link>                
            </div>
            <div className='config-setting'>                
                <h3>Password: ********************</h3>
                <Link to={`/settings/password/${user.user_id}`} className='edit'>
                    <input type='button' className='api-edit-btn' value="Edit"/>
                </Link>
            </div>
        </div>    
        )
    }
    
export default UserInfo