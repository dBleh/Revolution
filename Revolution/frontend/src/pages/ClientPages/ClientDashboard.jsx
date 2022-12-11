import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner'


function ClientDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, reset, message, isLoading } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (user.userType !== "Client") { 
      navigate('/clientlogin')
    }
   

    return () => {
      dispatch(reset())
    }
  }, [user, navigate,  message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.userType}</h1>
        <p>Goals Dashboard</p>
        </section>
    </>
  )}


export default ClientDashboard
