import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeClient, reset,getClients } from '../features/auth/authSlice'
import { Input, List } from 'antd'

function ClientSearchBar() {
    const [searchUser, setSearchUser] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const { clients, user } = useSelector((state) => state.auth)

    let filteredClients = clients
    const dispatch = useDispatch()
    const handleChange = (e) => {
        
        e.preventDefault()
        setSearchUser(e.target.value)
    }

    const handleFocus = () =>{
        dispatch(getClients(user))
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
        filteredClients = clients.filter((client) => client.name.toLowerCase().includes(searchUser.toLowerCase()))
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
                placeholder="Search here"
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
