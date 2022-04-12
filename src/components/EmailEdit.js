import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PasswordEdit = () => {
    const push = useNavigate();
    const sid = localStorage.getItem('sid')
    const { user_id } = useParams()
	const [ email, setEmail ] = useState('')   
	const [ error, setError ] = useState('')
	
	const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`https://crypto-world-api.herokuapp.com/api/user/change_email`, {email: email}, {
            headers: {
                user_id: user_id,
				sid: sid
            }
        })
            .then(() => {
				alert('Your password was successfully changed.')
                push(`/settings`)
			})
			.catch(() => setError('input was invalid'))
	}
    
    return (
        <div className='ComponentContainer'>
			<div className='ModalContainer'>
				<form onSubmit={handleSubmit} className='text-boxes'>				
					<h1>Edit Email Address</h1>				
						<label>
							<h3>New Email</h3>
							<input value={email} 
							onChange={handleChange} 
							name='email'
							type='email' 
							className='text-box'
							placeholder='Email'
							/>
						</label>							
					<input type='submit' className='form-btn' value="Save"/>
					<Link to={`/settings`}><input type="button" className='form-cancel-btn' value="Cancel"/></Link>					
					<div className="error-message">{error}</div>
				</form>
			</div>
        </div>
    )
}

export default PasswordEdit
