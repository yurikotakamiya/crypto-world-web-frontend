import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ApiEdit = () => {
    const push = useNavigate();
    
    const { exchange_id } = useParams();
	const [ apiKey, setApiKey ] = useState({
		exchange_id: exchange_id,
        api_key: '',
        secret_key: ''
	});
    const user_id = localStorage.getItem('id')
	const [ exchange_name, setExchange_name] = useState('')
    
	useEffect(() => {
        if(exchange_id == 1) setExchange_name('BINANCE')
        if(exchange_id == 2) setExchange_name('KUCOIN')
        if(exchange_id == 3) setExchange_name('FTX')
    }, [])
	
	const handleChange = (e) => {
        setApiKey({
            ...apiKey,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(apiKey)
        axios.post(`http://localhost:9000/api/setting/modify`, apiKey, {
            headers: {
                user_id: user_id
            }
        })
            .then(res=>{
                setApiKey(res.data);
                push(`/settings`);
			})
			.catch(err=>{
				console.log(err);
			})
	}
	
	const { api_key, secret_key } = apiKey;
    return (
        <div className='ComponentContainer'>
			<div className='ModalContainer'>
				<form onSubmit={handleSubmit}>				
					<h1>Edit {exchange_name} Api Key</h1>																	
						<label className='register-input'>
							<h3>New Api Key</h3>
							<input value={api_key} 
							onChange={handleChange} 
							name="api_key" 
							type="text" 
							className='register-text-box'
							/>
						</label>
				
						<label className='register-input'>
							<h3>New Secret Key</h3>
							<input value={secret_key} 
							onChange={handleChange} 
							name="secret_key" 
							type="text" 
							className='register-text-box'
							/>
						</label>										
					<div className="edit-btn">			    
						<input type="submit" className="api-edit-btn" value="Save"/>
						<Link to={`/settings`}><input type="button" className="api-edit-btn" value="Cancel"/></Link>
					</div>
				</form>
			</div>
        </div>
    )
}

export default ApiEdit
