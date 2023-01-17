import { useSelector, useDispatch } from 'react-redux'
import { getClientContactInfo } from "../../features/Auth/authSlice"
import { useEffect,useState} from 'react'
function RepContacts() {
  const {client, contacts} = useSelector((state) => state.auth)
  const [allContacts, setAllContacts] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getClientContactInfo(client))
    setAllContacts(contacts)
    
  },[contacts,client , dispatch])
 
  
    return (
      <div>
        {allContacts ? allContacts.map(index => <div key={index.id}>
          <p>{index.legalEntityName  + " "}{index.email + " "}{index.phoneNumber}</p>
          
          </div>): "no contact info"}
      </div>
    ) 
  }
  
  export default RepContacts