import React, { useState, useEffect } from 'react'
import OrderHistory from './OrderHistory'
import axios from 'axios'

const Orders = () => {
    const [ histories, setHistory ] = useState([])
    
    useEffect(() => {
        const user_id = localStorage.getItem('id')
        const sid = localStorage.getItem('sid')
        axios.post(`https://crypto-world-api.herokuapp.com/api/order/history`, {user_id: user_id}, {
            headers:{
                sid: sid,
            }
        })
        .then(res => {
            res.data.map(h => {
                let create = new Date(h['create_time'])
                let update = new Date(h['update_time'])
                h['create_time'] = create.toLocaleString()
                h['update_time'] = update.toLocaleString() 
                return h
            })
            setHistory(res.data)
        })
        .catch(e => console.log(e))
    }, [])

    return (
        <div className='orders-header'>
            <h1>Your Orders</h1>            
            <OrderHistory histories={histories} />
        </div>
    )
}
export default Orders