import Avatar from "./Avatar"
import crown  from "../assets/crown.png"
import CalculateAvatarList from "./CalculateAvatarList"
import CrownList from "./CrownList"

const FineList = ({memberList}) => {

  return (
    <div className="flex flex-col w-full">
      {memberList.map((member, index) => (
        
        
        <div key={member.id} className="flex flex-row items-center mb-2 w-full">
          <div className="flex flex-col items-center text-center relative mt-3">
            {index === 0 && <img src={crown} alt="왕관" className="absolute -top-12 -left-9"/>}
            {/* member의 총금액이 가장 높은 사람부터 crownList 들어가도록 수정 */}
            <CrownList member={member}/>
            <div className="w-20">{member.name}</div>
          </div>
          
          {/* 납부한 벌금 총액 */}
          <div className="w-full bg-yellow-200 rounded-full flex items-center justify-center">
            {member.totalFine}
          </div>
          {/* 납부한 벌금 비율 */}
          <div className="ml-2">
            {member.totalFinePercent}
          </div>
        </div>
      ))}
      <div>

      </div>


    </div>
  )
} 

export default FineList