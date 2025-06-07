import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  let title = '';

  const handleBack = () => {
    navigate(-1); //Tog hjälp utav ChatGPT för att kunna navigera bak till föregående sida.
  };

  if (path === '/' || path === '') {
    title = 'Events';
  } else if (path === '/events' || path === '/events/') {
    title = 'Events';
  } else if (path.startsWith('/events/details/')) {
    title = (
      <>
        <span onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>Event Details
      </>
    );
  }
  else if (path.startsWith('/events/booking/')) {
    title = (
      <>
        <span onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>Event Booking
      </>
    );
  }
  else if (path.startsWith('/calendar')) {
    title = 'Calendar';
  }
  return (
    <header>
      <h4 className='title'>{title}</h4>
    </header>
  )
}

export default Header