import React from "react";

const GalleryImgList = ({ data, month }) => {
  // 배열로 만들어줌
  // const dataArray = Array.isArray(data) ? data : [data];

  // 날짜별 그룹화
  const groupedByDate = data.reduce((groups, item) => {
    const date = item.day;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
  console.log(groupedByDate);

  // 최신순 정렬
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b - a);

  return sortedDates.map((date) => (
    <div key={date}>
      {/* 날짜 표시 */}
      {groupedByDate[date].length > 0 && (
        <div className="col-span-3 text-left mt-4 mb-2 font-semibold">
          {month}월 {date}일
        </div>
      )}

      {/* 이미지를 3개씩 그리드로 배치 */}
      <div className="grid grid-cols-3 gap-1">
        {groupedByDate[date].map((item, index) => (
          <div key={index} className="w-28 h-28 mb-6">
          {item.picture ? (
            <>
              <img
                src={`data:image/jpeg;base64,${item.picture}`}
                alt={`Day ${item.day}`}
                className="w-full h-full object-cover"
              />
              <div className="text-sm text-center">{item.memberName}</div>
            </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-center">미션 수행내역이 <br />존재하지 않습니다.</p>
              </div>
            )
          }
          </div>
        ))}
      </div>
    </div>
  ));
};

// return (
//   <div>
//     <div>{data.day}</div>
//     <div>
//       <img
//         src={`data:image/jpeg;base64,${data.picture}`}
//         alt={`Day ${data.day}`}
//         style={{ width: "100%", height: "auto" }}
//       />
//     </div>
//     <div>{data.memberName}</div>
//   </div>
// );

//   const allItems = data.flatMap((page) => page);

//   // 날짜별로 정렬된 배열을 생성합니다
//   const sortedDates = Object.keys(groupedByDate).sort(
//     (a, b) => new Date(b) - new Date(a)
//   );

//   // 정렬된 날짜에 따라 이미지를 렌더링합니다
//   return sortedDates.flatMap((date) => [
//     <div
//       key={`date-${date}`}
//       className="col-span-3 text-left font-bold mt-4 mb-2 "
//     >
//       {date}
//     </div>,
//     ...groupedByDate[date].map((item) => (
//       <div key={item.day}>
//         <img src={item.picture} alt={item.day} />
//       </div>
//     )),
//   ]);

export default GalleryImgList;
