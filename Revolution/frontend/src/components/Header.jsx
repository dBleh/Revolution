import { FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/Auth/authSlice'
import ClientSearchBar from '../components/ClientSearchForm'


function Header() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { user, client } = useSelector((state) => state.auth)
  
 
   const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/homepage')
   }
   return (
      <header className='header'>
         <ul>
            {!user ? (
               <>
                  <div className='logo'><Link to='/homepage'>Revo  </Link></div>                 
                  <ul>
                     <li><Link to='/clientlogin'>Client Login</Link></li>
                     <li><Link to='/replogin'>Broker Login</Link></li>
                     <li><Link to='/repregister'>Broker Registeration</Link></li>
                  </ul>
               </>//if the user type is of type client, present these pages.
            ) : user.userType === "Client"  ? (
               <>
                  <div className='logo'>
                     <Link to='/clientdashboard'>{user.name}</Link></div>                     
                  <ul>
                     <li><Link to='/renewal'>Renewals</Link></li>
                     <li><Link to='/policies'>Policies</Link></li>
                     <li><Link to='/submissions'>Submissions</Link></li>
                     <li><Link to='/certificates'>Certificates</Link></li>
                     <li><Link to='/proposals'>Proposals</Link></li>
                     <li><Link to='/accounthistory'>Account History</Link></li>
                     <li><Link to='/contacts'>Contacts</Link> </li>
                     <li><Link to='/claims'>Claims </Link>  </li>
                     <li> <Link to='/invoices'>Invoices</Link>
                     </li><button className='logBtn' onClick={onLogout}>{user.name} logout</button>
                  </ul>
               </>
            ) : user.userType === "Broker" ? (
               <>
                  <div className='logo'><Link to='/repdashboard'>R</Link></div>                
                  <ul>                     
                     <li><Link to='/repaccounting'>Accounting</Link></li>
                     <li><Link to='/repclaims'>Claims</Link></li>
                     <li><Link to='/repcontacts'>Contacts</Link></li>
                     <li><Link to='/repcoverages'>Coverages</Link></li>
                     <li><Link to='/repdocuments'>Documents</Link></li>
                     <li><Link to='/rephistory'>History</Link></li>
                     <li><Link to='/repriskmanagement'>Contacts</Link></li>
                     <li><Link to='/repstatus'>Status</Link></li>
                     <li><Link to='/repsubmissions'>Submissions</Link></li>
                     <li><Link to='/registerclient'>Register Client</Link></li>
                     <li><ClientSearchBar /></li>
                     <li>{client ? client.name.length > 18 ? client.name.substring(0, 15) + '...' : client.name : ""}</li>
                     <button className='logBtn' onClick={onLogout}>{user.name} logout</button>
                  </ul>
               </>
            ) : (
               <li><button className='btn' onClick={onLogout}><FaSignOutAlt />Logout</button></li>
            )}
         </ul>
      </header>
   )
}

export default Header
