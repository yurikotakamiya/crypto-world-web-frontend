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

    useEffect(() => {
        axios.post(`http://localhost:9000/api/setting/edit/${exchange_id}`, {}, {
            headers: {
                user_id: user_id
            }
        })
        .then(res => {
            console.log(res.data)
        })
	}, [exchange_id]);
	
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
        <div>
            <form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing <strong>{exchange_id}</strong></h4>
				</div>
				<div className="modal-body">
					<div className="form-group">
						<label>Exchange Id</label>
						<input value={exchange_id} onChange={handleChange} name="exchange_id" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>New Api Key</label>
						<input value={api_key} onChange={handleChange} name="api_key" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>New Secret Key</label>
						<input value={secret_key} onChange={handleChange} name="secret_key" type="text" className="form-control"/>
					</div>
				</div>
				<div className="modal-footer">			    
					<input type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/settings`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
        </div>
    )
}

export default ApiEdit
