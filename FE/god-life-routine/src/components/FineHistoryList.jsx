import React, { useState } from "react";
import FineHistoryListItem from "./FineHistoryListItem";
import coupon from "../assets/image/coupon.png";
import Modal from "./Modal";
import { useMutation } from "@tanstack/react-query";
import { sendFineExempt } from "../api/fineHistoryApi";
import { useNavigate, useParams } from "react-router-dom";

// const groupByMonth = (arr) => {
//   return arr.reduce((acc, item) => {
//     const date = new Date(item.date);
//     const MonthKey = date.toLocaleDateString("ko-KR", {
//       year: "numeric",
//       month: "long",
//     });

//     if (!acc[MonthKey]) {
//       acc[MonthKey] = [];
//     }
//     acc[MonthKey].push(item);
//     // console.log(item);
//     // console.log(MonthKey);
//     return acc;
//   }, {});
// };

// const FineHistoryList = ({ data }) => {
//   const currentDate = new Date();
//   const currentMonthKey = currentDate.toLocaleDateString("ko-KR", {
//     year: "numeric",
//     month: "long",
//   });

//   const groupMonthData = groupByMonth(data);
//   const currentMonthData = groupMonthData[currentMonthKey] || [];

//   return (
//     <div>
//       {currentMonthData.length > 0 ? (
//         <div>
//           <div className="flex justify-between pl-5 pt-8">
//             <div className="text-md text-gray-400">{currentMonthKey}</div>
//             <div className="text-sm text-gray-400 pr-4">벌금면제권</div>
//           </div>

//           {currentMonthData.map((item) => (
//             <FineHistoryListItem key={item.id} item={item} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500">현재 달에 해당하는 데이터가 없습니다.</div>
//       )}
//     </div>
//   );
// };

// export default FineHistoryList;

// 날짜로 그룹화
const groupByDate = (arr) => {
  return arr.reduce((acc, item) => {
    // console.log(item.fineDate);
    const dateKey = item.transactionDate;
    if (!acc[dateKey]) {
      acc[dateKey] = []; // 해당 날짜에 대한 배열 초기화
    }
    acc[dateKey].push(item); // 같은 날짜에 해당하는 데이터를 배열에 추가
    return acc;
  }, {});
};

const FineHistoryList = ({ data, refetch }) => {
  const groupedData = groupByDate(data.list);

  // 날짜 역순으로 뜨도록(최신순)
  const sortedDate = Object.keys(groupedData).sort((a, b) =>
    b.localeCompare(a)
  );

  const [showModal, setShowModal] = useState(false);
  const { teamId } = useParams();
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  const { mutate: mutateFineExempt } = useMutation({
    mutationKey: ["sendFineExempt"],
    mutationFn: () => sendFineExempt(teamId),
    onSuccess: () => {
      console.log("우랄랄");
      closeModal();
      refetch();
    },
  });
  
  const handleButtonClick = () => {
    mutateFineExempt();
  };

  return (
    <div>
      {sortedDate.length > 0 ? (
        sortedDate.map((dateKey, index) => {
          const year = dateKey.substring(0, 4);
          const month = dateKey.substring(4, 6);
          const day = dateKey.substring(6, 8);
          const formattedDate = new Date(`${year}-${month}-${day}`);

          return (
            <div key={dateKey}>
              <div className="flex justify-between pl-5 pt-8">
                <div>
                  {formattedDate.toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                {/* {index === 0 && <div className="text-sm text-gray-400 pr-4">벌금면제권</div>} */}
                {index === 0 && (
                  <div className="pr-4">
                    <img
                      src={coupon}
                      alt="Coupon Icon"
                      className="w-8 h-8"
                      onClick={openModal}
                    />
                  </div>
                )}

                <Modal
                  showModal={showModal}
                  onClickCloseBtn={() => setShowModal(false)}
                  width="240px"
                  height="260px"
                  buttonText="확인"
                  buttonColor="orange"
                  onClickButton={handleButtonClick}
                >
                  <div className="text-lg font-semibold pt-10">
                    <div>벌금 면제권을</div>
                    <div>사용하시겠습니까?</div>
                  </div>
                </Modal>

              </div>
              {groupedData[dateKey].map((item) => (
                <FineHistoryListItem
                  key={item.transactionDate}
                  item={item}
                  dateKey={dateKey}
                  data={data}
                />
              ))}
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 pt-10">
          현재 벌금 데이터가 없습니다.
        </div>
      )}
    </div>
  );
};

export default FineHistoryList;
