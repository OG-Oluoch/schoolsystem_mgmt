import { Calendar, dateFnsLocalizer } from 'react-big-calendar' 
import { format, parse, startOfWeek, getDay } from 'date-fns' 
import { enUS } from 'date-fns/locale' 
import 'react-big-calendar/lib/css/react-big-calendar.css' 
import { useCalendarEvents } from '../hooks/useCalendarEvents' 

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales: { 'en-US': enUS } }) 

const eventStyleGetter = (event) => ({ 
    style: { backgroundColor: { 
    exam: '#2563EB', holiday: '#16A34A', meeting: '#D97706', 
    sport: '#7C3AED' }[event.type] || '#6B7280', borderRadius: '4px', color: '#fff' } 
}) 

export default function SchoolCalendar() { 
    
    const { events, isLoading } = useCalendarEvents() 
    const { mutateAsync: createEvent } = useCreateEvent() 
    
    return ( 
    <Calendar localizer={localizer} 
    events={events} startAccessor="start" 
    endAccessor="end" style={{ height: 600 }} 
    eventPropGetter={eventStyleGetter} 
    onSelectSlot={({ start, end }) => openCreateModal({ start, end })} 
    onSelectEvent={(ev) => openDetailModal(ev)} selectable /> ) 
}