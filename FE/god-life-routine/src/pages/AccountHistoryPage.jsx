import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AccountHistoryList from "../components/AccountHistoryList";
import { getAccountHistory } from "../api/accountHistoryApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const AccountHistoryPage = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState("전체");
  
  const { teamId } = useParams();
  const { data, isFetching, isError } = useQuery({
    queryKey: ["accountHistory"],
    queryFn: () => getAccountHistory(teamId),
    staleTime: 0,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  // const sortedArr = [
  //   ...arr.filter((user) => user.name === "전체"), // "전체" 항목을 먼저 배열에 추가
  //   ...arr
  //     .filter((user) => user.name !== "전체")
  //     .sort((a, b) => a.name.localeCompare(b.name, "ko-KR")), // 나머지 이름을 가나다 순으로 정렬
  // ];

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  
  return (
    <div>
      <Header title={"거래내역"} color={"orange"} />
      <div className="mt-16 text-lg text-orange-300 font-semibold">{data.roomName}</div>
      
      {/* <div className="relative flex justify-start pl-5"> */}
        {/* <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-black bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 inline-flex items-center mt-24 pl-4"
          type="button"
        >
          {data.memberName}
          <svg
            className="w-2.5 h-2.5 ml-3"
            // 접근 x, 시각적인 요소
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button> */}

        {/* {isDropdownOpen && (
          <div className="absolute top-full left-4 bg-white rounded-lg shadow-lg w-40 mt-2">
            <ul
              className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUsersButton"
            >
              {data.filterUsers.map((user) => (
                <li key={user.id}>
                  <div
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedUser(user.name);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {user.name !== "전체" && (
                      <img
                        src={user.profileImg}
                        alt={`${user.name} 프로필 이미지`}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    )}
                    {user.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      {/* </div> */}

      <AccountHistoryList
        // selectedUser={selectedUser}
        data={data.fines}
      />
    </div>
  );
};

export default AccountHistoryPage;
