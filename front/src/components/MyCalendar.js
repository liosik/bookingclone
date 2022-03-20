import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, {useEffect, useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
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
    const [allEvents, setAllEvents] = useState(post.reserved);
    const [date, setDate] = useState(null)

    useEffect(() => {
        setAllEvents(post.reserved)
    }, [])

    function setEvent() {
        const newEvent = {
            title: user.email,
            start: date,
            end: date
        }

        if (allEvents.length !== 0) {
            if (allEvents.some(x => (JSON.stringify(newEvent.start)  === JSON.stringify(x.start)))) {
                return alert("ALREADY BOOKED")
            } else {
                return setAllEvents([...allEvents, newEvent])
            }
        } else {
            return setAllEvents([...allEvents, newEvent])
        }


    }

    async function handleAddEvent() {

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
            <h2>Book A Day</h2>
            <div className='mb-200'>
                <DatePicker placeholderText="Choose Day"
                            selected={date}
                            excludeDates={allEvents.map(x=>new Date(x.start))}
                            onChange={(start) => setDate(start)}/>
                <button onClick={setEvent}>Confirm Date</button>
                <button onClick={handleAddEvent}>
                    Book
                </button>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end"
                      style={{height: 500, margin: "50px"}}/>
        </div>
    );
}

export default MyCalendar;

