import React from 'react'

const Avatar = ({member,size}) => {
  const avatarSize = size === "lg" ? "w-24 h-24" : "w-16 h-16"
  return (
    <div className={`${avatarSize} rounded-full border-4 border-gray-300 overflow-hidden`}>
    <img
    key={member.name}
    src={member.profileImage}
    className="w-full h-full object-cover"
    alt="Profile"
    />
    </div>
  )
}

export default Avatar