import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeClient, reset, getClients } from '../features/Auth/authSlice'
import { Input, List } from 'antd'

function ClientSearchBar() {

  const dispatch = useDispatch();
  const { user, clients, client } = useSelector((state) => state.auth)
  
  const [searchUser, setSearchUser] = useState('')
  const [isFocused, setIsFocused] = useState(false)
 
  let filteredClients = clients

  const handleChange = (e) => {
    dispatch(getClients(user));
    e.preventDefault()
    setSearchUser(e.target.value)
  }

  const handleFocus = () =>{    
    
    setIsFocused(true)
  } 
  const handleBlur = (event) => {
    if (event.target.className !== 'sItem') {
        setIsFocused(false)
    }
  }
    if (searchUser.length === 0 && isFocused) {
        filteredClients = clients
    } else {
        if(clients > 0){
        filteredClients = clients?.filter((client) => client.name.toLowerCase().includes(searchUser.toLowerCase()))
    }
}
    const handleMouseDown = (client) => {
        dispatch(changeClient(client))
        setSearchUser(client.name)
        dispatch(reset())
    }
    const handleMouseEnter = (event) => {
        event.target.style.backgroundColor = 'lightgray'
    }
    const handleMouseLeave = (event) => {
        event.target.style.backgroundColor = 'transparent'
    }
    
    return (
        <div>
            <Input
                className="sBar"
                type="search"
                placeholder={client ? client.name : "Search here"}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchUser}
            />
            <div className="sBox" style={{ display: isFocused ? 'block' : 'none' }}>
                <List
                    dataSource={filteredClients}
                    renderItem={(client) => (
                        <List.Item onMouseDown={() => handleMouseDown(client)}
                             onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                                    >
                            {client.name.length > 18 ? client.name.substring(0, 15) + '...' : client.name}
                        </List.Item>
                    )}
                    grid={{ gutter: 16, column: 1 }}
                />
            </div>
        </div>
    )
}

export default ClientSearchBar
