import Avatar from "./Avatar";
import crown from "../assets/crown.png";
import CalculateAvatarList from "./CalculateAvatarList";
import CrownList from "./CrownList";

const FineList = ({ memberList }) => {
  // 낸 금액이 많은 사람 순서대로 정렬
  const sortedMemberList = [...memberList].sort(
    (a, b) => b.totalFine - a.totalFine
  );

  return (
    <div className="flex flex-col w-full">
      {sortedMemberList.map((member, index) => {
        // 0~20%면, 다 20% 크기만큼으로 노란색의 넓이 조정
        const widthPercent = member.totalFinePercent < 20 ? 20 : member.totalFinePercent;

        return (
          <div
            key={member.id}
            className="flex flex-row items-center mb-2 w-full"
          >
            <div className="flex flex-col items-center text-center relative mt-4">
              {index === 0 && (
                <img
                  src={crown}
                  alt="왕관"
                  className="absolute -top-11 -left-7"
                />
              )}
              <CrownList member={member} />
              <div className="w-20">{member.name}</div>
            </div>

            {/* 납부한 벌금 총액 */}
            {/* <div className="w-full bg-yellow-200 rounded-full flex items-center justify-center">
            {member.totalFine}
          </div> */}

            {/* 노란박스 퍼센트만큼 크기 조정 */}
            <div
              className="w-full bg-yellow-200 rounded-full flex items-center justify-center"
              style={{ width: `${widthPercent}%` }}
            >
              {member.totalFine}원
            </div>

            {/* 납부한 벌금 비율 */}
            <div className="ml-2 text-sm whitespace-nowrap">{member.totalFinePercent}%</div>
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

export default FineList;
