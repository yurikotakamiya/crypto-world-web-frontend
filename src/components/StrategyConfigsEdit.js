import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const StrategyConfigsEdit = () => {
    const [ configs, setConfigs ] = useState({})
    // const push = useNavigate()
    const { id } = useParams()
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')

    useEffect(() => {
        axios.post('http://localhost:9000/api/strategy/get_strategy_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {                                 
            setConfigs(res.data[id])            
            console.log(configs)
        })
        .catch(e => console.log(e))
        
    }, [])
    return (
        <div>
            
        </div>
    )
}
export default StrategyConfigsEdit