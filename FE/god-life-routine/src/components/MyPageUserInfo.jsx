import React from 'react'
import Avatar from './Avatar'
import coin from '../assets/image/coin.png'
import coupon from '../assets/image/coupon.png'

const MyPageUserInfo = ({member}) => {
  return (
    <div className='flex flex-row w-full mt-16 px-8 justify-items-center items-center justify-around'>

        <Avatar size={"lg"} member={member}/>
        <div className='flex flex-col text-left w-full pl-8 gap-2'>
          <p className='text-xl font-bold'>
            {member.name}
          </p>
          <div className='flex justify-between items-center'>
            <p>
            마일리지
            </p>
            <p className='flex gap-2 items-center'>
              {member.mileage}
              <img src={coin} alt="" />
            </p>
          </div>
          <div className='flex justify-between items-center'>
            <p>
            벌금 면제권
            </p>
            <p className='flex gap-2 items-center'>
              {member.ticket}
              <img src={coupon} alt="" />
            </p>
          </div>
        </div>
      </div>
  )
}

export default MyPageUserInfo