import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactFlexyTable from 'react-flexy-table'
import 'react-flexy-table/dist/index.css'
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const StrategyConfigs = () => {
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
        push(`/settings/strategy_configs/edit/${id}`)
    }
    const handleDelete = id => {        
        push(`/settings/strategy_configs/delete/${id}`)
    }
    

    useEffect(() => {
        axios.post('https://crypto-world-api.herokuapp.com/api/strategy/get_strategy_configs', {}, {
            headers:{
                user_id: user_id,
                sid: sid
            }
        })
        .then(res => {
            let toShow = res.data
            if (toShow == 0) setExistConfig(false)
            else setExistConfig(true)
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
        <div className='config-data'>
            <h1>Strategy Configuration</h1>        
            {
                existConfig ? 
                <ReactFlexyTable data={configsToShow} className='data-table' additionalCols={additionalCols}/>
                :
                <p>You have no strategy configuration data yet...</p> 
            }            
            <Link to={'/settings/new_strategy_configs'} className='add-button-div'>
                <button onClick={handleAdd} className='add-button'>Add a New Config</button>
            </Link> 
            <Link to={'/settings'}>
                <button className='back-btn'>GO BACK TO SETTING</button>
            </Link>            
        </div>
    )
}
export default StrategyConfigs