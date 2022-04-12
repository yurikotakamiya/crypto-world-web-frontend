import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PasswordEdit = () => {
    const push = useNavigate();
    const sid = localStorage.getItem('sid')
    const { user_id } = useParams();
	const [ password, setPassword ] = useState({
        current_password: '',
        new_password:'',
        confirm_password: ''
	})   
	const [ error, setError ] = useState({})
	const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
		let validated = validate()
        if (validated) {
			let passwordToSend = {
				password: password.current_password,
				newPass: password.new_password
			}
			axios.post(`https://crypto-world-api.herokuapp.com/api/user/change_password`, passwordToSend, {
				headers: {
					user_id: user_id,
					sid: sid
				}
			})
				.then(() => {			
					alert('Your password was successfully changed.')		
					push(`/settings`)
				})
				.catch(() => setError({current_password: 'current password is invalid'}))
		} else {
			push(`/settings/password/${user_id}`)
		}
	}
    const validate = () => {
        let input = password
        let errors = {}
        let isValid = true
        
		if (!input['current_password']) {
            isValid = false
            errors['current_password'] = 'Please enter your current password.'
        }    
		if (!input['new_password']) {
            isValid = false
            errors['new_password'] = 'Please enter your new password.'
        }    
        if (!input['confirm_password']) {
            isValid = false
            errors['confirm_password'] = 'Please enter your confirm password.'
        }    
        if (typeof input['new_password'] !=='undefined' && typeof input['confirm_password'] !== 'undefined') {            
            if (input['new_password'] != input['confirm_password']) {
            isValid = false
            errors['confirm_password'] = 'Passwords don\'t match.'
            }
        }         
        setError({      
            current_password: errors['current_password'],
            new_password: errors['new_password'],
            confirm_password: errors['confirm_password']            
        })
        return isValid
    }
	const { current_password, new_password, confirm_password } = password

    return (
        <div className='ComponentContainer'>
			<div className='ModalContainer'>
				<form onSubmit={handleSubmit} className='text-boxes'>				
					<h1>Edit Password</h1>																						
                        <label>
							<h3>Current Password</h3>
							<input value={current_password} 
							onChange={handleChange} 
							name='current_password'
							type='password' 
							className='text-box'
							/>
						</label>
                        <label>
							<h3>New Password</h3>
							<input value={new_password} 
							onChange={handleChange} 
							name='new_password'
							type='password'
                            placeholder='new password' 
							className='text-box'
							/>
                            <input value={confirm_password} 
							onChange={handleChange} 
							name='confirm_password'
							type='password'
                            placeholder='confirm' 
							className='text-box'
							/>
						</label>					
					<button className='form-btn'>Save</button>
					<Link to={`/settings`}><button className='form-cancel-btn' value="Cancel">Cancel</button></Link>					
					<div className="error-message">{error.current_password}</div>
					<div className="error-message">{error.new_password}</div>
					<div className="error-message">{error.confirm_password}</div>
				</form>
			</div>
        </div>
    )
}

export default PasswordEdit
