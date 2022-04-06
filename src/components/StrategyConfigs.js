import React, { useState, useEffect } from 'react'
import NewStrategyConfigs from './NewStrategyConfig'
import axios from 'axios'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'


const StrategyConfigs = () => {
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
        push(`/settings/strategy_configs/edit/${id}`)
    }
    const handleDelete = id => {
        
        axios.post('http://localhost:9000/api/strategy/get_strategy_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => setToDelete(res.data[id - 1]))
        .catch(e => console.log(e))
        
        axios.post('http://localhost:9000/api/strategy/delete', toDelete)
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
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
            console.log(res.data)
            if (res.data == 0) {
                setExistConfig(false)
            }
            let newConfigs = []
            for (let i = 0; i < toShow.length; i++) {
                newConfigs[i] = {
                    id: i + 1,           
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
    }, [existConfig])
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
                <ReactFlexyTable data={configsToShow} className='data-table' additionalCols={additionalCols}/>
                :
                <h1>You dont have configs yet</h1>
            }
            <button onClick={handleAdd}>Add New Config from here</button>
            {
                add ? <NewStrategyConfigs /> : <div></div>
            }
        </div>
    )
}
export default StrategyConfigs