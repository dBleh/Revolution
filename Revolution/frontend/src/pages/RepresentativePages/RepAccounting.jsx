
import { useSelector } from 'react-redux'
import React from 'react';

function RepAccounting() {
  const {client} = useSelector((state)=>state.auth)
    return (
      <div>
        
      <p>{client ? client.name : "No Client selected "}</p>
      </div>
     
    )
  }
  
  export default RepAccounting