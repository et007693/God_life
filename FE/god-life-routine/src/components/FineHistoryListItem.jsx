import React from 'react'
import coupon from '../assets/image/coupon.png'



const FineHistoryListItem = ({item}) => {
  const formattedDate = new Date(item.date).toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric"
    })

  return (
    <div>
      <div className="flex justify-between items-center pt-3">
        <div className="flex flex-col items-start pl-10">
          <div className="text-lg font-semibold">{formattedDate}</div>
          <div className="text-sm text-gray-500">{item.time}</div>
        </div>

        <div className="flex flex-col items-end pl-24">
          <div className="font-bold text-xl">{item.fine}</div>
          <div className="text-gray-500 text-sm">{item.balance}</div>
        </div>

        <div className="pr-8">
          <img src={coupon} alt="Coupon Icon" className="w-8 h-8" />
        </div>
        
      </div>

      <div className="border-b border-gray-200 mt-4 mx-4 mb-2"></div>

    </div>
  )
}

export default FineHistoryListItem