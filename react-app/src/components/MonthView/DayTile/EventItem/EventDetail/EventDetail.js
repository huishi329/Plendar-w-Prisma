import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentEvent } from '../../../../../store/modals';
import styles from './EventDetail.module.css'
import EventNavbar from './EventNavbar/EventNavbar';

export default function EventDetail({ event, x, y }) {
    const dispatch = useDispatch();
    const calendars = useSelector(state => state.calendars);

    useEffect(() => {
        const closeEventDetail = () => {
            dispatch(setCurrentEvent(null))
        };
        document.addEventListener('click', closeEventDetail);
        return () => document.removeEventListener('click', closeEventDetail)
    }, [dispatch])

    if (!calendars) return null;

    return (
        <div
            className={styles.wrapper}
            style={{ top: y }}
            onClick={(e) => e.stopPropagation()}
        >
            <EventNavbar event={event} calendar={calendars[event.calendar_id]} />
            <div className={styles.title} >
                <i className="fa-solid fa-square"></i>
                {event.title}
            </div>
            <div className={styles.datetime}>
                {event.start_time.toLocaleDateString('en-US',
                    { weekday: 'long', day: '2-digit', month: 'long' })
                }
                <i className="fa-solid fa-circle"></i>
                {event.start_time.toLocaleTimeString('en-US',
                    { hour: '2-digit', minute: '2-digit' }).toLowerCase().split(" ").join("")}
                {` - `}
                {event.end_time.toLocaleTimeString('en-US',
                    { hour: '2-digit', minute: '2-digit' }).toLowerCase().split(" ").join("")}
            </div>
            {event.address && <div className={styles.address}>
                <i className="fa-solid fa-location-dot"></i>
                {event.address}
            </div>}
            {event.description && <div className={styles.description}>
                <i className="fa-solid fa-bars"></i>
                {event.description}
            </div>}
            {calendars && <div>
                <i className="fa-regular fa-calendar"></i>
                {calendars[event.calendar_id].name}
            </div>}
        </div >
    )
}
