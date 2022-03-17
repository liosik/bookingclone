import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



function MyCalendar({post, user, setPosts}) {
    const events = post.reserved;
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    async function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        const item = {
            id: post._id,
            reservations: allEvents
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(item)
        }


        const response = await fetch(`http://localhost:4000/addreservation`, options)
        const data = await response.json()
        if (data.success) {
            alert("Success! You've Added Reservation")
            setPosts(data.posts)
        } else {
            alert(data.errorMessage)
        }
    }

    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div className='mb-200'>
                <input type="text" style={{ width: "20%", marginRight: "10px" }} value={user.email} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default MyCalendar;

