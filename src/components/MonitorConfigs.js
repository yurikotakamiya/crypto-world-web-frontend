import React, { useState, useEffect } from 'react'
import NewMonitorConfigs from './NewMonitorConfig'
import axios from 'axios'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const MonitorConfigs = () => {
    const [ add, setAdd ] = useState(false)
    const [ existConfig, setExistConfig ] = useState(true)
    const [ configsToShow, setConfigsToShow ] = useState([])
    const handleAdd = () => {
        setAdd(!add)
    }
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    const push = useNavigate()
    const handleEdit = id => {
        push(`/settings/monitor_configs/edit/${id}`)
    }
    const handleDelete = id => {        
        push(`/settings/monitor_configs/delete/${id}`)
    }

    useEffect(() => {
        axios.post('https://crypto-world-api.herokuapp.com/api/monitor/get_monitor_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {
            let toShow = res.data
            if (res.data == 0) {
                setExistConfig(false)
            }
            let newConfigs = []
            for (let i = 0; i < toShow.length; i++) {
                newConfigs[i] = {
                    id: i + 1,           
                    exchange_name: toShow[i].exchange_name,
                    monitor_name: toShow[i].monitor_name,
                    trading_pair: toShow[i].trading_pair,
                    param_rsi_low_threshold: toShow[i].param_rsi_low_threshold,
                    param_rsi_high_threshold: toShow[i].param_rsi_high_threshold,
                    param_rsi_time_interval: toShow[i].param_rsi_time_interval
                }                                
            }
            setConfigsToShow(newConfigs)
        })
        .catch(e => console.log(e))
    }, [])
    const additionalCols = [{
        header: 'Actions',
        td: (data) => {
            return (<div>
                        <button onClick={() => handleEdit(data.id)}>{<AiIcons.AiFillEdit />}</button>{' '}
                        <button onClick={() => handleDelete(data.id)}>{<AiIcons.AiOutlineDelete/>}</button>
                    </div>)}}]
    return (
        <div className='config-data'>            
            <h1>Monitor configuration</h1>
            {
                existConfig ? 
                <div>
                    <ReactFlexyTable data={configsToShow} className='data-table' additionalCols={additionalCols}/>
                </div>
                :
                <p>You have no monitor configuration data yet...</p>
            }
            <Link to={'/settings/new_monitor_configs'} className='add-button-div'>
                <button onClick={handleAdd} className='add-button'>Add New Config from here</button>
            </Link>
            {
                add ? <NewMonitorConfigs /> : <div></div>
            }
            <Link to={'/settings'}>
                <button className='back-btn'>GO BACK TO SETTING</button>
            </Link>  
        </div>
    )
}
export default MonitorConfigs