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
        console.log(state)
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
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input onChange={handleChange} name="username" id="username" />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input onChange={handleChange} name="password" type="password" id="password" />
                        </div>
                        <button>Login</button>
                    </form>                                
                </div>
            </div>
        </div>
    )
}
export default Login