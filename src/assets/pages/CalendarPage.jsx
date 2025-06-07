import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useNavigate } from 'react-router-dom';

//Tog hjälp från ChatGPT för att skapa en kalender.

const locales = { 'en-US': enUS };

//Localizer som används av kalendern för formatet på datum, start på veckan osv.
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([]); //State för att spara alla events.
  const [date, setDate] = useState(new Date()); //State för att hålla reda på vilken månad & datum som visas.

  //useEffect för att hämta event data från APIt
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(
        "https://event-service-htc0aggchbb2abgr.swedencentral-01.azurewebsites.net/api/Events"
      );
      const data = await response.json();
      //Mappar över datat till ett format som kalendern förstår.
      const mappedEvents = data.result.map((e) => ({
        id: e.id,
        title: e.title,
        start: new Date(e.eventDate),
        end: new Date(e.eventDate),
      }));

      setEvents(mappedEvents);

      //Sätter kalenders visade datum till det tidigaste event datumet.
      if (mappedEvents.length > 0) {
        const earliestDate = mappedEvents.reduce((earliest, event) =>
          event.start < earliest ? event.start : earliest,
          mappedEvents[0].start
        );
        setDate(earliestDate);
      }
    };

    fetchEvents();
  }, []);

  //Returnerar en CSS klass för att kunna stylea kalendern.
  const dayPropGetter = (date) => {
    const hasEvent = events.some(
      (event) => event.start.toDateString() === date.toDateString()
    );

    if (hasEvent) {
      return {
        className: 'calender-event-day',
      };
    }
    return {};
  };

  const eventPropGetter = () => ({
    className: 'calender-event-card',
  });

  const customEvent = ({ event }) => (
    <div>
      <span className="calender-event-title">{event.title}</span>
      <span className="calender-event-time">{format(event.start, 'h:mm a')}</span>
    </div>
  );

  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/events/details/${event.id}`);
  };

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        components={{ event: customEvent }}
        date={date}
        views={['month']}
        onNavigate={setDate}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default CalendarPage;
