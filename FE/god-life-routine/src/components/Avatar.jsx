import React from 'react'

const Avatar = ({member}) => {
  return (
    <img
    key={member.id}
    src={member.profileImage}
  alt="Profile"
    className="w-14 h-14 mb-4 rounded-full border-4 border-gray-300"
  />
  )
}

export default Avatar