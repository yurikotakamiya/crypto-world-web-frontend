import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

function PrivateRoute({component:Component, ...rest}) {
  
  return (<Route {...rest} render={()=>{
    if(localStorage.getItem('sid')){
      return <Component/>
    } else {
      return <Redirect to='/' />
    }
  }}/>)
}

export default PrivateRoute