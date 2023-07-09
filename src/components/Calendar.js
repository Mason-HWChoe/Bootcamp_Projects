import ko from 'date-fns/locale/ko';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css';

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  const weekdayOrder = [0, 1, 2, 3, 4, 5, 6];

  const formatShortWeekday = (locale, date) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekdayIndex = date.getDay();
    const orderedIndex = weekdayOrder[weekdayIndex];
    return weekdays[orderedIndex];
  };

  const locale = ko.code;

  const formatDay = (locale, date) => {
    return date.getDate().toString();
  };

  return (
    <div>
      <Calendar
        className={styles.calendar}
        locale={locale}
        formatShortWeekday={formatShortWeekday}
        value={value}
        onChange={onChange}
        formatDay={formatDay}
      />
    </div>
  );
}
