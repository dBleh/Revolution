import { useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getPolicies } from '../../features/auth/authSlice'
import PolicyList  from '../../components/PolicyList'

function RepDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, message } = useSelector((state) => state.auth)
  const {policies} = useSelector((state)=>state.auth)
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (user.userType !== "Broker") {
      navigate('/replogin')
    }
    
    dispatch(getPolicies(user))
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  return (
    <>
      
      
      <section className='page'>
        <div className='box'>
          <div className ='heading'>
           
            <div className='pBox'>
            <PolicyList policies={policies}  sortBy="date" />
            </div>
          
          </div>

        </div>
      </section>
      
      
    </>
  )
}

export default RepDashboard
