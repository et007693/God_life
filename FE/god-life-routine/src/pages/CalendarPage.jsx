import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "../components/Header";
import { AiFillSmile, AiFillFrown } from "react-icons/ai";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCalendarData, getPerosnalCalendarData } from "../api/calendarApi";

const CalendarPage = () => {
  const { teamId } = useParams();
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const { data, isFetching, isError } = useQuery({
    queryKey: ["getCalendarData"],
    queryFn: () => location.pathname.includes('team') ? getCalendarData(teamId, year, month) : getPerosnalCalendarData(year, month),
    staleTime: 0,
  });

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // 주말 확인 함수
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 6: Sat, 0: Sun,
  };
  console.log(isWeekend(date));

  // 성공 여부 확인
  const isSuccessDate = (date) => {
    const day = date.getDate();
    if (year === date.getFullYear() && month === date.getMonth() + 1) {
      const found = data.dayList.find((d) => d.day === day); 

      if (found) {
        return found.completed ? (
          <AiFillSmile
            style={{
              fontSize: "30px",
              color: "orange",
              position: "absolute",
              bottom: "5px",
            }}
          />
        ) : (
          <AiFillFrown
            style={{
              fontSize: "30px",
              color: "red",
              position: "absolute",
              bottom: "5px",
            }}
          />
        );
      }
    }
    return null;
  };

  return (
    <div>
      <Header
        title={"캘린더"}
        backgroundcolor={"orange"}
        color={"white"}
        goBack={
          type === "team" ? `/teamMission/${teamId}/` : `/personalMission/`
        }
      />

      <div className="flex justify-center">
        <div className="rounded-lg">
          <style>{`
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

            .react-calendar__tile:hover {
              background-color: transparent !important;
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

          

            /* 주말인 경우는 빨간색으로 유지 */
            .react-calendar__tile--active abbr[data-weekend="true"] {
              color: brown !important; /* 주말일 때 선택해도 빨간색 유지 */
            }

            /* 평일 선택 시 검정색 */
            .react-calendar__tile--active abbr[data-weekend="false"] {
              color: black !important;
            }

          
          `}</style>

          <Calendar
            onChange={setDate}
            value={date}
            view="month"
            locale="ko-KR"
            calendarType="gregory" // 일요일부터 시작
            className="border-none pt-28"
            formatDay={(locale, date) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  height: "120px", // 부모 요소의 높이 고정
                }}
              >
                {/* div 태그는 스타일 적용 안됨 */}
                <abbr
                  data-weekend={isWeekend(date) ? "true" : "false"} // 주말인지 아닌지 확인
                  style={{ textAlign: "center" }}
                >
                  {date.getDate()}
                </abbr>

                {isSuccessDate(date)}
              </div>
            )}
          />

          {/* <p className="text-center text-lg">
            선택한 날짜: {date.toDateString()}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
