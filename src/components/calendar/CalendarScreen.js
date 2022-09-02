import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-esp';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { AddNewFab } from '../ui/AddNewFab';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);

// const events = [
//     {
//         cantidad: '',
//         usuario: '',
//         elemento: '',
//         observaciones: '',
//         start: moment().toDate(),
//         end: moment().add(2, 'hours').toDate(),
//         user:{
//             _id:'123',
//             name: 'fernando'
//         }
//     }
// ]

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const {uid }= useSelector(state => state.auth)

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive( e ))
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.usuarioId)? "#367CF7" : '#465660',
            borderRadius: "0px",
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        };
    }

    const onSelectSlot = (e)=>{
        dispatch(eventClearActiveEvent(e))
    }

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={
                    {
                        event: CalendarEvent
                    }
                }
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                selectable={true}
                onSelectSlot={onSelectSlot}
            />
            <AddNewFab />
            {
                activeEvent && <DeleteEventFab />
            }
            
            <CalendarModal />
        </div>
    )
}
