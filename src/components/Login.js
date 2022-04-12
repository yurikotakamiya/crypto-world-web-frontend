import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const push = useNavigate(); 
    const [ state, setState ] = useState({
        username: '', 
        password: ''
    }) 

    const [ error, setError ] = useState('')

    const handleChange = (e) => {
        setState({
            ...state, 
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('https://crypto-world-api.herokuapp.com/api/user/login', state)
        .then(res => {
            localStorage.setItem('id', res.data.user_id);
            localStorage.setItem('sid', res.data.session);
            push('/orders')
        })
        .catch(err => {
            console.log(err)
            setError('your input was invalid')
        });
    };

    return (
        <div>
            <div className="ComponentContainer">      
                <div className="ModalContainer">                                        
                    <form onSubmit={handleSubmit} className='text-boxes'>           
                        <label>
                            <h3>Username</h3>
                            <input 
                            onChange={handleChange} 
                            name="username" 
                            id="username"
                            className='text-box'
                                />
                        </label>                        
                        <label>
                            <h3>Password</h3>
                            <input 
                            onChange={handleChange} 
                            name="password" 
                            type="password" 
                            id="password"
                            className='text-box'
                            />
                        </label>                        
                        {
                            error ? <div className='error-message'>{error}</div> : <div></div>
                        }
                        <button className='form-btn'>Login</button>
                    </form> 
                </div>
            </div>
        </div>
    )
}
export default Login