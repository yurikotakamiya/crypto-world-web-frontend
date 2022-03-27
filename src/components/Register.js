import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const initialFormError = {
    error : {
        username: '',
        password: '',
        confirm_password: '',
        email: ''
    }
}

const Register = () => {
    const push = useNavigate(); 
    const [ state, setState ] = useState({
        username: '',
        password: '',
        confirm_password: '',
        email: ''
    })
    const [ formError, setFormError ] = useState(initialFormError)
    const [ message, setMessage ] = useState('')
    const handleSubmit = e => {
        e.preventDefault();
        let validated = validate()
        if (validated) {
            let stateToSend = {
                username: state.username,
                password: state.password,
                email: state.email
            }
            console.log(stateToSend)
            
            axios.post('https://crypto-world-api.herokuapp.com/api/user/register', stateToSend)
                .then(res => {
                    console.log(res.data)
                    setMessage(res.data)
                    setState({
                        username: '',
                        password: '',
                        confirm_password: '',
                        email: ''
                    })
                    push('/home')
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            push('/register')
        }
    }

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const validate = () => {
        let input = state;
        let errors = {};
        let isValid = true;
    
        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your User Name.";
        }
    
        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
            }
        }
    
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
    
        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }
    
        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
            
            if (input["password"] != input["confirm_password"]) {
            isValid = false;
            errors["password"] = "Passwords don't match.";
            }
        } 
        
        console.log(errors)

        setFormError({
            error : {
            username: errors["username"],
            password: errors["password"],
            confirm_password: errors["confirm_password"],
            email: errors["email"]
            }
        });
        console.log(formError)
        return isValid;
    }

    return (
    <div className="ComponentContainer">
        <div className="ModalContainer">
            <div className="sign-up">
                <h1>Sign Up!</h1>
                <form className="Form" onSubmit={handleSubmit}>
                    <label>
                        User Name
                        <input
                        name="username"
                        type="text"
                        onChange={handleChange}
                        value={state.username}
                        />
                    </label>
                    <div className="text-danger">{formError.error.username}</div>

                    <label>
                        Password
                        <input
                        placeholder="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={state.password}
                        />
                    </label>
                    <div className="text-danger">{formError.error.password}</div>

                    <label>                        
                        <input
                        placeholder="confirm"
                        name="confirm_password"
                        type="password"
                        onChange={handleChange}
                        value={state.confirm_password}
                        />
                    </label>
                    <div className="text-danger">{formError.error.confirm_password}</div>

                    <label>
                        Email
                        <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        />
                    </label>
                    <div className="text-danger">{formError.error.email}</div>
                    <button>Sign Up</button>
                    {
                        message.message ? (<div><h2>{message.message}</h2></div>) : <div></div>
                    }
                </form>                
            </div>
        </div>
    </div>
    )
}
export default Register