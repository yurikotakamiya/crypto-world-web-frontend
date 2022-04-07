import React, { useState, useEffect } from 'react'
import NewMonitorConfigs from './NewMonitorConfig'
import axios from 'axios'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const MonitorConfigs = () => {
    const [ add, setAdd ] = useState(false)
    const [ toDelete, setToDelete ] = useState({})
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
        axios.post('http://localhost:9000/api/monitor/get_monitor_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setToDelete(res.data[id - 1]))
        .catch(e => console.log(e))

        let proceed = confirm("Are you sure you want to proceed?");
        if (proceed) {
            axios.post('http://localhost:9000/api/monitor/delete', toDelete)
            .then(() => push(`/settings`))
            .catch(e => console.log(e))
        } else {
            push('/settings/monitor_configs')
        }
    }

    useEffect(() => {
        axios.post('http://localhost:9000/api/monitor/get_monitor_configs', {}, {
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
        <div className='strategy_config'>            
            {
                existConfig ? 
                <div>
                    <h1>Monitor configuration</h1>
                    <ReactFlexyTable data={configsToShow} className='data-table' additionalCols={additionalCols}/>
                </div>
                :
                <h1>You have no monitor configuration data yet...</h1>
            }
            <button onClick={handleAdd} className='form-btn'>Add New Config from here</button>
            {
                add ? <NewMonitorConfigs /> : <div></div>
            }
        </div>
    )
}
export default MonitorConfigs