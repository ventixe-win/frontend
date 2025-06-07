import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

function EventDetailsPage() {
    const { id } = useParams()

    const [event, setEvent] = useState({})

    const getEvents = async () => {
        const res = await fetch(`https://event-service-htc0aggchbb2abgr.swedencentral-01.azurewebsites.net/api/Events/${id}`)

        if (res.ok) {
            const response = await res.json()
            setEvent(response.result)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <div className='event-details'>
            <div className='event-card'>
                <div className='image-container'>
                    {event.image}
                    <div className="event-category event-category-details">{event.categoryName}</div>
                </div>
                <span className='event-title'>{event.title}</span>
                <span className='event-date'><FontAwesomeIcon icon={faCalendar} />
                    {dayjs(event.eventDate).format('MMM D, YYYY - h:mm A')}
                </span>
                <span className='event-location'><FontAwesomeIcon icon={faLocationDot} />{event.location}</span>
                <div className="divider"></div>
                <span className='event-description'>
                    <p>About Event</p>
                    {event.description}
                </span>
                <Link to={`/events/booking/${id}`} className='book-link btn'>Book Event</Link>
            </div>
        </div>
    )
}

export default EventDetailsPage