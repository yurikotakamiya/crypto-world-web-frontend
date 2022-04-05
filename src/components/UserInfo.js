import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

const UserInfo = props => {
    const { user } = props    

    return (
        <div className='user-infos' key={user.user_id}>
            <h3>User Name: {user.username}</h3>
            <Link to={`/settings/username/${user.user_id}`} className='edit'>
                <input type='button' className='api-edit-btn' value="Edit"/>
            </Link>
            <h3>Email : {user.email}</h3>
            <Link to={`/settings/email/${user.user_id}`} className='edit'>
                <input type='button' className='api-edit-btn' value="Edit"/>
            </Link>
            <h3>Password: ********************</h3>
            <Link to={`/settings/password/${user.user_id}`} className='edit'>
                <input type='button' className='api-edit-btn' value="Edit"/>
            </Link>
            <div>
            </div>
        </div>    
        )
    }
    
export default UserInfo

UserInfo.propTypes = {
    user: PropTypes.array,
}