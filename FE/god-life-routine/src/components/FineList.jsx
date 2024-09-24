import Avatar from "./Avatar"
import crown  from "../assets/crown.png"

const FineList = ({memberList}) => {
const fineSum = '10,000원'
const fineRatio = '33%'
  return (
    <div className="flex flex-col w-full">
      {memberList.map((member, index) => (
        
        <div key={member.id} className="flex flex-row items-center mb-2 w-full">
          <div className="flex flex-col items-center text-center relative mt-3">
            {index === 0 && <img src={crown} alt="왕관" className="absolute -top-12 -left-9"/>}
            <Avatar member={member}/>
            <div className="w-20">{member.name}</div>
          </div>
          
          {/* 납부한 벌금 총액 */}
          <div className="w-full bg-yellow-200 rounded-full flex items-center justify-center">
            {fineSum}
          </div>
          {/* 납부한 벌금 비율 */}
          <div className="ml-2">
            {fineRatio}
          </div>
        </div>
      ))}
      <div>

      </div>


    </div>
  )
} 

export default FineList