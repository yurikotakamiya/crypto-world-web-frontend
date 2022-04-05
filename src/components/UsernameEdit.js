import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PasswordEdit = () => {
    const push = useNavigate();
    const sid = localStorage.getItem('sid')
    const { user_id } = useParams();
	const [ username, setUsername ] = useState('')  
	const [ error, setError ] = useState('')
	
	const handleChange = (e) => {
        setUsername(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();        
        axios.post(`http://localhost:9000/api/user/change_username`, {username: username}, {
            headers: {
                user_id: user_id,
				sid: sid
            }
        })
            .then(res => {
                setUsername(res.data)
                push('/settings')
			})
			.catch(() => {
				setError('input was invalid')
			})
	}
    return (
        <div className='ComponentContainer'>
			<div className='ModalContainer'>
				<form onSubmit={handleSubmit}>				
					<h1>Edit Username</h1>	
						<label className='register-input'>
							<h3>New Username</h3>
							<input value={username} 
							onChange={handleChange} 
							name='username' 
							type='text'
							className='register-text-box'
							/>
						</label>				
					<div className='edit-btn'>			    
						<input type='submit' className="api-edit-btn" value="Save"/>
						<Link to={`/settings`}><input type="button" className="api-edit-btn" value="Cancel"/></Link>
						<div className="error-message">{error}</div>
					</div>
				</form>
			</div>
        </div>
    )
}

export default PasswordEdit
