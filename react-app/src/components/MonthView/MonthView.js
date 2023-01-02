import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import styles from './MonthView.module.css'
import DayTile from './DayTile/DayTile'
import DayOfWeek from './DayOfWeek/DayOfWeek';
import { getEvents } from "../../store/events";

export default function MonthView() {
    const dispatch = useDispatch();
    const calendars = useSelector(state => state.calendars);
    const targetDate = new Date();
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    targetDate.setDate(1);
    const firstDayOfMonth = targetDate.getDay();

    useEffect(() => {
        if (calendars) {
            Object.values(calendars).forEach((calendar) => {
                // month number must be 1-12 for python calendar
                if (calendar.is_displayed) dispatch(getEvents(calendar.id, year, month + 1))
            })
        }
    }, [dispatch, month, year, calendars])

    return (
        <div className={styles.wrapper}>
            <DayOfWeek />
            <div className={styles.monthGrid}>
                {[...Array(35)].map((_, idx) => {
                    return <DayTile date={new Date(year, month, idx - firstDayOfMonth + 1)} key={idx + 1} />
                })}
            </div>
        </div>
    )
}
