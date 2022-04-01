import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// import ReactFlexyTable from 'react-flexy-table'
// import 'react-flexy-table/dist/index.css'
// import * as AiIcons from 'react-icons/ai'

const ApiKeys = props => {
    const { exchange_id, api_key, secret_key } = props.api
    console.log(props.api, exchange_id, api_key, secret_key)
    return (
        <div key={exchange_id}>
            <div>Exchange Id: {exchange_id}</div>
            <div>Api Key: {api_key}</div>
            <div>Secret Key: {secret_key}</div>
            <div>
            <Link to={`/settings/${exchange_id}`} className='edit'>
                <input type='button' className='api-edit-button' value="Edit"/>
            </Link>
            </div>
        </div>    
        )
    }
    
export default ApiKeys

ApiKeys.propTypes = {
    api: PropTypes.array,
}
{/* <div>
    <ReactFlexyTable data={api} className='api-keys' additionalCols={additionalCols}/>    
</div> */}
// const additionalCols = [
//     {
//       header: 'Actions',
//       td: (data) => {
//         return (
//           <div>
//             <div onClick={() => alert('this is delete for id ' + data.id)} >
//               {<AiIcons.AiOutlineDelete />}                  
//             </div>
            
//             <div onClick={() => alert('this is edit for id ' + data.id)}>
//               {<AiIcons.AiOutlineEdit />}                                   
//             </div> 
//           </div>
//         )
//       }
//     }
//   ]