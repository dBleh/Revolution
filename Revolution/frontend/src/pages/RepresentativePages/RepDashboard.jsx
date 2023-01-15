import { useEffect,useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getPolicies , getCalendarEvents} from '../../features/Auth/authSlice'
import PolicyList from '../../components/PolicyList'

function RepDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [todaysEvents, setTodaysEvents] = useState([]);
  const { user, isError, message, events } = useSelector((state) => state.auth)
  const filteredEventsRef = useRef([]);
  const { policies } = useSelector((state) => state.auth)

 
 
  useEffect(() => {
   
    dispatch(getCalendarEvents(user));
    dispatch(getPolicies(user))
    
    
    if (isError) {
      console.log(message)
    }
    if (user.userType !== "Broker") {
      navigate('/replogin')
    }
    const today = new Date();
    today.setMilliseconds(0)
    today.setSeconds(0)
    today.setMinutes(0)
    if(events){
      filteredEventsRef.current = events.filter(event => {
        const updatedEvent = {...event};
        updatedEvent.day = new Date(event.day).toDateString();
        return updatedEvent.day === today.toDateString();
    });
    }
    setTodaysEvents(filteredEventsRef.current);
   
  
    return () => {
      dispatch(reset())
    }
  
  }, [events, user, navigate, isError, message, dispatch])

 

  return (
    <>
          <section  className='page'>
            <div className='pBox'>
              <PolicyList policies={policies} sortBy="date" />
            </div>
            <div className='nBox'>
              <p>
                News
              </p>
            </div>
            <div className='eBox'>
              <p>
                Todays Events
              </p>
              {todaysEvents.length ? (
                <>
                  {todaysEvents.map(event => <div key={event.id} className="event-info">
                    <p>{event.info} {event.startTime} ----- {event.endTime}</p></div>)}
                </>
              ) : (
                <div>You have no events today</div>
              )}
            </div>
          </section>
        </>
      )
    }

    
    
    
    

export default RepDashboard
