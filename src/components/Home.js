import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Home = () => {
    const push = useNavigate()

    const handleClick = () => {
        push('/register')
    }
    const [ state, setState ] = useState({
        name: '',
        message: '',
        email: ''    
    })
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.post(``, state)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        setState({
            name: '',
            message: '',
            email: ''
        })
    }
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div className='home'>
            <div className='header-photo'>                
                <h1>Trade While You Sleep</h1>
                <p>We make your investment in crypto so much easier for you.
                    Do you want to know how? Sign up now and make it happen!</p>
                <button onClick={handleClick} className='btn-register'>Start Trade</button>
            </div>
            <div className='home-body'>
                <h1>Who we are?</h1>
                <p>We are the Crypto World.</p>
                <p>We can make your investment into crypto more efficient.</p>
                <h1>What we can do for You?</h1>
                <p>We send notification based on your investment strategies.</p>
                <p>You can select a strategy that suits your need for your trade.</p>
                <h1>Not sure how to utilize it?</h1>
                <p>It is not difficult to use it at all.</p>
                <p>You can first try out by using our demo user.</p>
                <p>Demo username: testuser</p>
                <p>Password: 1234</p>
                <p>If you have any question about how to use.</p>
                <p>You can reach out to us any time you want from the form down below.</p>
                <button onClick={handleClick} className='btn-register'>Start Trade</button>

                <div className='contact-us'>
                    <div className='contact-info'>
                        <h3>Contact info</h3>                        
                        <p>1234 Main Street
                        Somewhere NY</p>
                        <p>New York 12345</p>
                        <div><a href='tel:+1-123-456-7890'>123-456-7890</a></div>
                        <div><a href='mailto:info@cryptoWorld.com'>info@cryptoWorld.com</a></div>
                    </div>
                    <div className='contact-form'>
                        <form onSubmit={handleSubmit}>          
                            <label>
                            <h3>Input your name</h3>
                            <input
                                name='name'
                                type='name'
                                onChange={handleChange}
                                placeholder='First-name Last-name'
                                value={state.name}
                                />
                            </label>
                            <label>
                            <h3>Input your email</h3>
                            <input
                                name='email'
                                type='email'
                                placeholder='Email'
                                onChange={handleChange}
                                value={state.email}
                                />
                            </label>
                            <label>
                            <h3>Ask us any questions!</h3>
                                <input 
                                name='message'
                                type='text'
                                className='message'
                                onChange={handleChange}
                                value={state.message}
                                placeholder='Write something here.'
                                />
                            </label>
                            <button className='submit-btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home