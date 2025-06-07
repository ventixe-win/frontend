import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function BookingEventPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [event, setEvent] = useState({})
    const [formData, setFormData] = useState({ eventId: id, firsName: '', lastName: '', email: '', streetName: '', postalCode: '', city: '', ticketQuantity: 1 })

    useEffect(() => {
        getEvent()
    }, [])

    const getEvent = async () => {
        try {
            const res = await fetch(`https://event-service-htc0aggchbb2abgr.swedencentral-01.azurewebsites.net/api/Events/${id}`)
            if (!res.ok) throw new Error("Failed to fetch event")

            const response = await res.json()
            setEvent(response.result)
        } catch (err) {
            console.log(err)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`https://booking-service-deb8exangxb5chcq.swedencentral-01.azurewebsites.net/api/bookings`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                console.error("Booking failed")
            } else {
                console.log("Booking successful")
                navigate('/')
            }
        } catch (err) {
            console.error("Error submitting booking", err)
        }
    }

    const handleChange = async (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        getEvent()
    }, [])

    return (
        <div className='booking'>
            <h1>Book Event - {event.title}</h1>
            <div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className='form-box'>
                        <label>First Name</label>
                        <input className='form-input' type="text" name='firstName' value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className='form-box'>
                        <label>Last Name</label>
                        <input className='form-input' type="text" name='lastName' value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className='form-box'>
                        <label>Email</label>
                        <input className='form-input' type="email" name='email' value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='form-box'>
                        <label>Street Name</label>
                        <input className='form-input' type="text" name='streetName' value={formData.streetName} onChange={handleChange} required />
                    </div>
                    <div className='form-box'>
                        <label>Postal Code</label>
                        <input className='form-input' type="text" name='postalCode' value={formData.postalCode} onChange={handleChange} required />
                    </div>
                    <div className='form-box'>
                        <label>City</label>
                        <input className='form-input' type="text" name='city' value={formData.city} onChange={handleChange} required />
                    </div>
                    <button className='btn btn-booking' type='submit'>Book Now</button>
                </form>
            </div>
        </div>
    )
}

export default BookingEventPage