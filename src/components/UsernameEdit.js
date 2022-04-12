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
        axios.post(`https://crypto-world-api.herokuapp.com/api/user/change_username`, {username: username}, {
            headers: {
                user_id: user_id,
				sid: sid
            }
        })
            .then(() => {
				alert('Your username was successfully changed.')		
				push('/settings')
		})
			.catch(() => setError('input was invalid'))
	}
    return (
        <div className='ComponentContainer'>
			<div className='ModalContainer'>
				<form onSubmit={handleSubmit} className='text-boxes'>				
					<h1>Edit Username</h1>	
						<label>
							<h3>New Username</h3>
							<input 
							value={username} 
							onChange={handleChange} 
							name='username' 
							type='text'
							placeholder='Username'
							className='text-box'
							/>
						</label>									
					<input type='submit' className='form-btn' value="Save"/>
					<Link to={`/settings`}>
						<input type="button" className='form-cancel-btn' value="Cancel"/>
					</Link>
				
					<div className="error-message">{error}</div>
				</form>
			</div>
        </div>
    )
}

export default PasswordEdit
