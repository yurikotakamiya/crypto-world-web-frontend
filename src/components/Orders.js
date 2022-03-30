import React, { useState } from 'react'
import OrderHistory from './OrderHistory'
import axios from 'axios'

const Orders = () => {

    const [ state, setState ] = useState({
        strategy_id: '',
        trading_pair_id: '',
        order_side_id: '',
        order_type_id: ''
    })
    const [ history, setHistory ] = useState([])
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`https://crypto-world-api.herokuapp.com/api/order/history/:user_id`, state)
            .then(res => {
                console.log(res.data)
                setHistory(res.data)
            })
            .catch(e => console.log(e))
    }

    return (
        <div className='orders'>
            <div className='search-bar'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Strategy:
                        <select
                        name='strategy'
                        type='text'
                        value={state.strategy}
                        onChange={handleChange}
                        >
                            <option value=''>-- Select Strategy --</option>
                            <option value='1'>example1</option>                            
                        </select>
                    </label>
                    <label>
                        Trading Pair:
                        <select
                        name='trading_pair'
                        type='text'
                        value={state.trading_pair}
                        onChange={handleChange}
                        >
                            <option value=''>-- Select Trading Pair --</option>
                            <option value='1'>BTCUSDT</option>
                            <option value='2'>ETHUSDT</option>
                            <option value='3'>BTCPERP</option>
                            <option value='4'>ETHPERP</option>
                        </select>
                    </label>
                    <label>
                        Order Side:
                        <select
                        name='order_side_id'
                        type='text'
                        value={state.order_side_id}
                        onChange={handleChange}
                        >
                            <option value=''>-- Select Order Side --</option>
                            <option value='1'>Buy</option>
                            <option value='2'>Sell</option>
                            <option value='3'>Sell Short</option>                            
                        </select>
                    </label>
                    <label>
                        Order Side:
                        <select
                        name='order_type_id'
                        type='text'
                        value={state.order_type_id}
                        onChange={handleChange}
                        >
                            <option value=''>-- Select Order Type --</option>
                            <option value='1'>Day Order</option>
                            <option value='2'>IOC(Immediate-or-cancel) Order</option>
                            <option value='3'>FOK(Fill-or-kill) Order</option>
                        </select>
                    </label>
                    <button>Search History</button>
                </form>
            </div>
            <OrderHistory history={history} />
        </div>
    )
}
export default Orders