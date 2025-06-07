import React from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function PortalLayout() {
    return (
        <div className='portal-wrapper'>
            <Nav />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default PortalLayout