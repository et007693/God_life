import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// import smile from "../assets/smile.png";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className="flex flex-col items-end justify-center pt-7 pr-5">
        <div className="mb-2">이달의 성공률</div>
        <div className="bg-gray-300 px-4 py-2 rounded-xl text-xl font-bold">
          95%
        </div>
      </div>

      <div className="flex justify-center">
        <div className="rounded-lg">
          <style jsx>{`
            .react-calendar__tile {
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
              content: "";
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
              content: "";
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
            .react-calendar__tile--active.react-calendar__tile--now
              abbr::before {
              background-color: lightblue !important; /* 오늘 날짜가 선택된 경우에도 하늘색 원 유지 */
            }
          `}</style>

          <Calendar
            onChange={setDate}
            value={date}
            view="month"
            locale="ko-KR"
            calendarType="gregory"
            className="border-none pt-8"
            formatDay={(locale, date) => date.getDate().toString()}
          />
          <p className="text-center text-lg">
            선택한 날짜: {date.toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
