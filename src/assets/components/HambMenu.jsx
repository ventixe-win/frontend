import React, { useState, useRef, useEffect  } from 'react';
import { Link } from 'react-router-dom';

/* Tog hjälp från ChatGPT för att skapa denna hamburgar-menyn */

const HambMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
    const toggleMenu = () => setIsOpen(!isOpen);

    //Hanterar klick utanför menyn, för att stänga den.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);


    return (
        <nav className="navbar-hambmenu" ref={menuRef}>
            <div className="navbar-container">
                <div className="hamburger" onClick={toggleMenu}>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                </div>
                {isOpen && (
                    <div className="menu">
                        <Link className='hambmenu-link' to="/calendar" onClick={() => setIsOpen(false)}>Calendar</Link>
                        <Link className='hambmenu-link' to="/events" onClick={() => setIsOpen(false)}>Events</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default HambMenu;
