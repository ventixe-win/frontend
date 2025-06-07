import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import logo from '../images/logotypes/Symbol.svg'
import HambMenu from '../components/HambMenu'

import { useLocation, useNavigate } from 'react-router-dom';


function Nav() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    let title = '';

    const handleBack = () => {
        navigate(-1);
    };

    if (path === '/' || path === '' || path === '/events' || path === '/events/') {
        title = (
            <>
                <div className="mobile-nav-menu">
                    <a href='/'><img className="logo-mobile-title" src={logo} alt="Ventixe logo" /></a>
                    <span className='nav-mobile-title'>Events</span>
                    < HambMenu />
                </div>

            </>
        );
    }
    else if (path.startsWith('/events/details/')) {
        title = (
            <>
                <span className='mobile-nav' onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Event Details
                </span>
            </>
        );
    }
    else if (path.startsWith('/events/booking/')) {
        title = (
            <>
                <span className='mobile-nav' onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className='' />
                    Event Booking
                </span>
            </>
        );
    }

    else if (path.startsWith('/calendar')) {
        title = (
            <>
                <div className="mobile-nav-menu">
                    <a href='/'><img className="logo-mobile-title" src={logo} alt="Ventixe logo" /></a>
                    <span className='nav-mobile-title'>Calendar</span>
                    < HambMenu />
                </div>

            </>
        );
    }


    return (
        <nav>
            <a href="/" className="logo">
                <img src={logo} alt="Ventixe logo" />
                <span className='logo-text'>Ventixe</span>
            </a>
            <span className='mobile-title'>{title}</span>

            <a href="/calendar" className='navlink'> <FontAwesomeIcon icon={faCalendar} className='navlink-logo' /> <span className='navlink-text'>Calendar</span></a>
            <a href="/" className='navlink'> <FontAwesomeIcon icon={faTicket} className='navlink-logo' /> <span className='navlink-text'>Events</span></a>
        </nav>
    )
}

export default Nav