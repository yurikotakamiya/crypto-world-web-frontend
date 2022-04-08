import React from 'react'
import UserInfo from './UserInfo'
import { Link } from 'react-router-dom'

const Settings = () => {
   
    return (
        <div className='setting'>
            <div className='setting-title'>
                <h1>Settings</h1>
            </div>            
            <hr width='500' />
            
            <UserInfo />
            
            <hr width='500' />
            <div className='configs'>
                <h2>Configurations</h2>
                <div className='config-setting'>
                    <h3>Exchange API Keys</h3>
                    <Link to={'/settings/api_config'} >
                        <input type='button' className='api-edit-btn' value="Edit"/>
                    </Link>
                </div>
                <div className='config-setting'>
                    <h3>Trading Strategy</h3>
                    <Link to={'/settings/strategy_configs'} className='edit'>
                        <input type='button' className='api-edit-btn' value="Edit"/>
                    </Link>
                </div>
                <div className='config-setting'>
                    <h3>Trading Monitor</h3>
                    <Link to={'/settings/monitor_configs'} >
                        <input type='button' className='api-edit-btn' value="Edit"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Settings