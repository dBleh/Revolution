
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import CalendarForm from '../../components/CalendarForm';
import Popup from '../../components/Popup';
import { addCalendarEvent, deleteCalendarEvent, getCalendarEvents } from '../../features/Auth/authSlice';
import { Button } from 'antd';
function RepCalendar() {
    const [value, setValue] = useState(new Date());
    const { user, events } = useSelector((state) => state.auth)
    const [selectedDate, setSelectedDate] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [eIsOpen, setEIsOpen] = useState(true);

    let [eventsOnClickedDay, setEventsOnClickedDay] = useState("")
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const dispatch = useDispatch();

    const onClickDay = (date) => {
        setValue(date)
        setSelectedDate(date);
        setEIsOpen(false)
        setIsOpen(!isOpen);
        if ((eventsOnClickedDay = events.filter((e) => e.day === date.toISOString()))) {
            setEventsOnClickedDay(eventsOnClickedDay)
        }

     

    }

    const deleteEvent = (e) => {
        dispatch(deleteCalendarEvent(e._id))
    }

    const onHandleChange = (date) => {
        setValue(date)
        dispatch(getCalendarEvents(user))
    }

    const onSubmit = (e) => {
        if (e.startTime) {
            e.startTime = e.startTime.format("h:mm A")
        }
        if (e.endTime) {
            e.endTime = e.endTime.format("h:mm A")
        }
        e.day = value
        e.repId = user._id
        setIsOpen(!isOpen);
        dispatch(addCalendarEvent(e))
        dispatch(getCalendarEvents(user))

    }
    
    const newEvent = () => {
        setEIsOpen(!eIsOpen)
    }
   

    return (
        <div>
            <div className='react-calendar'>
                <Calendar
                    value={value}
                    view={'month'}
                    onClickDay={onClickDay}
                    onChange={onHandleChange}
                    tileContent={({ date }) => {
                        if (events) {
                            let eventFileterd = events.filter((e) => e.day === date.toISOString())
                            return eventFileterd ?
                                <>{eventFileterd.map((e, index) => (
                                    <p key={index}>{e.info.length > 9 ? e.info.substring(0, 9) + '...' : e.info}</p>

                                ))}
                                </> : null

                        }
                    }
                    }
                    tileClassName={({ date }) => date.toString() === selectedDate.toString() ? 'selected-tile' : ''}
                />
            </div>

             

            {isOpen && <Popup
                content={<div>

                
                                    {Object.values(eventsOnClickedDay).map((event, index) => (
                        <div key={index}>
                            <p>{event.info}<Button onClick={() => deleteEvent(event)}>x</Button> </p>
                            <p>{event.startTime === '0' ? event.startTime : null}{event.endTime === '0' ? event.endTime : null}</p>


                        </div>
                        
                        
                    ))}
                    
                    {eIsOpen ? 
                    <CalendarForm onSubmit={onSubmit} />:
                    <Button onClick={newEvent}>add event</Button>
                    }
                    </div>}
                    

                handleClose={togglePopup}
            />}
        </div>


    )
}

export default RepCalendar