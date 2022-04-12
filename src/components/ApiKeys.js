import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ApiKeys = () => {
    const [ apis, setApis ] = useState([])
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    const push = useNavigate()
    
    const handleDelete = id => {
        let toDelete = {user_id, exchange_id: id}
        console.log(toDelete)
        axios.post('https://crypto-world-api.herokuapp.com/api/apis/delete', toDelete)
            .then(() => push('/settings'))
            .catch(e => console.log(e))
    }    
    useEffect(() => {
        axios.post(`https://crypto-world-api.herokuapp.com/api/apis/confirm`, {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setApis(res.data))
        .catch(e => console.log(e))
    }, [])

    return (
        <div className='config-data' >
            <h1>Your Api Keys</h1>
            {
                apis == 0 ? 
                <p>You have no monitor configuration data yet...</p>
                :            
                apis.map((api, idx) => {
                    return (
                        <div key={idx} value={api.exchange_id} className='api-container'>
                            <div className='api-info'>
                                <h3>Exchange Name: {api.description}</h3>
                                <p>Api Key: ********************</p>
                                <p>Secret Key: ********************</p>
                                </div>
                                <div className='api-edit'>
                                    <Link to={`/settings/api_config/edit/${api.exchange_id}`}>
                                        <input type='button' className='api-edit-btn' value="Edit"/>
                                    </Link>
                                    <Link to={`/settings/api_config`} >
                                        <input type='button' className='api-edit-btn' value="Delete" onClick={() => handleDelete(api.exchange_id)}/>
                                    </Link>
                                </div>
                            </div>
                            )
                        })
                        
                    }
                
            <Link to={'/settings/new_api_config'} className='add-button-div'>
                <button className='add-button'>Add New API Config</button>
            </Link>
            
            <Link to={'/settings'}>
                <button className='back-btn'>GO BACK TO SETTING</button>
            </Link> 
        </div>    
        )
    }
    
export default ApiKeys