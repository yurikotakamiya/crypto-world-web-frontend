import React from 'react'
import { PropTypes } from 'prop-types'
import { Routes } from 'react-router-dom'
import ApiEdit from './ApiEdit'
import { useNavigate } from 'react-router-dom'

// import ReactFlexyTable from 'react-flexy-table'
// import 'react-flexy-table/dist/index.css'
// import * as AiIcons from 'react-icons/ai'

const ApiKeys = props => {
    const { api } = props
    const push = useNavigate(); 

    const handleClick = e => {
        console.log(e.target)
        push('/settings')
    }    
    return (
        <div>
            
            {
                api.map((a, idx) => {
                    return (
                        <div key={idx} className='api-keys' value={idx}>
                            <h3>Exchange: {a.exchange_id}</h3>
                            <p>Api Key: {a.api_key}</p>
                            <p>Secret Key: {a.secret_key}</p>
                            <button onClick={() => handleClick(a)}>Edit</button>
                        </div>
                    )
                })
            }
        <Routes path={`/settings/edit/:api_id`} element={<ApiEdit />} className="edit-api" />
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