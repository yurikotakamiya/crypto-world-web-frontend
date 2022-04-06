import React, { useState, useEffect } from 'react'
import NewStrategyConfigs from './NewStrategyConfig'
import axios from 'axios'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'


const StrategyConfigs = () => {
    const [ add, setAdd ] = useState(false)
    const [ configs, setConfigs ] = useState([])
    const [ configsToShow, setConfigsToShow ] = useState([])
    const handleAdd = () => {
        setAdd(!add)
    }
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    const push = useNavigate()
    const handleEdit = id => {
        push(`/settings/strategy_configs/edit/${id}`)
    }
    const handleDelete = id => {
        console.log('delete: ',id)
    }

    useEffect(() => {
        axios.post('http://localhost:9000/api/strategy/get_strategy_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {
            let toShow = res.data  
            setConfigs(toShow)
            let newConfigs = []
            for (let i = 0; i < toShow.length; i++) {
                newConfigs[i] = {
                    id: i,           
                    exchange_name: toShow[i].exchange_name,
                    strategy_name: toShow[i].strategy_name,
                    trading_pair: toShow[i].trading_pair,
                    order_size: toShow[i].param_interval_order_size,
                    price_interval: toShow[i].param_interval_price_interval,
                    profit_price_change: toShow[i].param_interval_profit_price_change,
                    start_price: toShow[i].param_interval_start_price,
                }                                
            }
            setConfigsToShow(newConfigs)
        })
        .catch(e => console.log(e))
        console.log(configs)
    }, [])
    const additionalCols = [{
          header: 'Actions',
          td: (data) => {
            return (
                <div>
                    <button onClick={() => handleEdit(data.id)}>{<AiIcons.AiFillEdit />}</button>{' '}
                    <button onClick={() => handleDelete(data.id)}>{<AiIcons.AiOutlineDelete/>}</button>                
                </div>
            )
          }}]
    return (
        <div className='strategy_config'>
            <ReactFlexyTable data={configsToShow} className='data-table' additionalCols={additionalCols}/>    
            <button onClick={handleAdd}>Add New Config</button>
            {
                add ? <NewStrategyConfigs /> : <div></div>
            }
        </div>
    )
}
export default StrategyConfigs