import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bitcoinImg from '../images/bitcoin.jpeg'
import phoneImg from '../images/phone.jpeg'
import tryoutImg from '../images/tryout.jpeg'
import Footer from './Footer'
import axios from 'axios'
const Home = () => {
    const push = useNavigate()

    const handleClick = () => {
        push('/register')
    }
    const [ state, setState ] = useState({
        firstName: '',
        lastName: '',
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
            firstName: '',
            lastName: '',
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
                <button onClick={handleClick} className='btn-register'>Create Free Account</button>
            </div>
            <div className='description-container'>
                <div className='home-body'>
                    <div className='description'>
                        <h1>Who we are?</h1>
                        <p>We are the Crypto World.</p>
                        <p>We can make your investment into crypto more efficient.</p>
                    </div>
                    <img src={bitcoinImg} width='500' alt='bitcoin' />                
                    <img src={phoneImg} width='500' alt='phone' />                
                    <div className='description'>
                        <h1>What we can do for You?</h1>
                        <p>We send notification based on your investment strategies.</p>
                        <p>You can select a strategy that suits your need for your trade.</p>
                    </div>
                    <div className='description'>
                        <h1>Not sure how to utilize it?</h1>
                        <p>It is not difficult to use it at all.<br />You can first try out by using our demo user.</p>
                        <p>Demo username: testuser<br />Password: 1234</p>
                        <p>If you have any question about how to use.<br />You can reach out to us any time you want from the form down below.</p>
                    </div>
                    <img src={tryoutImg} width='500' alt='tryout' />
                </div>
            </div>
            <div className='middle-button'>
                <button onClick={handleClick} className='btn-register'>Start Trade</button>
            </div>
            <div className='home-contact'>
                <div className='contact-us'>
                    <div className='contact-info'>
                        <h1>Contact info</h1>                        
                        <p>1234 Main Street
                        Somewhere NY</p>
                        <p>New York 12345</p>
                        <a href='tel:+1-123-456-7890'>123-456-7890</a>
                        <a href='mailto:info@cryptoWorld.com'>info@cryptoWorld.com</a>
                    </div>
                    <div className='contact-form'>
                        <form onSubmit={handleSubmit}>          
                            <label>
                                <h2>Input your name</h2>
                                <input
                                name='firstName'
                                type='firstName'
                                onChange={handleChange}
                                className='small-input'
                                placeholder='First Name'
                                value={state.firstName}
                                />
                            </label>
                                <input
                                name='lastName'
                                type='lastName'
                                onChange={handleChange}
                                className='small-input'
                                placeholder='Last Name'
                                value={state.lastName}
                                />                            
                            <label>
                            <h2>Input your email</h2>
                                <input
                                name='email'
                                type='email'
                                placeholder='Email'
                                className='small-input'
                                onChange={handleChange}
                                value={state.email}
                                />
                            </label>
                            <label>
                            <h2>Ask us any questions!</h2>
                                <input 
                                name='message'
                                type='text'
                                className='message'
                                onChange={handleChange}
                                value={state.message}
                                placeholder='Write something here.'
                                />
                            </label>
                            <button className='small-btn'>SEND</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />  
        </div>
    )
}

export default Home