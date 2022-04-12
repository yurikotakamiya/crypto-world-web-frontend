import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ApiEdit = () => {
    const push = useNavigate()
    const { exchange_id } = useParams()
	const [ exchange_name, setExchange_name] = useState('')
	const [ apiKey, setApiKey ] = useState({
		exchange_id: exchange_id,
        api_key: '',
        secret_key: ''
	});
    const user_id = localStorage.getItem('id')
    const sid = localStorage.getItem('sid')
    
	useEffect(() => {
        if(exchange_id == 1) setExchange_name('BINANCE')
        if(exchange_id == 2) setExchange_name('KUCOIN')
        if(exchange_id == 3) setExchange_name('FTX')
    }, [])
	
	const handleChange = (e) => {
        setApiKey({
            ...apiKey,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()        
        axios.post(`https://crypto-world-api.herokuapp.com/api/apis/modify`, apiKey, {
            headers: {
                user_id: user_id,
				sid: sid
            }
        })
            .then(() => {                
				alert('Your api key was successfully updated.')		
				push(`/settings`);
			})
			.catch(err => console.log(err))
	}
	
	const { api_key, secret_key } = apiKey
    return (
        <div className='ComponentContainer'>
			<div className='ModalContainer'>
				<form onSubmit={handleSubmit} className='text-boxes'>				
					<h1>Edit {exchange_name} Api Key</h1>																	
						<label>
							<h3>New Api Key</h3>
							<input value={api_key} 
							onChange={handleChange} 
							name="api_key" 
							type="text" 
							className='text-box'
							/>
						</label>
				
						<label>
							<h3>New Secret Key</h3>
							<input value={secret_key} 
							onChange={handleChange} 
							name="secret_key" 
							type="text" 
							className='text-box'
							/>
						</label>										
					<div className="edit-btn">			    
						<input type="submit" className='form-btn' value="Save"/>						
					</div>
				</form>
			</div>
        </div>
    )
}

export default ApiEdit
