import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PortalLayout from './assets/layouts/PortalLayout'
import EventsPage from './assets/pages/EventsPage'
import EventDetailsPage from './assets/pages/EventDetailsPage'
import BookingEventPage from './assets/pages/BookingEventPage'
import CalendarPage from './assets/pages/CalendarPage'

function App() {
  return (
    <Routes>
      <Route element={<PortalLayout />}>
        <Route path="/" element={<EventsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/details/:id" element={<EventDetailsPage />} />
        <Route path="/events/booking/:id" element={<BookingEventPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  )
}

export default App
