import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex justify-center items-center">
      <div className="p-10 rounded-lg">
        <style jsx>{`
          .react-calendar__tile {
            padding-top: 5px;
            padding-bottom: 50px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 10px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px; 
          }

          /* 오늘 날짜 (하늘색 원) */
          .react-calendar__tile--now {
            background-color: transparent !important;
            position: relative;
            color: black;
          }

          /* 오늘 날짜 숫자 */
          .react-calendar__tile--now abbr {
            position: relative;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px; 
            width: 30px; 
          }

          /* 오늘 날짜 배경 */
          .react-calendar__tile--now abbr::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background-color: lightblue;
            border-radius: 50%;
            z-index: -1;
          }

          /* 선택된 날짜 (회색 원) */
          .react-calendar__tile--active {
            background-color: transparent !important;
            position: relative;
            color: black;
          }
            
          /* 선택된 날짜 숫자 */
          .react-calendar__tile--active abbr {
            position: relative;
            z-index: 1;
            line-height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30px; /* 원 안의 숫자 중앙 배치 */
            width: 30px; /* 원 안의 숫자 크기 */
          }

          /* 선택된 날짜 배경 */
          .react-calendar__tile--active abbr::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background-color: lightgray; /* 선택된 날짜 회색 원 */
            border-radius: 50%;
            z-index: -1;
          }

          /* 오늘 날짜가 선택된 경우 회색 대신 하늘색으로 표시 */
          .react-calendar__tile--active.react-calendar__tile--now abbr::before {
            background-color: lightblue !important; /* 오늘 날짜가 선택된 경우에도 하늘색 원 유지 */
          }
        `}</style>

        <Calendar
          onChange={setDate}
          value={date}
          view="month"
          locale="ko-KR"
          calendarType="gregory"
          className="border-none pt-20"
          formatDay={(locale, date) => date.getDate().toString()}
        />
        <p className="mt-4 text-center text-lg">
          선택한 날짜: {date.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default CalendarPage;
