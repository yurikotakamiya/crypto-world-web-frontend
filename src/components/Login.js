import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const push = useNavigate(); 
    const [ state, setState ] = useState({
        username: '', 
        password: ''
    }); 

    const handleChange = (e) => {
        setState({
            ...state, 
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:9000/api/user/login', state)
        .then(res => {
            localStorage.setItem('id', res.data.user_id);
            localStorage.setItem('sid', res.data.session);
            push('/orders')
        })
        .catch(err => {
            console.log(err)
        });
    };

    return (
        <div>
            <div className="ComponentContainer">      
                <div className="ModalContainer">                                        
                    <form onSubmit={handleSubmit}>
                    <h1>Login</h1>                        
                        <label className='register-input'>
                            <h3>Username</h3>
                            <input 
                            onChange={handleChange} 
                            name="username" 
                            id="username"
                            className='register-text-box'
                                />
                        </label>                        
                        <label className='register-input'>
                            <h3>Password</h3>
                            <input 
                            onChange={handleChange} 
                            name="password" 
                            type="password" 
                            id="password"
                            className='register-text-box'
                            />
                        </label>                        
                        <button className='submit-btn'>Login</button>
                    </form> 
                </div>
            </div>
        </div>
    )
}
export default Login