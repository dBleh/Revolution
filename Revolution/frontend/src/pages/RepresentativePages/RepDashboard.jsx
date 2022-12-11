import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Client from '../../components/ClientList'
import Spinner from '../../components/Spinner'
import { getClients, reset } from '../../features/auth/authSlice'


function RepDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, message, isLoading } = useSelector((state) => state.auth)
  const { clients } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (user.userType !== "Broker") {
      navigate('/replogin')
    }
    dispatch(getClients())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.userType}</h1> 
      </section>
      <section className = 'page'>
      <p>Dashboard</p>
      </section>  
        {clients.length > 0 ? (
          <div className='renewals'>
            {clients.map((client) => (
              <Client key={client._id} client={client} />
            ))}
          </div>
        ) : (
          <h3>You have no clients</h3>
        )}
     
    </>
  )
}

export default RepDashboard
