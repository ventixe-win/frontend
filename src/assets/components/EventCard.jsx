import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

function EventCard({ event }) {
  return (
    <Link className='event-link' to={`/events/details/${event.id}`}>
      <div className='event-card'>
        <div className='image-container'>{event.image}</div>
        <span className='event-category'>{event.categoryName}</span>
        <span className='event-title'>{event.title}</span>
        <span className='event-description'>{event.description}</span>
        <span className='event-location'><FontAwesomeIcon icon={faLocationDot} />{event.location}</span>
        <span className='event-date'><FontAwesomeIcon icon={faCalendar} />
          {dayjs(event.eventDate).format('MMM D, YYYY - h:mm A')}
        </span>
        
      </div>
    </Link>
  )
}

export default EventCard