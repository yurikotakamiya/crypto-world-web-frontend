import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const MonitorConfigsDelete = () => {
    const push = useNavigate()
    const { id } = useParams()
    const [ toDelete, setToDelete ] = useState({})
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    const handleDelete = () => {
        axios.post('https://crypto-world-api.herokuapp.com/api/monitor/delete', toDelete)
            .then(() => push(`/settings/monitor_configs`))
            .catch(e => console.log(e))
    }
    useEffect(() => {
        axios.post('https://crypto-world-api.herokuapp.com/api/monitor/get_monitor_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setToDelete(res.data[id - 1]))
        .catch(e => console.log(e))
    }, [])
    return (
        <div className='ComponentContainer'>
            <div className='ModalContainer'>
                <h1>Are you sure to delete?</h1>
                <hr width='500' />
                <p>Strategy Name: {toDelete.monitor_name}</p>
                <p>Exchange Name: {toDelete.exchange_name}</p>
                <p>Trading Pair: {toDelete.trading_pair}</p>
                {
                    toDelete.monitor_name == 'RSI' ? 
                    (<div>
                        <p>Low Threshold: {toDelete.param_rsi_low_threshold}</p>
                        <p>High Threshold: {toDelete.param_rsi_high_threshold}</p>
                        <p>Time Interval: {toDelete.param_rsi_time_interval}</p>                        
                    </div>)
                    :
                    <div></div>
                }
                <button className='form-btn' onClick={handleDelete}>Yes, I am sure. Delete it.</button>
                <Link to={'/settings'}>
                    <button className='form-cancel-btn'>GO BACK TO MONITOR CONFIGURATIONS</button>
                </Link> 
            </div>
        </div>
    )
}

export default MonitorConfigsDelete