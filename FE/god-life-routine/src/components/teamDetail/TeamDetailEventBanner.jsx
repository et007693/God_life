import React from 'react'
import firecracker from "../../assets/firecracker.png"
const TeamDetailEventBanner = ({handleOpenModal}) => {
  return (
    <div
        className="mt-20 bg-yellow-100 mx-4 py-1 rounded-lg flex justify-center"
        onClick={handleOpenModal}
      >;
        <img src={firecracker} alt="폭죽 아이콘" className="inline w-6 h-6" />
        <div className="pl-2">이벤트에 참여하고 상금을 획득하세요!</div>
      </div>
  )
}

export default TeamDetailEventBanner