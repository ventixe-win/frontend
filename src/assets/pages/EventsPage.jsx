import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'

function EventsPage() {
    const [events, setEvents] = useState([])

    const getEvents = async () => {
        const res = await fetch("https://event-service-htc0aggchbb2abgr.swedencentral-01.azurewebsites.net/api/Events")

        if (res.ok) {
            const response = await res.json()
            setEvents(response.result)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <div>
            {
                events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))
            }
        </div>
    )
}

export default EventsPage

