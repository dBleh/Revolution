
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import CalendarForm from '../../components/CalendarForm';
import { addCalendarEvent, deleteCalendarEvent, getCalendarEvents, removeEvent  } from '../../features/Auth/authSlice';
import { Button, Popover } from 'antd';
function RepCalendar() {
    const [value, setValue] = useState(new Date());
    const { user, events } = useSelector((state) => state.auth)
    const [selectedDate, setSelectedDate] = useState("");
    const [openEventList, setOpenEventList] = useState(false);
    const [openAddEvent, setOpenAddEvent] = useState(false);
    const [popoverStyle, setPopoverStyle] = useState({});
    let [eventsOnClickedDay, setEventsOnClickedDay] = useState("")


    const dispatch = useDispatch();

    const onClickDay = (date) => {
        setOpenEventList(true);
        setValue(date)
        setSelectedDate(date);
        if ((eventsOnClickedDay = events.filter((e) => e.day === date.toISOString()))) {
            setEventsOnClickedDay(eventsOnClickedDay)
        }
        
        setPopoverStyle({
            width: "500px",
            
           
        })

    }

    const deleteEvent = (e) =>
{
    dispatch(deleteCalendarEvent(e._id))
    
    setOpenEventList(openEventList => false);
}

    const onHandleChange = (date) => {
        setValue(date)
        dispatch(getCalendarEvents(user))
    }

    const onSubmit = (e) => {
        if(e.startTime){
            e.startTime = e.startTime.format("h:mm A")
        }
        if(e.endTime){
            e.endTime = e.endTime.format("h:mm A")
        }
        e.day = value
        e.repId = user._id
        setOpenAddEvent(false);
        dispatch(addCalendarEvent(e))
        dispatch(getCalendarEvents(user))

    }
    const hideNewEvent = () => {
        setOpenAddEvent(openAddEvent => false);
        setPopoverStyle({
            width: "500px",
            placement:"bottom"
        })
    };
    const newEvent = () =>{
        setOpenAddEvent(openAddEvent => true)

    }
    const hides = () => {
        setOpenEventList(openEventList => false);

    };

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
                            <>{eventFileterd.map((e,index)=> (
                                <p key = {index}>{e.info.length > 9 ? e.info.substring(0,9)+'...' : e.info}</p>
                                    
                                ))}
                                </> : null
                           
                        }
                    }
                    }
                    tileClassName={({ date }) => date.toString() === selectedDate.toString() ? 'selected-tile' : ''}
                />
            </div>
            
            <Popover
                key={openEventList}
                overlayStyle={popoverStyle}
                content={<div>

    
                    {Object.values(eventsOnClickedDay).map((event, index) => (
                        <div key={index}>
                            <p>{event.info}<Button onClick={() => deleteEvent(event)}>x</Button> </p>
                            
                            <p>{event.startTime === '0' ? event.startTime : null }{event.endTime === '0' ? event.endTime : null}</p>
                          
                        </div>))}
                        <Button onClick={newEvent}>Add Event</Button>
                        

                    <Popover
                        key={openAddEvent}
                        content={<div>
                            <CalendarForm onSubmit={onSubmit} />
                            <Button onClick={hideNewEvent}>close</Button>
                        </div>}
                        title="Title"
                        trigger="click"
                        open={openAddEvent}
                        overlayStyle={popoverStyle}

                    >
                    </Popover>
                    <Button onClick={hides}>close</Button>
                </div>

                }

                title="Title"
                trigger="click"
                open={openEventList}



            >
            </Popover>
            </div>

      
    )
}

export default RepCalendar